# Actividad 8 - API REST con Express y consumo con fetch

## Objetivo

Crear una API REST con Express que permita consultar y crear tareas mediante los métodos GET y POST. También se implementan funciones fetch para consumir la API y manejar errores.

## Estructura

03-optional-activity/
- api/server.js
- api/package.json
- api/package-lock.json
- api/.gitignore
- fetch/tareas.js
- README.md

## API REST

La API utiliza Express y administra una entidad llamada tareas.

### GET /tareas

URL: http://localhost:3000/tareas

Devuelve la lista de tareas en formato JSON.

### POST /tareas

URL: http://localhost:3000/tareas

Recibe una tarea en formato JSON.

Ejemplo de información enviada:

{
  "titulo": "Probar API REST",
  "completada": false
}

La API valida que el campo titulo exista y sea un texto. Cuando la solicitud es correcta devuelve la nueva tarea con código HTTP 201.

## Ejecución

Desde la carpeta api se instalan las dependencias con:

npm install

Para iniciar el servidor:

npm start

La API queda disponible en:

http://localhost:3000

También se habilitó CORS para permitir el consumo desde una aplicación cliente.

## Prueba GET

Se probó el endpoint utilizando:

curl http://localhost:3000/tareas

Resultado obtenido:

[
  {
    "id": 1,
    "titulo": "Estudiar Programación Móvil",
    "completada": false
  },
  {
    "id": 2,
    "titulo": "Realizar la actividad 8",
    "completada": true
  }
]

## Prueba POST

Se probó el endpoint utilizando:

curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d '{"titulo":"Probar API REST","completada":false}'

Resultado obtenido:

{
  "id": 3,
  "titulo": "Probar API REST",
  "completada": false
}

## Consumo mediante fetch

El archivo fetch/tareas.js contiene dos funciones:

- listarTareas(): realiza una solicitud GET a la API y devuelve las tareas.
- crearTarea(): realiza una solicitud POST para crear una nueva tarea.

Las funciones utilizan try/catch y verifican respuesta.ok para manejar errores HTTP.

Las funciones fueron probadas desde Node.js y se obtuvo:

Tareas: [
  { id: 1, titulo: "Estudiar Programación Móvil", completada: false },
  { id: 2, titulo: "Realizar la actividad 8", completada: true },
  { id: 3, titulo: "Probar API REST", completada: false }
]

Tarea creada: {
  id: 4,
  titulo: "Tarea creada con fetch",
  completada: false
}

## Validación de errores

La API rechaza solicitudes POST cuando no se proporciona correctamente el campo titulo.

En ese caso responde con código HTTP 400 y un mensaje indicando que el campo titulo es obligatorio y debe ser un texto.

## Conclusión

Se creó y probó una API REST con Express utilizando los métodos GET y POST. También se implementaron funciones fetch para consultar y crear tareas, incluyendo manejo de errores mediante try/catch y validación de respuestas HTTP.
