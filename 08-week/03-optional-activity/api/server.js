const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tareas = [
  {
    id: 1,
    titulo: 'Estudiar Programación Móvil',
    completada: false
  },
  {
    id: 2,
    titulo: 'Realizar la actividad 8',
    completada: true
  }
];

// GET /tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// POST /tareas
app.post('/tareas', (req, res) => {
  const { titulo, completada = false } = req.body;

  if (!titulo || typeof titulo !== 'string') {
    return res.status(400).json({
      error: 'El campo titulo es obligatorio y debe ser un texto'
    });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    completada
  };

  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
