async function listarTareas() {
    try {
        const respuesta = await fetch("http://localhost:3000/tareas");

        if (!respuesta.ok) {
            throw new Error("Error al obtener las tareas");
        }

        const tareas = await respuesta.json();

        console.log("Tareas:", tareas);
    } catch (error) {
        console.error("Error:", error.message);
    }
}


async function crearTarea(titulo) {
    try {
        const respuesta = await fetch("http://localhost:3000/tareas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo
            })
        });

        if (!respuesta.ok) {
            throw new Error("Error al crear la tarea");
        }

        const nuevaTarea = await respuesta.json();

        console.log("Tarea creada:", nuevaTarea);
    } catch (error) {
        console.error("Error:", error.message);
    }
}


async function completarTarea(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "PUT"
        });

        if (!respuesta.ok) {
            throw new Error("Error al completar la tarea");
        }

        const tareaActualizada = await respuesta.json();

        console.log("Tarea completada:", tareaActualizada);
    } catch (error) {
        console.error("Error:", error.message);
    }
}


// Ejecutar las funciones
listarTareas();
