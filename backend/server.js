import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let iceCreams = [
  {
    id: 1,
    name: 'Chocolate',
    flavor: 'Chocolate',
    price: 8000,
    description: 'Helado cremoso de chocolate.'
  },
  {
    id: 2,
    name: 'Vainilla',
    flavor: 'Vainilla',
    price: 7000,
    description: 'Helado clásico de vainilla.'
  },
  {
    id: 3,
    name: 'Fresa',
    flavor: 'Fresa',
    price: 7500,
    description: 'Helado de fresa elaborado con fruta.'
  }
];

app.get('/', (_req, res) => {
  res.json({
    message: 'Ice Cream App API funcionando correctamente'
  });
});

app.get('/ice-creams', (_req, res) => {
  res.json(iceCreams);
});

app.post('/ice-creams', (req, res) => {
  const { name, flavor, price, description } = req.body;

  if (!name || !flavor || price === undefined || !description) {
    return res.status(400).json({
      error: 'name, flavor, price y description son obligatorios'
    });
  }

  const newIceCream = {
    id: iceCreams.length
      ? Math.max(...iceCreams.map((item) => Number(item.id))) + 1
      : 1,
    name,
    flavor,
    price: Number(price),
    description
  };

  iceCreams.push(newIceCream);

  res.status(201).json(newIceCream);
});

app.listen(PORT, () => {
  console.log(`ICA API running at http://localhost:${PORT}`);
});
