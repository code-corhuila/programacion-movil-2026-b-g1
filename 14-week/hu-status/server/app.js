/**
 * Express application (no listen) so it can be started by server.js
 * and exercised by the automated tests.
 *
 * Endpoints
 *   GET  /api/health    public  – health check
 *   POST /api/login     public  – { email, password } -> { token, expiresIn, user }
 *   GET  /api/profile   Bearer  – the authenticated user
 *   GET  /api/subjects  Bearer  – the user's subjects (protected list)
 */
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

/** Demo account (course activity only; there is no user database). */
const DEMO_USER = {
  id: 1,
  name: 'Andres Felipe Gomez Anacona',
  email: 'estudiante@corhuila.edu.co',
  password: 'Movil2026*',
  program: 'Ingeniería de Sistemas',
};

const SUBJECTS = [
  { id: 1, name: 'Programación Móvil', credits: 3, teacher: 'Docente de Programación Móvil', average: 4.3 },
  { id: 2, name: 'Bases de Datos II', credits: 3, teacher: 'Docente de Bases de Datos', average: 3.8 },
  { id: 3, name: 'Ingeniería de Software II', credits: 3, teacher: 'Docente de Ingeniería de Software', average: 4.0 },
  { id: 4, name: 'Redes de Computadores', credits: 2, teacher: 'Docente de Redes', average: 2.9 },
  { id: 5, name: 'Estadística', credits: 2, teacher: 'Docente de Estadística', average: 3.5 },
  { id: 6, name: 'Inglés V', credits: 1, teacher: 'Docente de Inglés', average: 4.6 },
];

function createApp(options = {}) {
  const secret = options.secret ?? process.env.JWT_SECRET ?? 'w14-dev-secret-change-me';
  // Short lifetime on purpose: an expired token is the natural way to get a 401.
  const tokenTtlSeconds = Number(options.tokenTtlSeconds ?? process.env.TOKEN_TTL_SECONDS ?? 300);

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/login', (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (email.trim().toLowerCase() !== DEMO_USER.email || password !== DEMO_USER.password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ sub: DEMO_USER.id, email: DEMO_USER.email }, secret, {
      expiresIn: tokenTtlSeconds,
    });
    return res.json({ token, expiresIn: tokenTtlSeconds, user: publicUser() });
  });

  /** Bearer token middleware: any missing, invalid or expired token -> 401. */
  function requireAuth(req, res, next) {
    const header = req.get('Authorization') ?? '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Missing bearer token.' });
    }
    try {
      req.user = jwt.verify(token, secret);
      return next();
    } catch (error) {
      const reason = error instanceof jwt.TokenExpiredError ? 'Token expired.' : 'Invalid token.';
      return res.status(401).json({ error: reason });
    }
  }

  app.get('/api/profile', requireAuth, (_req, res) => {
    res.json(publicUser());
  });

  app.get('/api/subjects', requireAuth, (_req, res) => {
    res.json(SUBJECTS);
  });

  return app;
}

function publicUser() {
  const { password: _password, ...user } = DEMO_USER;
  return user;
}

module.exports = { createApp, DEMO_USER };
