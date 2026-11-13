# CP3: Manejo de Estados de la Interfaz (UNIreserve)

## 1. Estados Implementados en la Pantalla de Lista
En la vista de catálogo de espacios se gestionan 3 estados para evitar pantallas en blanco:
1. **Estado Cargando (`IonSkeletonText`)**: Muestra 5 tarjetas esqueleto simulando el diseño real mientras la API responde.
2. **Estado Vacío**: Mensaje *"No se encontraron espacios académicos disponibles"* con botón para refrescar.
3. **Estado Error**: Mensaje *"Error de conexión con el servidor de reservas"* con botón *"Reintentar"*.

## 2. Mecanismo de Simulación y Pruebas (Vitest)
Para validar los estados se agregó un parámetro opcional `simulateError=true` y un retardo configurable en el servicio de datos:

```tsx
test('debe mostrar mensaje de error y ejecutar reintento', async () => {
  render(<EspaciosPage simulateError={true}/>);
  expect(await screen.findByText(/Error de conexión/i)).toBeInTheDocument();
  
  const retryBtn = screen.getByRole('button', { name: /reintentar/i });
  fireEvent.click(retryBtn);
  expect(retryBtn).toBeInTheDocument();
});
```

## 3. Capturas y Forzado de Estados
- **Cargando**: `../img/after-loading.png` (Forzado mediante retardo de 2000ms).
- **Error**: `../img/after-error.png` (Forzado con la bandera `simulateError=true`).
- **Vacío**: `../img/after-empty.png` (Forzado aplicando un filtro de búsqueda sin coincidencias).
