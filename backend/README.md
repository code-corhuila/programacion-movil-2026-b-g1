# ICA Backend

API REST mínima para Ice Cream App (ICA), desarrollada con Express.

## Endpoints

### GET /ice-creams
Devuelve la lista de helados en formato JSON.

### POST /ice-creams
Crea un nuevo helado. Ejemplo:

```json
{
  "name": "Mango",
  "flavor": "Mango",
  "price": 8500,
  "description": "Helado de mango."
}
```

## Ejecución

```bash
npm install
npm start
```

La API queda disponible en:

`http://localhost:3000`
