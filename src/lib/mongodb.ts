import { MongoClient, ServerApiVersion, Db } from 'mongodb';

// Configuração da conexão MongoDB Atlas
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Por favor, defina a variável MONGODB_URI no arquivo .env.local');
}

// Configurações do cliente MongoDB
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // No desenvolvimento, usar uma variável global para preservar a conexão
  // durante hot reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Em produção, criar uma nova conexão
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Função para obter o banco de dados
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB_NAME || 'leao-careers');
}

// Função para testar a conexão
export async function testConnection(): Promise<boolean> {
  try {
    const client = await clientPromise;
    // Fazer ping para testar a conexão
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB Atlas:', error);
    return false;
  }
}

// Collections da aplicação
export const Collections = {
  CANDIDATOS: 'candidatos',
  EMPRESAS: 'empresas',
  VAGAS: 'vagas',
  MATCHES: 'matches',
  USUARIOS: 'usuarios',
  LOGS: 'logs',
  NOTIFICACOES: 'notificacoes',
  CONFIGURACOES: 'configuracoes'
} as const;

// Função para obter uma collection específica
export async function getCollection(name: string) {
  const db = await getDatabase();
  return db.collection(name);
}

export default clientPromise; 