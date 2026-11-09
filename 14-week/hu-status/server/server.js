const { createApp } = require('./app');

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? '0.0.0.0';

createApp().listen(PORT, HOST, () => {
  console.log(`W14 API running on http://localhost:${PORT} (listening on ${HOST})`);
  console.log('Demo login: estudiante@corhuila.edu.co / Movil2026*');
});
