import app from './app';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
console.log(`🚀 EcoTrack decolou! Servidor rodando firme na porta ${PORT}`);
console.log(`🌍 Modo de execução: ${process.env.NODE_ENV || 'desenvolvimento'}`);
console.log(`💚 Monitoramento de saúde: http://localhost:${PORT}/health`);
console.log(`🔒 Endpoints de login e segurança: http://localhost:${PORT}/api/auth`);

});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Desligando o servidor com cuidado...');
  server.close(() => {
    console.log('✅ Servidor foi desligado com sucesso!');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n👋 Até a próxima, servidor finalizado!');
  server.close(() => {
    process.exit(0);
  });
});