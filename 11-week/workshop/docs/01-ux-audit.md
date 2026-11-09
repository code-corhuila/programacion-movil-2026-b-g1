# CP1 · Auditoría UX — Movie Rater

Pantallas auditadas:

- **Login**: inicio de sesión (`Login.tsx` → `POST /api/auth/login`).
- **Profile**: datos del usuario e historial de reseñas con editar y eliminar (`Profile.tsx` → `GET/PUT/DELETE /api/resenas`). Es la lista que carga datos.

Capturas del estado actual:

| Pantalla | Captura |
|---|---|
| Login | ![Login antes](img/before-login.png) |
| Profile | ![Profile antes](img/before-profile.png) |

## Hallazgos

| # | Pantalla | Problema | Principio | Severidad | Arreglo propuesto |
|---|---|---|---|---|---|
| 1 | Login | Si el backend no responde aparece "Failed to fetch", un mensaje técnico y en inglés | Retroalimentación / mensajes de error comprensibles | Alta | Mensaje en español: "No pudimos conectar con el servidor. Intenta de nuevo." |
| 2 | Login | El botón INICIAR SESIÓN no muestra carga mientras espera la respuesta y se puede tocar varias veces | Estados de la interfaz: cargando | Media | Spinner dentro del botón y botón deshabilitado durante la petición |
| 3 | Login | No se valida el formato del correo ni los campos vacíos antes de enviar | Prevención de errores | Media | Validar cada campo y mostrar el mensaje debajo del campo |
| 4 | Login | El mensaje de error en rojo no se anuncia al lector de pantalla | Accesibilidad | Media | Contenedor del error con `role="alert"` |
| 5 | Login | El texto de ayuda gris claro de los campos tiene poco contraste sobre blanco | Contraste (mínimo 4.5 a 1) | Media | Oscurecer el color y medirlo con el verificador de WebAIM |
| 6 | Profile | Mientras cargan las reseñas la lista queda en blanco | Estados de la interfaz: cargando | Alta | `IonSkeletonText` con la forma de cada reseña |
| 7 | Profile | Si falla `GET /api/resenas` no hay mensaje ni forma de reintentar | Retroalimentación / estado de error | Alta | Mensaje en pantalla y botón Reintentar |
| 8 | Profile | Un usuario sin reseñas ve la lista vacía sin explicación | Estados de la interfaz: vacío | Media | Mensaje "Aún no has calificado películas" y botón que lleva a Home |
| 9 | Profile | Eliminar una reseña no pide confirmación | Prevención de errores en acciones destructivas | Alta | `IonAlert` antes de llamar a `eliminarResena` |
| 10 | Profile | Los botones de editar y eliminar son solo ícono, pequeños y sin `aria-label` | Área táctil mínima 44 px / etiquetas | Media | Botones de 44 px con `aria-label="Editar reseña"` y `"Eliminar reseña"` |
| 11 | Profile | Nombre y correo salen de `localStorage`; no se muestra el total de reseñas aunque `GET /api/perfil` lo entrega | Visibilidad del estado del sistema | Baja | Consumir `GET /api/perfil` y mostrar el total |
| 12 | General | Para ir a Perfil solo existe el texto "MI PERFIL" en la cabecera y no hay una navegación fija entre Home y Perfil | Patrón de navegación | Alta | `IonTabs` con las secciones Catálogo y Perfil |

## Mapa de navegación actual

Las flechas punteadas marcan dónde se pierde el usuario.

```mermaid
flowchart TD
  L[Login] -->|"Crear una cuenta"| R[Registro]
  R -->|"Ya tengo una cuenta"| L
  L -->|login exitoso| H[Home: buscar película]
  H -->|toca una película| D[MovieDetail]
  H -->|"MI PERFIL" en la cabecera| P[Profile: historial de reseñas]
  P -->|editar o eliminar reseña| P
  L -.->|backend caído: "Failed to fetch"| L
  P -.->|sin camino visible de vuelta a Home| H
```

## Orden de arreglo

| Checkpoint | Hallazgos |
|---|---|
| CP2 · Navegación y tokens | 12, 5 |
| CP3 · Tres estados de la lista | 6, 7, 8 |
| CP4 · Accesibilidad y responsivo | 4, 10 |
| CP6 · Formulario | 1, 2, 3 |
| CP7 · Detalle y flujo | 9, 11 |
