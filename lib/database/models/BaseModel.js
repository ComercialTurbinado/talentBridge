// ================================
// MODELO BASE PARA TODOS OS MODELOS
// PLATAFORMA LEÃO CAREERS
// ================================

const { ObjectId } = require('mongodb');

class BaseModel {
  constructor(db, collectionName) {
    this.db = db;
    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);
  }

  // ================================
  // MÉTODOS DE AUDITORIA
  // ================================

  addAuditInfo(data, userId, isUpdate = false) {
    const now = new Date();
    
    if (isUpdate) {
      data.auditoria = {
        ...data.auditoria,
        atualizadoPor: userId ? new ObjectId(userId) : null,
        atualizadoEm: now
      };
    } else {
      data.auditoria = {
        criadoPor: userId ? new ObjectId(userId) : null,
        criadoEm: now,
        atualizadoPor: userId ? new ObjectId(userId) : null,
        atualizadoEm: now
      };
    }
    
    return data;
  }

  // ================================
  // MÉTODOS CRUD BÁSICOS
  // ================================

  async create(data, userId = null) {
    try {
      const dataWithAudit = this.addAuditInfo(data, userId);
      const result = await this.collection.insertOne(dataWithAudit);
      
      if (result.acknowledged) {
        return await this.findById(result.insertedId);
      }
      
      throw new Error('Falha ao criar documento');
    } catch (error) {
      throw new Error(`Erro ao criar no ${this.collectionName}: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Erro ao buscar por ID no ${this.collectionName}: ${error.message}`);
    }
  }

  async findOne(filter = {}) {
    try {
      return await this.collection.findOne(filter);
    } catch (error) {
      throw new Error(`Erro ao buscar documento no ${this.collectionName}: ${error.message}`);
    }
  }

  async find(filter = {}, options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sort = { 'auditoria.criadoEm': -1 },
        projection = {}
      } = options;

      const skip = (page - 1) * limit;
      
      const [documents, total] = await Promise.all([
        this.collection
          .find(filter, { projection })
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.collection.countDocuments(filter)
      ]);

      return {
        documents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar documentos no ${this.collectionName}: ${error.message}`);
    }
  }

  async updateById(id, data, userId = null) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }

      const dataWithAudit = this.addAuditInfo(data, userId, true);
      delete dataWithAudit._id; // Remove _id do update
      
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: dataWithAudit }
      );

      if (result.matchedCount === 0) {
        throw new Error('Documento não encontrado');
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar no ${this.collectionName}: ${error.message}`);
    }
  }

  async updateOne(filter, data, userId = null) {
    try {
      const dataWithAudit = this.addAuditInfo(data, userId, true);
      delete dataWithAudit._id;
      
      const result = await this.collection.updateOne(filter, { $set: dataWithAudit });
      
      if (result.matchedCount === 0) {
        throw new Error('Documento não encontrado');
      }

      return result;
    } catch (error) {
      throw new Error(`Erro ao atualizar no ${this.collectionName}: ${error.message}`);
    }
  }

  async updateMany(filter, data, userId = null) {
    try {
      const dataWithAudit = this.addAuditInfo(data, userId, true);
      delete dataWithAudit._id;
      
      return await this.collection.updateMany(filter, { $set: dataWithAudit });
    } catch (error) {
      throw new Error(`Erro ao atualizar múltiplos no ${this.collectionName}: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }

      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        throw new Error('Documento não encontrado');
      }

      return result;
    } catch (error) {
      throw new Error(`Erro ao deletar no ${this.collectionName}: ${error.message}`);
    }
  }

  async deleteOne(filter) {
    try {
      return await this.collection.deleteOne(filter);
    } catch (error) {
      throw new Error(`Erro ao deletar documento no ${this.collectionName}: ${error.message}`);
    }
  }

  async deleteMany(filter) {
    try {
      return await this.collection.deleteMany(filter);
    } catch (error) {
      throw new Error(`Erro ao deletar múltiplos no ${this.collectionName}: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE AGREGAÇÃO
  // ================================

  async aggregate(pipeline) {
    try {
      return await this.collection.aggregate(pipeline).toArray();
    } catch (error) {
      throw new Error(`Erro na agregação no ${this.collectionName}: ${error.message}`);
    }
  }

  async count(filter = {}) {
    try {
      return await this.collection.countDocuments(filter);
    } catch (error) {
      throw new Error(`Erro ao contar documentos no ${this.collectionName}: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE BUSCA AVANÇADA
  // ================================

  async search(searchText, fields = [], options = {}) {
    try {
      if (!searchText || fields.length === 0) {
        return await this.find({}, options);
      }

      const searchRegex = new RegExp(searchText, 'i');
      const searchConditions = fields.map(field => ({
        [field]: { $regex: searchRegex }
      }));

      const filter = { $or: searchConditions };
      
      return await this.find(filter, options);
    } catch (error) {
      throw new Error(`Erro na busca textual no ${this.collectionName}: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE VALIDAÇÃO
  // ================================

  async exists(filter) {
    try {
      const count = await this.collection.countDocuments(filter);
      return count > 0;
    } catch (error) {
      throw new Error(`Erro ao verificar existência no ${this.collectionName}: ${error.message}`);
    }
  }

  async existsById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        return false;
      }
      
      return await this.exists({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Erro ao verificar existência por ID no ${this.collectionName}: ${error.message}`);
    }
  }

  // ================================
  // MÉTODOS DE TRANSAÇÃO
  // ================================

  async withTransaction(callback) {
    const session = this.db.client.startSession();
    
    try {
      return await session.withTransaction(async () => {
        return await callback(session);
      });
    } finally {
      await session.endSession();
    }
  }

  // ================================
  // MÉTODOS UTILITÁRIOS
  // ================================

  createObjectId(id = null) {
    return id ? new ObjectId(id) : new ObjectId();
  }

  isValidObjectId(id) {
    return ObjectId.isValid(id);
  }

  toObjectId(id) {
    return new ObjectId(id);
  }
}

module.exports = BaseModel; 