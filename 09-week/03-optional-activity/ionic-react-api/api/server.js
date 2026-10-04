const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: 'Revisar actividad de Semana 9',
    description: 'Construir la aplicación Ionic React y conectarla con la API.'
  },
  {
    id: 2,
    title: 'Probar la API',
    description: 'Verificar los endpoints GET y POST.'
  }
];

// GET: listar tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST: crear una tarea
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: 'El título y la descripción son obligatorios.'
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// GET: detalle de una tarea
app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      error: 'Tarea no encontrada.'
    });
  }

  res.json(task);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
