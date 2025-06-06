// ================================
// SCRIPT DE SETUP DO BANCO MONGODB
// PLATAFORMA LEÃO CAREERS
// ================================

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { schemas, indices, validations } = require('./mongodb-schema');

class DatabaseSetup {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('✓ Conectado ao MongoDB');
    } catch (error) {
      console.error('✗ Erro ao conectar ao MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('✓ Desconectado do MongoDB');
    }
  }

  async createCollections() {
    console.log('\n=== CRIANDO COLLECTIONS ===');
    
    const collectionNames = Object.keys(schemas);
    
    for (const collectionName of collectionNames) {
      try {
        // Verifica se a collection já existe
        const collections = await this.db.listCollections({ name: collectionName }).toArray();
        
        if (collections.length === 0) {
          await this.db.createCollection(collectionName);
          console.log(`✓ Collection '${collectionName}' criada`);
        } else {
          console.log(`- Collection '${collectionName}' já existe`);
        }
      } catch (error) {
        console.error(`✗ Erro ao criar collection '${collectionName}':`, error);
      }
    }
  }

  async createIndices() {
    console.log('\n=== CRIANDO ÍNDICES ===');
    
    for (const [collectionName, indexList] of Object.entries(indices)) {
      try {
        const collection = this.db.collection(collectionName);
        
        for (const indexSpec of indexList) {
          const { fields, ...options } = indexSpec;
          await collection.createIndex(fields, options);
          const indexName = Object.keys(fields).join('_');
          console.log(`✓ Índice '${indexName}' criado em '${collectionName}'`);
        }
      } catch (error) {
        console.error(`✗ Erro ao criar índices em '${collectionName}':`, error);
      }
    }
  }

  async createValidations() {
    console.log('\n=== APLICANDO VALIDAÇÕES ===');
    
    for (const [collectionName, validation] of Object.entries(validations)) {
      try {
        await this.db.command({
          collMod: collectionName,
          validator: validation
        });
        console.log(`✓ Validação aplicada em '${collectionName}'`);
      } catch (error) {
        console.error(`✗ Erro ao aplicar validação em '${collectionName}':`, error);
      }
    }
  }

  async createInitialData() {
    console.log('\n=== CRIANDO DADOS INICIAIS ===');
    
    // Usuário superadmin inicial
    const usuariosCollection = this.db.collection('usuarios');
    const adminExists = await usuariosCollection.findOne({ email: 'admin@leaocareers.com' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('LeaoAdmin2024!', 12);
      
      const superAdmin = {
        email: 'admin@leaocareers.com',
        senha: hashedPassword,
        tipo: 'superadmin',
        status: 'ativo',
        perfil: {
          nome: 'Administrador Sistema',
          telefone: '+55 11 99999-9999',
          avatar: null,
          timezone: 'America/Sao_Paulo',
          idioma: 'pt-BR'
        },
        permissoes: {
          modulos: ['dashboard', 'candidatos', 'empresas', 'vagas', 'candidaturas', 'contratos', 'relatorios', 'configuracoes'],
          acoes: ['create', 'read', 'update', 'delete', 'approve', 'export'],
          nivelAcesso: 5
        },
        sessao: {
          ultimoLogin: null,
          tokenRefresh: null,
          dispositivoConfiavel: false,
          tentativasLogin: 0
        },
        auditoria: {
          criadoPor: null,
          criadoEm: new Date(),
          atualizadoPor: null,
          atualizadoEm: new Date()
        }
      };
      
      await usuariosCollection.insertOne(superAdmin);
      console.log('✓ Usuário superadmin criado');
      console.log('  Email: admin@leaocareers.com');
      console.log('  Senha: LeaoAdmin2024!');
    } else {
      console.log('- Usuário superadmin já existe');
    }

    // Configurações iniciais do sistema
    const configCollection = this.db.collection('configuracoes');
    
    const configuracoes = [
      {
        categoria: 'sistema',
        chave: 'nome_plataforma',
        valor: 'Leão Careers',
        descricao: 'Nome da plataforma',
        tipo: 'string',
        visivel: true,
        editavel: true
      },
      {
        categoria: 'sistema',
        chave: 'versao',
        valor: '1.0.0',
        descricao: 'Versão atual do sistema',
        tipo: 'string',
        visivel: true,
        editavel: false
      },
      {
        categoria: 'email',
        chave: 'smtp_host',
        valor: 'smtp.gmail.com',
        descricao: 'Servidor SMTP para envio de emails',
        tipo: 'string',
        visivel: true,
        editavel: true
      },
      {
        categoria: 'email',
        chave: 'smtp_port',
        valor: 587,
        descricao: 'Porta do servidor SMTP',
        tipo: 'number',
        visivel: true,
        editavel: true
      },
      {
        categoria: 'ia',
        chave: 'match_score_minimo',
        valor: 70,
        descricao: 'Score mínimo para sugerir candidatos',
        tipo: 'number',
        visivel: true,
        editavel: true
      },
      {
        categoria: 'ia',
        chave: 'analise_automatica_cv',
        valor: true,
        descricao: 'Ativar análise automática de CVs',
        tipo: 'boolean',
        visivel: true,
        editavel: true
      },
      {
        categoria: 'sistema',
        chave: 'lgpd_versao_termos',
        valor: '1.0',
        descricao: 'Versão atual dos termos LGPD',
        tipo: 'string',
        visivel: true,
        editavel: true
      },
      {
        categoria: 'sistema',
        chave: 'tempo_sessao_horas',
        valor: 8,
        descricao: 'Tempo de duração da sessão em horas',
        tipo: 'number',
        visivel: true,
        editavel: true
      }
    ];

    for (const config of configuracoes) {
      const exists = await configCollection.findOne({ 
        categoria: config.categoria, 
        chave: config.chave 
      });
      
      if (!exists) {
        await configCollection.insertOne({
          ...config,
          auditoria: {
            criadoPor: null,
            criadoEm: new Date(),
            atualizadoPor: null,
            atualizadoEm: new Date()
          }
        });
        console.log(`✓ Configuração '${config.chave}' criada`);
      }
    }
  }

  async run() {
    try {
      await this.connect();
      await this.createCollections();
      await this.createIndices();
      await this.createValidations();
      await this.createInitialData();
      
      console.log('\n✅ SETUP DO BANCO DE DADOS CONCLUÍDO COM SUCESSO!');
      
    } catch (error) {
      console.error('\n❌ ERRO NO SETUP DO BANCO DE DADOS:', error);
      throw error;
    } finally {
      await this.disconnect();
    }
  }
}

// Configurações de ambiente
const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    database: process.env.MONGODB_DATABASE || 'leaocareers'
  }
};

// Executa o setup se chamado diretamente
if (require.main === module) {
  const setup = new DatabaseSetup(config.mongodb.uri, config.mongodb.database);
  
  setup.run()
    .then(() => {
      console.log('\n🎉 Banco de dados configurado e pronto para uso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Falha no setup:', error);
      process.exit(1);
    });
}

module.exports = { DatabaseSetup, config }; 