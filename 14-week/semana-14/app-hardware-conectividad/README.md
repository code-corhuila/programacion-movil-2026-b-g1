# Corte 3 — App con hardware y conectividad

App móvil con **Capacitor** que:
1. Usa el plugin **Geolocation (GPS)** con manejo de **permisos** (check → request → mensaje si se deniega).
2. Consume una API con **login por token** y una **petición protegida** (`GET /api/profile` con `Authorization: Bearer <token>`); maneja **401** y **sin red**.
3. Aplica UX: navegación clara (Perfil / Ubicación / Salir), **tres estados** (carga / datos / error) y **pruebas unitarias** (`tests/api.test.js`).

## Estructura
```
src/api.js        cliente HTTP (token, 401, sin red)
src/gps.js        plugin Geolocation + permisos
src/main.js       vistas, navegación y los 3 estados
tests/api.test.js prueba unitaria (Vitest)
mock-api/server.js API de prueba (login + ruta protegida)
```

## Cómo ejecutar
```bash
npm install
npm run api        # en otra terminal: API de prueba en http://localhost:3000
npm run dev        # app en el navegador
npm test           # pruebas unitarias
```
Usuario de prueba: cualquier correo, contraseña `123456`.
Para usar **tu propia API**, copia `.env.example` a `.env` y cambia `VITE_API_URL` (y las rutas `/auth/login` y `/api/profile` en `src/api.js` si son distintas).

### Android
```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```
Agrega en `android/app/src/main/AndroidManifest.xml` (antes de `<application>`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```
En el emulador, la API local se llama con `VITE_API_URL=http://10.0.2.2:3000`.

## Quality & connectivity
The app uses the Capacitor Geolocation plugin and always checks the location permission before reading the GPS. If the permission has not been granted, the app requests it at runtime, and if the user denies it, a clear error message explains how to enable it from the device settings instead of crashing. Authentication is token-based: after a successful login the API returns a token, which is stored locally and sent in the `Authorization: Bearer` header of every protected request. When the API answers with HTTP 401, the client deletes the stored token and redirects the user to the login screen with a message saying that the session expired or the token is invalid. Before each request the app checks whether the device is online, and network failures are converted into an "offline" error, so the user sees a friendly message, a retry button, and a red banner while there is no connection. Every screen follows three explicit UI states (loading, data, and error), so the user always knows what the app is doing. Finally, unit tests written with Vitest verify that the token is saved after login, that a 401 response clears the session, and that the offline case is handled correctly.
