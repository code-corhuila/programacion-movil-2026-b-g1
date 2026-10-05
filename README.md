# Ice Cream App (ICA) - Semana 9

Actividad calificable: App Ionic React + API.

## Estructura

- `backend/`: API REST Express con endpoints GET y POST.
- `frontend/`: aplicación Ionic React que consume la API mediante `fetch`.

## Requisitos de la actividad cubiertos

- API REST mínima con Express.
- GET y POST con JSON.
- Listado de datos en Ionic React.
- Formulario para crear un nuevo registro.
- `useState` para el manejo de estado.
- Manejo de errores de red.
- Navegación a pantalla de detalle.
- Sección `Architecture` en inglés en este README.

## Architecture

The backend is an Express REST API that exposes JSON endpoints for the Ice Cream App. The `GET /ice-creams` endpoint returns the available ice creams to the Ionic React application. The `POST /ice-creams` endpoint receives JSON data and creates a new ice cream record. The frontend consumes these endpoints with the browser `fetch` API. React `useState` is used to manage form fields, loading state, and network errors. The application also navigates from the list to a detail screen for the selected ice cream.

## Ejecución

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La API usa `http://localhost:3000` y el frontend usa `http://localhost:5173`.
