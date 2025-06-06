// ================================
// MODELO DE USUÁRIOS
// PLATAFORMA LEÃO CAREERS
// ================================

const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Usuario extends BaseModel {
  constructor(db) {
    super(db, 'usuarios');
  }

  // ================================
  // MÉTODOS DE AUTENTICAÇÃO
  // ================================

  async createUser(userData, createdBy = null) {
    try {
      // Verifica se email já existe
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email já está em uso');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(userData.senha, 12);
      
      const user = {
        ...userData,
        senha: hashedPassword,
        status: userData.status || 'ativo',
        sessao: {
          ultimoLogin: null,
          tokenRefresh: null,
          dispositivoConfiavel: false,
          tentativasLogin: 0
        }
      };

      return await this.create(user, createdBy);
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      return await this.findOne({ email });
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  async validateCredentials(email, password) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        return null;
      }

      // Verifica status do usuário
      if (user.status !== 'ativo') {
        throw new Error('Usuário inativo ou bloqueado');
      }

      // Verifica se excedeu tentativas de login
      if (user.sessao.tentativasLogin >= 5) {
        throw new Error('Conta bloqueada por excesso de tentativas');
      }

      const isValidPassword = await bcrypt.compare(password, user.senha);
      
      if (!isValidPassword) {
        // Incrementa tentativas de login
        await this.updateById(user._id, {
          'sessao.tentativasLogin': user.sessao.tentativasLogin + 1
        });
        return null;
      }

      // Reset tentativas de login e atualiza último acesso
      await this.updateById(user._id, {
        'sessao.tentativasLogin': 0,
        'sessao.ultimoLogin': new Date()
      });

      // Remove senha do retorno
      delete user.senha;
      return user;
    } catch (error) {
      throw new Error(`Erro na validação de credenciais: ${error.message}`);
    }
  }

  async generateTokens(userId) {
    try {
      const payload = { userId, timestamp: Date.now() };
      
      const accessToken = jwt.sign(
        payload, 
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '8h' }
      );
      
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: '7d' }
      );

      // Salva refresh token no banco
      await this.updateById(userId, {
        'sessao.tokenRefresh': refreshToken
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Erro ao gerar tokens: ${error.message}`);
    }
  }

  async refreshToken(refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken, 
        process.env.JWT_REFRESH_SECRET || 'refresh_secret'
      );
      
      const user = await this.findById(payload.userId);
      if (!user || user.sessao.tokenRefresh !== refreshToken) {
        throw new Error('Refresh token inválido');
      }

      return await this.generateTokens(payload.userId);
    } catch (error) {
      throw new Error(`Erro ao renovar token: ${error.message}`);
    }
  }

  async logout(userId) {
    try {
      return await this.updateById(userId, {
        'sessao.tokenRefresh': null
      });
    } catch (error) {
      throw new Error(`Erro ao fazer logout: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE PERMISSÕES
  // ================================

  async updatePermissions(userId, permissions, updatedBy) {
    try {
      return await this.updateById(userId, { permissoes: permissions }, updatedBy);
    } catch (error) {
      throw new Error(`Erro ao atualizar permissões: ${error.message}`);
    }
  }

  async hasPermission(userId, modulo, acao) {
    try {
      const user = await this.findById(userId);
      if (!user) return false;

      const { permissoes } = user;
      if (!permissoes) return false;

      // SuperAdmin tem todas as permissões
      if (user.tipo === 'superadmin') return true;

      // Verifica módulo
      if (!permissoes.modulos.includes(modulo)) return false;

      // Verifica ação
      if (!permissoes.acoes.includes(acao)) return false;

      return true;
    } catch (error) {
      throw new Error(`Erro ao verificar permissão: ${error.message}`);
    }
  }

  async getUsersByType(tipo, options = {}) {
    try {
      return await this.find({ tipo }, options);
    } catch (error) {
      throw new Error(`Erro ao buscar usuários por tipo: ${error.message}`);
    }
  }

  async getActiveUsers(options = {}) {
    try {
      return await this.find({ status: 'ativo' }, options);
    } catch (error) {
      throw new Error(`Erro ao buscar usuários ativos: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE GERENCIAMENTO
  // ================================

  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.senha);
      if (!isValidPassword) {
        throw new Error('Senha atual incorreta');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      
      return await this.updateById(userId, {
        senha: hashedNewPassword,
        'sessao.tokenRefresh': null // Invalida refresh token
      });
    } catch (error) {
      throw new Error(`Erro ao alterar senha: ${error.message}`);
    }
  }

  async resetPassword(email) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Gera senha temporária
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedTempPassword = await bcrypt.hash(tempPassword, 12);

      await this.updateById(user._id, {
        senha: hashedTempPassword,
        'sessao.tokenRefresh': null // Invalida refresh token
      });

      return tempPassword; // Para envio por email
    } catch (error) {
      throw new Error(`Erro ao resetar senha: ${error.message}`);
    }
  }

  async changeUserStatus(userId, status, updatedBy) {
    try {
      const validStatuses = ['ativo', 'inativo', 'pendente', 'bloqueado'];
      if (!validStatuses.includes(status)) {
        throw new Error('Status inválido');
      }

      return await this.updateById(userId, { status }, updatedBy);
    } catch (error) {
      throw new Error(`Erro ao alterar status: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE RELATÓRIOS
  // ================================

  async getUsersStatistics() {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$tipo',
            total: { $sum: 1 },
            ativos: {
              $sum: { $cond: [{ $eq: ['$status', 'ativo'] }, 1, 0] }
            },
            inativos: {
              $sum: { $cond: [{ $eq: ['$status', 'inativo'] }, 1, 0] }
            },
            pendentes: {
              $sum: { $cond: [{ $eq: ['$status', 'pendente'] }, 1, 0] }
            },
            bloqueados: {
              $sum: { $cond: [{ $eq: ['$status', 'bloqueado'] }, 1, 0] }
            }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ];

      return await this.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Erro ao gerar estatísticas: ${error.message}`);
    }
  }

  async getRecentLogins(days = 7) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const pipeline = [
        {
          $match: {
            'sessao.ultimoLogin': { $gte: startDate }
          }
        },
        {
          $lookup: {
            from: 'candidatos',
            localField: '_id',
            foreignField: 'usuarioId',
            as: 'candidato'
          }
        },
        {
          $lookup: {
            from: 'empresas',
            localField: '_id',
            foreignField: 'usuarioId',
            as: 'empresa'
          }
        },
        {
          $project: {
            tipo: 1,
            email: 1,
            'perfil.nome': 1,
            'sessao.ultimoLogin': 1,
            candidatoNome: { $arrayElemAt: ['$candidato.dadosPessoais.nomeCompleto', 0] },
            empresaNome: { $arrayElemAt: ['$empresa.dadosEmpresa.nomeFantasia', 0] }
          }
        },
        {
          $sort: { 'sessao.ultimoLogin': -1 }
        }
      ];

      return await this.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Erro ao buscar logins recentes: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE BUSCA AVANÇADA
  // ================================

  async searchUsers(searchText, filters = {}, options = {}) {
    try {
      const searchFields = [
        'email',
        'perfil.nome',
        'perfil.telefone'
      ];

      let baseFilter = { ...filters };

      if (searchText) {
        const searchRegex = new RegExp(searchText, 'i');
        baseFilter.$or = searchFields.map(field => ({
          [field]: { $regex: searchRegex }
        }));
      }

      return await this.find(baseFilter, options);
    } catch (error) {
      throw new Error(`Erro na busca de usuários: ${error.message}`);
    }
  }
}

module.exports = Usuario; 