const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: '1', title: 'Aprender Ionic React', description: 'Revisar hooks de useState y useEffect' },
  { id: '2', title: 'Crear API Express', description: 'Implementar endpoints GET y POST' }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  const newTask = {
    id: String(Date.now()),
    title,
    description
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
