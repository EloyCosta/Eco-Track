import { query } from '../config/database';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  try {
    console.log('🔄 Executando migrations...');

    // ✅ LER TODOS OS ARQUIVOS .sql DA PASTA MIGRATIONS
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Ordenar para executar na ordem correta

    console.log(`📁 Encontradas ${migrationFiles.length} migrations:`, migrationFiles);

    for (const migrationFile of migrationFiles) {
      const migrationPath = path.join(migrationsDir, migrationFile);
      console.log(`📄 Executando: ${migrationFile}`);
      
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      // Executar migration
      await query(migrationSQL);
      console.log(`✅ ${migrationFile} executada com sucesso!`);
    }

    // ✅ VERIFICAR TODAS AS TABELAS CRIADAS
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('📊 Tabelas no banco:', tablesResult.rows.map(row => row.table_name));

  } catch (error) {
    console.error('❌ Erro na migration:', error);
    process.exit(1);
  }
}

runMigrations();