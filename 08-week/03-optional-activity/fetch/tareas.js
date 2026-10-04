const API_URL = 'http://localhost:3000/tareas';

async function listarTareas() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const tareas = await respuesta.json();

    console.log('Tareas:', tareas);
    return tareas;
  } catch (error) {
    console.error('Error al listar las tareas:', error.message);
  }
}

async function crearTarea(titulo, completada = false) {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo,
        completada
      })
    });

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const nuevaTarea = await respuesta.json();

    console.log('Tarea creada:', nuevaTarea);
    return nuevaTarea;
  } catch (error) {
    console.error('Error al crear la tarea:', error.message);
  }
}

module.exports = {
  listarTareas,
  crearTarea
};
