import { query } from '../config/database';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  try {
    console.log('🔄 Executando migrations...');

    // Ler arquivo de migration
    const migrationPath = path.join(__dirname, 'migrations/001_create_users.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Executar migration
    await query(migrationSQL);
    console.log('✅ Tabela de usuários criada com sucesso!');

    // Verificar se a tabela foi criada
    const checkResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    `);

    if (checkResult.rows.length > 0) {
      console.log('✅ Tabela "users" verificada e pronta para uso!');
    } else {
      throw new Error('Tabela users não foi criada');
    }

  } catch (error) {
    console.error('❌ Erro na migration:', error);
    process.exit(1);
  }
}

runMigrations();