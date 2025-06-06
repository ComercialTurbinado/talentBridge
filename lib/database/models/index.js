// ================================
// ÍNDICE DOS MODELOS - MONGODB
// PLATAFORMA LEÃO CAREERS
// ================================

const { MongoClient } = require('mongodb');
const Usuario = require('./Usuario');
const Candidato = require('./Candidato');
// Importações dos outros modelos que serão criados
// const Empresa = require('./Empresa');
// const Vaga = require('./Vaga');
// const Candidatura = require('./Candidatura');
// const Contrato = require('./Contrato');
// const Notificacao = require('./Notificacao');
// const Log = require('./Log');
// const Configuracao = require('./Configuracao');

class DatabaseManager {
  constructor() {
    this.client = null;
    this.db = null;
    this.isConnected = false;
    
    // Inicialização dos modelos
    this.models = {};
  }

  async connect(uri = null, dbName = null) {
    try {
      const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017';
      const databaseName = dbName || process.env.MONGODB_DATABASE || 'leaocareers';

      if (this.isConnected) {
        return this.db;
      }

      this.client = new MongoClient(mongoUri, {
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      await this.client.connect();
      this.db = this.client.db(databaseName);
      this.isConnected = true;

      // Inicializar modelos
      this.initializeModels();

      console.log(`✓ Conectado ao MongoDB: ${databaseName}`);
      return this.db;
    } catch (error) {
      console.error('✗ Erro ao conectar ao MongoDB:', error);
      throw new Error(`Falha na conexão com o banco de dados: ${error.message}`);
    }
  }

  async disconnect() {
    try {
      if (this.client && this.isConnected) {
        await this.client.close();
        this.isConnected = false;
        this.client = null;
        this.db = null;
        this.models = {};
        console.log('✓ Desconectado do MongoDB');
      }
    } catch (error) {
      console.error('✗ Erro ao desconectar do MongoDB:', error);
      throw error;
    }
  }

  initializeModels() {
    if (!this.db) {
      throw new Error('Banco de dados não conectado');
    }

    // Inicializar todos os modelos
    this.models.Usuario = new Usuario(this.db);
    this.models.Candidato = new Candidato(this.db);
    
    // Quando criar os outros modelos, adicionar aqui:
    // this.models.Empresa = new Empresa(this.db);
    // this.models.Vaga = new Vaga(this.db);
    // this.models.Candidatura = new Candidatura(this.db);
    // this.models.Contrato = new Contrato(this.db);
    // this.models.Notificacao = new Notificacao(this.db);
    // this.models.Log = new Log(this.db);
    // this.models.Configuracao = new Configuracao(this.db);
  }

  // Getters para facilitar o acesso aos modelos
  get Usuario() {
    if (!this.models.Usuario) {
      throw new Error('Modelo Usuario não inicializado. Conecte ao banco primeiro.');
    }
    return this.models.Usuario;
  }

  get Candidato() {
    if (!this.models.Candidato) {
      throw new Error('Modelo Candidato não inicializado. Conecte ao banco primeiro.');
    }
    return this.models.Candidato;
  }

  // Adicionar getters para outros modelos conforme forem criados
  /*
  get Empresa() {
    if (!this.models.Empresa) {
      throw new Error('Modelo Empresa não inicializado. Conecte ao banco primeiro.');
    }
    return this.models.Empresa;
  }

  get Vaga() {
    if (!this.models.Vaga) {
      throw new Error('Modelo Vaga não inicializado. Conecte ao banco primeiro.');
    }
    return this.models.Vaga;
  }
  */

  // Método utilitário para verificar conexão
  checkConnection() {
    if (!this.isConnected || !this.db) {
      throw new Error('Banco de dados não conectado');
    }
    return true;
  }

  // Método para executar transações
  async withTransaction(callback) {
    this.checkConnection();
    const session = this.client.startSession();
    
    try {
      return await session.withTransaction(callback);
    } finally {
      await session.endSession();
    }
  }

  // Método para health check
  async healthCheck() {
    try {
      if (!this.isConnected) {
        return { status: 'disconnected', message: 'Não conectado ao banco' };
      }

      // Testa uma operação simples
      await this.db.admin().ping();
      
      return {
        status: 'connected',
        message: 'Banco de dados funcionando corretamente',
        database: this.db.databaseName
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Erro na conexão: ${error.message}`
      };
    }
  }

  // Método para estatísticas gerais
  async getGeneralStats() {
    try {
      this.checkConnection();
      
      const collections = await this.db.listCollections().toArray();
      const stats = {};
      
      for (const collection of collections) {
        const collectionName = collection.name;
        const count = await this.db.collection(collectionName).countDocuments();
        stats[collectionName] = count;
      }
      
      return {
        totalCollections: collections.length,
        collections: stats,
        timestamp: new Date()
      };
    } catch (error) {
      throw new Error(`Erro ao obter estatísticas: ${error.message}`);
    }
  }
}

// Instância singleton do gerenciador de banco
const dbManager = new DatabaseManager();

// Exportar a instância e os modelos individuais
module.exports = {
  // Instância principal
  dbManager,
  
  // Acesso direto aos modelos (quando conectado)
  get Usuario() { return dbManager.Usuario; },
  get Candidato() { return dbManager.Candidato; },
  
  // Métodos de conexão
  connect: dbManager.connect.bind(dbManager),
  disconnect: dbManager.disconnect.bind(dbManager),
  
  // Utilitários
  healthCheck: dbManager.healthCheck.bind(dbManager),
  getGeneralStats: dbManager.getGeneralStats.bind(dbManager),
  withTransaction: dbManager.withTransaction.bind(dbManager),
  
  // Classes dos modelos para uso direto se necessário
  models: {
    Usuario,
    Candidato
  }
}; 