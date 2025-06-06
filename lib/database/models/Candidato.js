// ================================
// MODELO DE CANDIDATOS
// PLATAFORMA LEÃO CAREERS
// ================================

const BaseModel = require('./BaseModel');
const { ObjectId } = require('mongodb');

class Candidato extends BaseModel {
  constructor(db) {
    super(db, 'candidatos');
  }

  // ================================
  // MÉTODOS DE CRIAÇÃO E GESTÃO
  // ================================

  async createCandidato(candidatoData, userId, createdBy = null) {
    try {
      // Verifica se já existe candidato para este usuário
      const existing = await this.findByUserId(userId);
      if (existing) {
        throw new Error('Já existe um candidato para este usuário');
      }

      const candidato = {
        usuarioId: new ObjectId(userId),
        ...candidatoData,
        statusAprovacao: 'pendente',
        analiseIA: {
          score: 0,
          pontosFocus: [],
          areasRecomendadas: [],
          competenciasDestaque: [],
          melhorias: [],
          ultimaAnalise: null
        },
        lgpd: {
          consentimento: true,
          dataConsentimento: new Date(),
          versaoTermos: '1.0',
          opt_in_marketing: candidatoData.lgpd?.opt_in_marketing || false
        }
      };

      return await this.create(candidato, createdBy);
    } catch (error) {
      throw new Error(`Erro ao criar candidato: ${error.message}`);
    }
  }

  async findByUserId(userId) {
    try {
      return await this.findOne({ usuarioId: new ObjectId(userId) });
    } catch (error) {
      throw new Error(`Erro ao buscar candidato por usuário: ${error.message}`);
    }
  }

  async findByCpf(cpf) {
    try {
      return await this.findOne({ 'dadosPessoais.cpf': cpf });
    } catch (error) {
      throw new Error(`Erro ao buscar candidato por CPF: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE APROVAÇÃO
  // ================================

  async aprovarCandidato(candidatoId, approvedBy, observacoes = '') {
    try {
      return await this.updateById(candidatoId, {
        statusAprovacao: 'aprovado',
        observacoesInternas: observacoes,
        'auditoria.aprovadoPor': new ObjectId(approvedBy),
        'auditoria.aprovadoEm': new Date()
      }, approvedBy);
    } catch (error) {
      throw new Error(`Erro ao aprovar candidato: ${error.message}`);
    }
  }

  async rejeitarCandidato(candidatoId, rejectedBy, motivo) {
    try {
      return await this.updateById(candidatoId, {
        statusAprovacao: 'rejeitado',
        observacoesInternas: motivo,
        'auditoria.aprovadoPor': new ObjectId(rejectedBy),
        'auditoria.aprovadoEm': new Date()
      }, rejectedBy);
    } catch (error) {
      throw new Error(`Erro ao rejeitar candidato: ${error.message}`);
    }
  }

  async getCandidatosPendentes(options = {}) {
    try {
      return await this.find({ statusAprovacao: 'pendente' }, options);
    } catch (error) {
      throw new Error(`Erro ao buscar candidatos pendentes: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE ANÁLISE DE IA
  // ================================

  async updateAnaliseIA(candidatoId, analiseData, analyzedBy) {
    try {
      const analise = {
        ...analiseData,
        ultimaAnalise: new Date()
      };

      return await this.updateById(candidatoId, {
        analiseIA: analise,
        'documentos.curriculo.analisado': true
      }, analyzedBy);
    } catch (error) {
      throw new Error(`Erro ao atualizar análise IA: ${error.message}`);
    }
  }

  async getCandidatosByScore(minScore = 70, options = {}) {
    try {
      return await this.find({
        'analiseIA.score': { $gte: minScore },
        statusAprovacao: 'aprovado'
      }, options);
    } catch (error) {
      throw new Error(`Erro ao buscar candidatos por score: ${error.message}`);
    }
  }

  async getCandidatosForAnalysis(options = {}) {
    try {
      return await this.find({
        'documentos.curriculo.analisado': false,
        'documentos.curriculo.arquivo': { $exists: true, $ne: null }
      }, options);
    } catch (error) {
      throw new Error(`Erro ao buscar candidatos para análise: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE MATCHING
  // ================================

  async findCandidatesForJob(jobCriteria, options = {}) {
    try {
      const pipeline = [
        // Filtrar apenas candidatos aprovados
        {
          $match: {
            statusAprovacao: 'aprovado'
          }
        },
        // Calcular score de match
        {
          $addFields: {
            matchScore: {
              $let: {
                vars: {
                  experienciaMatch: this.calculateExperienceMatch(jobCriteria),
                  localizacaoMatch: this.calculateLocationMatch(jobCriteria),
                  salarioMatch: this.calculateSalaryMatch(jobCriteria),
                  competenciasMatch: this.calculateSkillsMatch(jobCriteria)
                },
                in: {
                  $avg: [
                    '$$experienciaMatch',
                    '$$localizacaoMatch', 
                    '$$salarioMatch',
                    '$$competenciasMatch'
                  ]
                }
              }
            }
          }
        },
        // Filtrar por score mínimo
        {
          $match: {
            matchScore: { $gte: jobCriteria.minMatchScore || 60 }
          }
        },
        // Adicionar detalhes do match
        {
          $addFields: {
            matchDetails: {
              experiencia: this.calculateExperienceMatch(jobCriteria),
              localizacao: this.calculateLocationMatch(jobCriteria),
              salario: this.calculateSalaryMatch(jobCriteria),
              competencias: this.calculateSkillsMatch(jobCriteria)
            }
          }
        },
        // Ordenar por score
        {
          $sort: { matchScore: -1 }
        },
        // Paginação
        {
          $skip: ((options.page || 1) - 1) * (options.limit || 10)
        },
        {
          $limit: options.limit || 10
        }
      ];

      return await this.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Erro no matching de candidatos: ${error.message}`);
    }
  }

  calculateExperienceMatch(jobCriteria) {
    return {
      $cond: {
        if: { $gte: ['$experienciaProfissional.tempoTotal', jobCriteria.experienciaMinima || 0] },
        then: 100,
        else: {
          $multiply: [
            { $divide: ['$experienciaProfissional.tempoTotal', jobCriteria.experienciaMinima || 1] },
            100
          ]
        }
      }
    };
  }

  calculateLocationMatch(jobCriteria) {
    return {
      $cond: {
        if: { $or: [
          { $eq: [jobCriteria.trabalhoRemoto, true] },
          { $in: [jobCriteria.cidade, '$preferencias.localizacao.cidadesInteresse'] }
        ]},
        then: 100,
        else: 0
      }
    };
  }

  calculateSalaryMatch(jobCriteria) {
    return {
      $cond: {
        if: { $and: [
          { $lte: ['$preferencias.pretensaoSalarial.minimo', jobCriteria.salarioMaximo || 999999] },
          { $gte: ['$preferencias.pretensaoSalarial.maximo', jobCriteria.salarioMinimo || 0] }
        ]},
        then: 100,
        else: 50
      }
    };
  }

  calculateSkillsMatch(jobCriteria) {
    return {
      $multiply: [
        {
          $divide: [
            {
              $size: {
                $setIntersection: [
                  '$competencias.tecnicas.nome',
                  jobCriteria.competenciasRequeridas || []
                ]
              }
            },
            { $max: [{ $size: jobCriteria.competenciasRequeridas || [] }, 1] }
          ]
        },
        100
      ]
    };
  }

  // ================================
  // MÉTODOS DE BUSCA AVANÇADA
  // ================================

  async searchCandidatos(searchParams, options = {}) {
    try {
      const {
        texto,
        area,
        nivel,
        cidade,
        estado,
        salarioMin,
        salarioMax,
        scoreMin,
        statusAprovacao,
        disponibilidade
      } = searchParams;

      let filter = {};

      // Busca por texto
      if (texto) {
        const searchRegex = new RegExp(texto, 'i');
        filter.$or = [
          { 'dadosPessoais.nomeCompleto': { $regex: searchRegex } },
          { 'experienciaProfissional.cargo': { $regex: searchRegex } },
          { 'experienciaProfissional.empresa': { $regex: searchRegex } },
          { 'competencias.tecnicas.nome': { $regex: searchRegex } }
        ];
      }

      // Filtros específicos
      if (area) filter['experienciaProfissional.areaAtuacao'] = area;
      if (nivel) filter['experienciaProfissional.nivel'] = nivel;
      if (cidade) filter['contato.endereco.cidade'] = cidade;
      if (estado) filter['contato.endereco.estado'] = estado;
      if (statusAprovacao) filter.statusAprovacao = statusAprovacao;

      // Faixa salarial
      if (salarioMin || salarioMax) {
        filter['preferencias.pretensaoSalarial'] = {};
        if (salarioMin) filter['preferencias.pretensaoSalarial.minimo'] = { $gte: salarioMin };
        if (salarioMax) filter['preferencias.pretensaoSalarial.maximo'] = { $lte: salarioMax };
      }

      // Score mínimo
      if (scoreMin) filter['analiseIA.score'] = { $gte: scoreMin };

      // Disponibilidade
      if (disponibilidade === 'imediata') {
        filter['preferencias.disponibilidade.imediata'] = true;
      }

      return await this.find(filter, options);
    } catch (error) {
      throw new Error(`Erro na busca de candidatos: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE RELATÓRIOS
  // ================================

  async getCandidatosStatistics() {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$statusAprovacao',
            total: { $sum: 1 },
            scoreMedia: { $avg: '$analiseIA.score' }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ];

      return await this.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Erro ao gerar estatísticas de candidatos: ${error.message}`);
    }
  }

  async getTopCandidatesByArea(limit = 10) {
    try {
      const pipeline = [
        {
          $match: {
            statusAprovacao: 'aprovado',
            'analiseIA.score': { $gte: 70 }
          }
        },
        {
          $unwind: '$experienciaProfissional'
        },
        {
          $group: {
            _id: {
              area: '$experienciaProfissional.areaAtuacao',
              candidatoId: '$_id'
            },
            candidato: { $first: '$$ROOT' },
            score: { $first: '$analiseIA.score' }
          }
        },
        {
          $sort: { score: -1 }
        },
        {
          $group: {
            _id: '$_id.area',
            topCandidatos: { $push: '$candidato' },
            totalCandidatos: { $sum: 1 }
          }
        },
        {
          $project: {
            area: '$_id',
            topCandidatos: { $slice: ['$topCandidatos', limit] },
            totalCandidatos: 1
          }
        },
        {
          $sort: { totalCandidatos: -1 }
        }
      ];

      return await this.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Erro ao buscar top candidatos por área: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE DOCUMENTOS
  // ================================

  async updateCurriculo(candidatoId, curriculoData, updatedBy) {
    try {
      return await this.updateById(candidatoId, {
        'documentos.curriculo': {
          ...curriculoData,
          versao: (curriculoData.versao || 0) + 1,
          dataUpload: new Date(),
          analisado: false
        }
      }, updatedBy);
    } catch (error) {
      throw new Error(`Erro ao atualizar currículo: ${error.message}`);
    }
  }

  async addCertificado(candidatoId, certificadoData, updatedBy) {
    try {
      return await this.updateById(candidatoId, {
        $push: {
          'documentos.certificados': {
            ...certificadoData,
            dataEmissao: new Date()
          }
        }
      }, updatedBy);
    } catch (error) {
      throw new Error(`Erro ao adicionar certificado: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE TAGS E ORGANIZAÇÃO
  // ================================

  async addTag(candidatoId, tag, addedBy) {
    try {
      return await this.updateById(candidatoId, {
        $addToSet: { tags: tag }
      }, addedBy);
    } catch (error) {
      throw new Error(`Erro ao adicionar tag: ${error.message}`);
    }
  }

  async removeTag(candidatoId, tag, removedBy) {
    try {
      return await this.updateById(candidatoId, {
        $pull: { tags: tag }
      }, removedBy);
    } catch (error) {
      throw new Error(`Erro ao remover tag: ${error.message}`);
    }
  }

  async getCandidatosByTag(tag, options = {}) {
    try {
      return await this.find({ tags: tag }, options);
    } catch (error) {
      throw new Error(`Erro ao buscar candidatos por tag: ${error.message}`);
    }
  }
}

module.exports = Candidato; 