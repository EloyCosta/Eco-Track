import { MongoClient, Db } from 'mongodb';

const mongoUri = process.env.MONGO_URI || 'mongodb://admin:password@localhost:27018';
const dbName = process.env.MONGO_DB_NAME || 'ecotrack_analytics';

let client: MongoClient;
let db: Db;

export const connectMongoDB = async (): Promise<Db> => {
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db(dbName);
    console.log('✅ MongoDB conectado com sucesso!');
    return db;
  } catch (error) {
    console.error('❌ Falha na conexão com o MongoDB:', error);
    throw error;
  }
};

export const getMongoDB = (): Db => {
  if (!db) {
    throw new Error('MongoDB not initialized. Call connectMongoDB first.');
  }
  return db;
};

export const closeMongoDB = async (): Promise<void> => {
  if (client) {
    await client.close();
  }
};