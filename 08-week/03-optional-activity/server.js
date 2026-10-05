const express = require("express");

const app = express();
const PORT = 3000;

// Permite recibir información en formato JSON
app.use(express.json());

// Datos temporales de nuestra API
let tareas = [
    {
        id: 1,
        titulo: "Estudiar Express",
        completada: false
    },
    {
        id: 2,
        titulo: "Probar la API",
        completada: false
    }
];

// GET /tareas
// Devuelve todas las tareas
app.get("/tareas", (req, res) => {
    res.json(tareas);
});

// POST /tareas
// Crea una nueva tarea
app.post("/tareas", (req, res) => {
    const { titulo } = req.body || {};

    // Validar que exista el título
    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({
            error: "El título de la tarea es obligatorio"
        });
    }

    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: titulo.trim(),
        completada: false
    };

    tareas.push(nuevaTarea);

    res.status(201).json(nuevaTarea);
});

// PUT /tareas/:id
// Marca una tarea como completada
app.put("/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return res.status(404).json({
            error: "Tarea no encontrada"
        });
    }

    tarea.completada = true;

    res.json(tarea);
});

// Ruta para comprobar que el servidor funciona
app.get("/", (req, res) => {
    res.json({
        mensaje: "API de tareas funcionando correctamente"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});