# Week 9 - Ionic React App + Express API

## Architecture

The application follows a client-server architecture separating the mobile user interface from the backend data persistence layer. The backend API is built using Node.js and Express, exposing RESTful HTTP endpoints that allow clients to perform standard CRUD operations on the tasks entity. Specifically, the GET `/api/tasks` endpoint returns a full JSON array of stored items, while POST `/api/tasks` accepts a JSON payload to validate and append a new task record. The frontend is constructed using Ionic React with TypeScript, using standard React `useState` hooks to manage local component state, form inputs, and network loading indicators. Data consumption is handled via the asynchronous JavaScript `fetch` API, wrapped in try-catch blocks to catch network degradation and server errors gracefully. Furthermore, React Router enables navigation between the main listing interface and individual item detail views using dynamic route parameters.

## How to Run

1. Start the API server:
   cd api && node server.js

2. Start the Ionic application:
   cd app && npm start
