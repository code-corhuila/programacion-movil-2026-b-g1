# CP4: Accesibilidad y Diseño Responsivo (UNIreserve)

## 1. Correcciones de Accesibilidad (WCAG 2.1 AA)
- **Atributos `aria-label`**: Añadidos en todos los botones que contienen únicamente íconos (`IonIcon`).
- **Áreas Táctiles (<48px)**: Los botones de filtrado y navegación se ajustaron a un área táctil mínima de **48px x 48px**.
- **Texto Alternativo**: Todas las imágenes de las salas incluyen etiquetas `alt` descriptivas (ej. *"Laboratorio de Cómputo 301 con 30 equipos"*).

## 2. Puntuaciones de Lighthouse (Accesibilidad)
- **Puntuación Inicial (Antes)**: `68 / 100` (Falta de contraste, áreas táctiles pequeñas y ausencia de etiquetas ARIA).
- **Puntuación Final (Después)**: `98 / 100` (Corrección de atributos aria-label, contraste 4.5:1 y targets táctiles de 48px).

## 3. Pruebas de Diseño Responsivo
- **Vista Móvil Compacta (360px)**: Disposición vertical limpia de tarjetas sin desbordamiento horizontal (`after-responsive-360.png`).
- **Vista Tablet / Escritorio (768px)**: Disposición en cuadrícula de 2 columnas para optimizar el espacio horizontal (`after-responsive-768.png`).
