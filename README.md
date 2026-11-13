# Programacion Movil - 2026-B

Repositorio de clase - Corporacion Universitaria del Huila (CORHUILA).

| | |
| --- | --- |
| **Grupo** | 1 |
| **Horario** | Lunes 6:30 p. m. - 8:10 p. m.<br>Viernes 7:20 p. m. - 8:10 p. m. |
| **Aula** | C5-508 |
| **Semestre** | 2026-B |
| **Frecuencia** | 2 sesiones por semana |

## Estructura

El repositorio esta organizado en 16 semanas (`01-week` .. `16-week`).
Cada semana tiene la siguiente forma:

```
NN-week/
|-- 01-session/           # Primera sesion de la semana
|-- 02-session/           # Segunda sesion de la semana
\-- 03-optional-activity/ # Actividad opcional de refuerzo
```

- Las carpetas `NN-session` contienen el material trabajado en clase.
- `optional-activity` guarda ejercicios opcionales de refuerzo, no calificables.

## Como trabajar

```bash
git clone https://github.com/code-corhuila/programacion-movil-2026-b-g1.git
cd programacion-movil-2026-b-g1
```

Antes de cada clase, actualiza tu copia local:

```bash
git pull origin main
```

## Architecture

This project consists of an Ionic React frontend integrated with a custom Express.js REST API. The API serves endpoints for fetching all tasks via GET `/api/tasks` and creating new task items using POST `/api/tasks`. Additionally, individual task resources are accessed through GET `/api/tasks/:id` to display full item specifications. The React frontend leverages standard React Hooks such as `useState` and `useEffect` alongside asynchronous JavaScript `fetch` calls to consume these JSON resources dynamically. Network errors and asynchronous loading states are gracefully captured and displayed to ensure an optimal user experience. Navigation between the task list and the detailed item view is efficiently handled through standard React Router Dom components integrated into Ionic React.
