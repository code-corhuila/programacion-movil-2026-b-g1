// API de prueba sin dependencias (Node >= 18). Úsala si tu API no está disponible.
// POST /auth/login {email, password:"123456"} -> {token}
// GET  /api/profile (Authorization: Bearer <token>) -> perfil | 401
import http from 'node:http';
import crypto from 'node:crypto';

const TOKEN_TTL_MS = 5 * 60 * 1000; // el token expira en 5 minutos (para probar el 401)
const tokens = new Map();

const send = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(JSON.stringify(data));
};

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method === 'POST' && req.url === '/auth/login') {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      const { email, password } = JSON.parse(raw || '{}');
      if (!email || password !== '123456') return send(res, 401, { message: 'Credenciales inválidas' });
      const token = crypto.randomUUID();
      tokens.set(token, { email, exp: Date.now() + TOKEN_TTL_MS });
      send(res, 200, { token });
    });
    return;
  }
  if (req.method === 'GET' && req.url === '/api/profile') {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    const s = tokens.get(token);
    if (!s || s.exp < Date.now()) return send(res, 401, { message: 'Token inválido o expirado' });
    return send(res, 200, { name: 'Estudiante Corhuila', email: s.email, role: 'student' });
  }
  send(res, 404, { message: 'No encontrado' });
}).listen(3000, '0.0.0.0', () => console.log('Mock API en http://localhost:3000'));
