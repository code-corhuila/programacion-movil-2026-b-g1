const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, title: 'Proyecto Integrador', description: 'Cierre del Corte 2 con Ionic React y Express', category: 'Académico' },
  { id: 2, title: 'Configurar Backend', description: 'Servidor Express con endpoints GET y POST', category: 'Backend' }
];

app.get('/api/items', (req, res) => {
  res.json({ success: true, data: items });
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: 'Elemento no encontrado' });
  }
  res.json({ success: true, data: item });
});

app.post('/api/items', (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'El título y la descripción son obligatorios' });
  }
  const newItem = {
    id: items.length + 1,
    title,
    description,
    category: category || 'General'
  };
  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor de la Semana 10 corriendo en http://localhost:${PORT}`);
});
