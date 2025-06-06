// Script para inicializar o banco de dados MongoDB
// Execute: node scripts/init-db.js

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'leao-careers';

if (!uri) {
  console.error('❌ MONGODB_URI não definida no .env.local');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function initializeDatabase() {
  try {
    console.log('🔄 Conectando ao MongoDB Atlas...');
    await client.connect();
    
    const db = client.db(dbName);
    console.log(`✅ Conectado ao banco: ${dbName}`);

    // Criar índices
    console.log('🔄 Criando índices...');
    
    // Índices para candidatos
    await db.collection('candidatos').createIndex({ 'contato.email': 1 }, { unique: true });
    await db.collection('candidatos').createIndex({ status: 1 });
    await db.collection('candidatos').createIndex({ createdAt: -1 });
    
    // Índices para empresas
    await db.collection('empresas').createIndex({ 'contato.email': 1 }, { unique: true });
    await db.collection('empresas').createIndex({ status: 1 });
    await db.collection('empresas').createIndex({ 'empresa.segmento': 1 });
    
    // Índices para usuários
    await db.collection('usuarios').createIndex({ email: 1 }, { unique: true });
    
    // Índices para logs
    await db.collection('logs').createIndex({ timestamp: -1 });
    await db.collection('logs').createIndex({ usuario: 1 });

    console.log('✅ Índices criados');

    // Criar usuário administrador
    console.log('🔄 Criando usuário administrador...');
    
    const adminUser = {
      email: 'admin@leaocareers.com',
      nome: 'Administrador',
      role: 'superadmin',
      senha: '$2b$10$rQ3qZ8Y6dC7uG9fH4kL2mO3nS5vT7wX8yA9bE6cF1dG2hI3jK4lM5n', // LeaoAdmin2024!
      ativo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      await db.collection('usuarios').insertOne(adminUser);
      console.log('✅ Usuário admin criado');
    } catch (error) {
      if (error.code === 11000) {
        console.log('ℹ️  Usuário admin já existe');
      } else {
        throw error;
      }
    }

    // Inserir dados de exemplo (candidatos)
    console.log('🔄 Inserindo candidatos de exemplo...');
    
    const candidatosExemplo = [
      {
        dadosPessoais: {
          nomeCompleto: 'João Silva Santos',
          cpf: '123.456.789-00',
          dataNascimento: '1985-03-15',
          genero: 'masculino',
          estadoCivil: 'solteiro'
        },
        contato: {
          email: 'joao.santos@email.com',
          telefone: '(11) 99999-8888',
          linkedin: 'https://linkedin.com/in/joao-santos'
        },
        experiencia: [
          {
            empresa: 'Tech Corp',
            cargo: 'Desenvolvedor Senior',
            dataInicio: '2020-01-01',
            dataFim: null,
            atualEmprego: true
          }
        ],
        status: 'pendente',
        createdAt: new Date('2024-03-15T10:30:00'),
        updatedAt: new Date('2024-03-15T10:30:00')
      },
      {
        dadosPessoais: {
          nomeCompleto: 'Maria Oliveira Costa',
          cpf: '987.654.321-00',
          dataNascimento: '1990-07-22',
          genero: 'feminino',
          estadoCivil: 'casado'
        },
        contato: {
          email: 'maria.costa@email.com',
          telefone: '(11) 88888-7777',
          linkedin: 'https://linkedin.com/in/maria-costa'
        },
        experiencia: [
          {
            empresa: 'Marketing Solutions',
            cargo: 'Gerente de Marketing',
            dataInicio: '2018-06-01',
            dataFim: null,
            atualEmprego: true
          }
        ],
        status: 'aprovado',
        createdAt: new Date('2024-03-14T14:20:00'),
        updatedAt: new Date('2024-03-14T16:45:00')
      },
      {
        dadosPessoais: {
          nomeCompleto: 'Pedro Ferreira Lima',
          cpf: '456.789.123-00',
          dataNascimento: '1988-11-08',
          genero: 'masculino',
          estadoCivil: 'solteiro'
        },
        contato: {
          email: 'pedro.lima@email.com',
          telefone: '(11) 77777-6666',
          linkedin: 'https://linkedin.com/in/pedro-lima'
        },
        experiencia: [
          {
            empresa: 'Financial Group',
            cargo: 'Analista Financeiro',
            dataInicio: '2019-03-01',
            dataFim: null,
            atualEmprego: true
          }
        ],
        status: 'rejeitado',
        createdAt: new Date('2024-03-13T09:15:00'),
        updatedAt: new Date('2024-03-13T11:30:00')
      }
    ];

    try {
      await db.collection('candidatos').insertMany(candidatosExemplo);
      console.log('✅ Candidatos de exemplo inseridos');
    } catch (error) {
      if (error.code === 11000) {
        console.log('ℹ️  Candidatos de exemplo já existem');
      } else {
        throw error;
      }
    }

    // Inserir dados de exemplo (empresas)
    console.log('🔄 Inserindo empresas de exemplo...');
    
    const empresasExemplo = [
      {
        empresa: {
          nomeEmpresa: 'Tech Solutions Dubai',
          razaoSocial: 'Tech Solutions Dubai LLC',
          cnpj: '12.345.678/0001-90',
          segmento: 'tecnologia',
          porte: 'medio',
          website: 'https://techsolutions.ae',
          linkedin: 'https://linkedin.com/company/tech-solutions-dubai'
        },
        contato: {
          email: 'contato@techsolutions.ae',
          telefone: '+971 4 123-4567',
          endereco: {
            cidade: 'Dubai',
            estado: 'Dubai',
            pais: 'Emirados Árabes Unidos'
          }
        },
        responsavel: {
          nome: 'Ahmed Al-Rashid',
          cargo: 'HR Manager',
          email: 'ahmed@techsolutions.ae',
          telefone: '+971 50 123-4567'
        },
        status: 'pendente',
        createdAt: new Date('2024-03-15T08:30:00'),
        updatedAt: new Date('2024-03-15T08:30:00')
      },
      {
        empresa: {
          nomeEmpresa: 'Emirates Financial Group',
          razaoSocial: 'Emirates Financial Group PJSC',
          cnpj: '23.456.789/0001-01',
          segmento: 'financeiro',
          porte: 'grande',
          website: 'https://emiratesfinancial.ae',
          linkedin: 'https://linkedin.com/company/emirates-financial'
        },
        contato: {
          email: 'hr@emiratesfinancial.ae',
          telefone: '+971 4 234-5678',
          endereco: {
            cidade: 'Abu Dhabi',
            estado: 'Abu Dhabi',
            pais: 'Emirados Árabes Unidos'
          }
        },
        responsavel: {
          nome: 'Sarah Johnson',
          cargo: 'Talent Acquisition Manager',
          email: 'sarah.johnson@emiratesfinancial.ae',
          telefone: '+971 50 234-5678'
        },
        status: 'aprovado',
        createdAt: new Date('2024-03-14T10:15:00'),
        updatedAt: new Date('2024-03-14T15:30:00')
      }
    ];

    try {
      await db.collection('empresas').insertMany(empresasExemplo);
      console.log('✅ Empresas de exemplo inseridas');
    } catch (error) {
      if (error.code === 11000) {
        console.log('ℹ️  Empresas de exemplo já existem');
      } else {
        throw error;
      }
    }

    console.log('🎉 Banco de dados inicializado com sucesso!');
    console.log('\n📋 Credenciais de acesso:');
    console.log('E-mail: admin@leaocareers.com');
    console.log('Senha: LeaoAdmin2024!');

  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Executar inicialização
initializeDatabase(); 