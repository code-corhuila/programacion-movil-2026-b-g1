# CP2 · Navegación y tokens de diseño

## Patrón de navegación

Movie Rater tiene dos secciones principales: **Buscar** (Home) y **Mi perfil** (Profile). Antes solo se llegaba a Perfil con un texto en la cabecera y no había forma visible de volver.

- **Barra inferior fija** en Home y Profile, con ícono y texto. Son las dos secciones que el usuario usa más y quedan a un toque desde cualquiera de ellas.
- **Pila** para el detalle: `/movie/:id` se abre encima de Home y se vuelve con el botón atrás.
- Login y Registro quedan fuera de la barra porque son el flujo de entrada.

Componente: `app/src/components/BottomNav.tsx`.

## Tokens

Definidos en `app/src/theme/variables.css`.

| Token | Valor | Uso |
|---|---|---|
| `--ion-color-primary` | `#0054e9` | Botones y acciones principales |
| `--ion-color-secondary` | `#b45309` | Estrellas y calificaciones |
| `--ion-color-success` | `#1b7f3b` | Confirmaciones |
| `--ion-color-danger` | `#c5000f` | Errores |
| `--app-color-texto-secundario` | `#5f5f5f` | Ayudas y subtítulos |
| `--app-font-sm` / `md` / `lg` / `xl` | 0.875 / 1 / 1.25 / 1.5 rem | Tamaños de letra |
| `--app-space-xs` / `sm` / `md` / `lg` | 4 / 8 / 16 / 24 px | Espacios |
| `--app-touch-min` | 44 px | Área táctil mínima |

## Contraste

Medido con el verificador de contraste de WebAIM. Mínimo exigido: 4.5 a 1.

| Texto | Fondo | Relación | ¿Cumple? |
|---|---|---|---|
| `#ffffff` | `#0054e9` (primario) | | |
| `#ffffff` | `#b45309` (secundario) | | |
| `#ffffff` | `#1b7f3b` (éxito) | | |
| `#ffffff` | `#c5000f` (error) | | |
| `#5f5f5f` | `#ffffff` (texto secundario) | | |
| `#0054e9` | `#ffffff` (enlaces) | | |
