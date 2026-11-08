
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('Configura JWT_SECRET con al menos 32 caracteres.');
}

app.use(cors());
app.use(express.json());

const users = [];
const reports = [
  {
    id: 1,
    equipo: 'Proyector del salón 201',
    descripcion: 'El proyector no enciende.',
    estado: 'Pendiente',
  },
  {
    id: 2,
    equipo: 'Computador de biblioteca',
    descripcion: 'El teclado presenta fallas.',
    estado: 'En revisión',
  },
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'AulaFix API' });
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.includes('@') ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: 'Ingresa un correo válido y una contraseña de mínimo 8 caracteres.',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(user => user.email === normalizedEmail)) {
    return res.status(409).json({
      message: 'El usuario ya existe.',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  users.push({
    id: users.length + 1,
    email: normalizedEmail,
    passwordHash,
  });

  return res.status(201).json({
    message: 'Usuario registrado correctamente.',
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      message: 'Correo y contraseña obligatorios.',
    });
  }

  const user = users.find(
    u => u.email === email.trim().toLowerCase()
  );

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({
      message: 'Credenciales incorrectas.',
    });
  }

  const token = jwt.sign(
    { sub: String(user.id), email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
});

function authenticate(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Token requerido.',
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      message: 'Token inválido o expirado.',
    });
  }
}

app.get('/api/reports', authenticate, (_req, res) => {
  res.json(reports);
});

app.listen(PORT, () => {
  console.log(`AulaFix API funcionando en http://localhost:${PORT}`);
});
