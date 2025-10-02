import { testConnection } from './config/database';
import { connectMongoDB } from './config/mongoDB';

async function test() {
  console.log('🧪 Testando conexão PostgreSQL...');
  await testConnection();
  
  console.log('🧪 Testando conexão MongoDB...');
  await connectMongoDB();
  
  console.log('🎉 Todos os testes passaram!');
}

test().catch(console.error);

