# AulaFix — Reporte de daños en equipos institucionales

**Programación Móvil — Corte 3 — Semana 14**

## 1. Información del proyecto

| Campo | Información |
|---|---|
| Proyecto | AulaFix |
| Actividad | App con hardware y conectividad |
| Estudiante | Rosfeller David Castillo Garzón |
| Usuario GitHub | feller2006 |
| Tipo de entrega | Individual |
| Tecnologías principales | Ionic React, TypeScript, Capacitor, Express y JWT |
| Repositorio | https://github.com/feller2006/programacion-movil-2026-b-g1 |
| Ubicación | `14-week/04-Activity/aulafix` |

## 2. Descripción

AulaFix es una aplicación móvil desarrollada para facilitar la identificación y consulta de daños en equipos y espacios de una institución educativa.

El proyecto permite iniciar sesión mediante autenticación JWT, consultar reportes protegidos y seleccionar o capturar fotografías de equipos mediante Capacitor Camera.

La aplicación incorpora manejo de permisos, comprobación de conectividad, control de errores HTTP y estados visuales que facilitan la interacción con el usuario.

La solución cuenta con una aplicación frontend desarrollada en Ionic React y un backend independiente construido con Node.js y Express.

## 3. Objetivo general

Desarrollar una aplicación móvil que integre funcionalidades de hardware y conectividad, utilizando Capacitor y una API REST protegida mediante tokens JWT.

### Objetivos específicos

- Integrar Capacitor Camera para capturar o seleccionar fotografías.
- Gestionar los permisos de cámara en dispositivos móviles.
- Implementar autenticación mediante JSON Web Tokens.
- Consumir endpoints protegidos utilizando el encabezado Authorization.
- Gestionar errores HTTP 401 y fallos de comunicación con el servidor.
- Presentar estados de carga, datos, vacío y error.
- Incorporar pruebas unitarias para verificar funciones de la aplicación.
- Documentar la instalación, ejecución y validación del proyecto.

## 4. Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| React | Construcción de componentes |
| TypeScript | Desarrollo tipado del frontend |
| Ionic React | Interfaz adaptada a dispositivos móviles |
| Vite | Servidor de desarrollo y compilación |
| Capacitor | Integración con funcionalidades nativas |
| Capacitor Camera | Captura y selección de fotografías |
| Capacitor Network | Comprobación de conectividad |
| Capacitor Preferences | Dependencia instalada para almacenamiento local |
| Node.js | Ejecución del backend |
| Express | Implementación de la API REST |
| JSON Web Token | Autenticación mediante tokens |
| bcryptjs | Protección de contraseñas mediante hashing |
| Vitest | Ejecución de pruebas unitarias |

## 5. Funcionalidades implementadas

### 5.1. Autenticación

El usuario puede iniciar sesión proporcionando un correo electrónico y una contraseña.

El backend valida las credenciales y genera un token JWT con una duración de una hora.

El frontend utiliza el token para consultar los reportes protegidos.

La sesión se mantiene en memoria mientras la aplicación permanece abierta.

### 5.2. Consulta de reportes

Los usuarios autenticados pueden consultar los reportes registrados en el backend.

Cada reporte contiene:

- Identificador.
- Nombre del equipo.
- Descripción del problema.
- Estado del reporte.

La versión inicial presenta reportes de ejemplo almacenados en memoria en el servidor.

### 5.3. Integración de cámara

AulaFix utiliza Capacitor Camera para integrar funciones relacionadas con fotografías.

En Android, la implementación solicita y verifica los permisos de cámara antes de intentar la captura.

En navegadores web, permite seleccionar fotografías mediante el selector de imágenes.

La fotografía seleccionada se muestra como vista previa dentro de la aplicación.

**Limitación actual:** la interfaz permite visualizar fotografías, pero todavía no envía ni guarda un nuevo reporte en el backend.

### 5.4. Manejo de conectividad

La aplicación utiliza Capacitor Network para comprobar el estado de conexión antes de realizar peticiones HTTP.

También controla los errores producidos cuando el servidor no está disponible.

Ante un fallo, se muestra un mensaje y se ofrece una acción para reintentar la petición.

### 5.5. Manejo de errores HTTP

Cuando la API devuelve HTTP 401 en una petición protegida, la aplicación invalida la sesión y regresa a la pantalla de inicio de sesión.

Las credenciales incorrectas también producen una respuesta HTTP 401 durante el login.

Los errores del servidor y de conexión se comunican mediante mensajes visibles para el usuario.

### 5.6. Experiencia de usuario

AulaFix presenta los siguientes estados:

| Estado | Comportamiento |
|---|---|
| Loading | Indicador de carga durante las operaciones |
| Data | Visualización de los reportes recuperados |
| Empty | Mensaje cuando no existen reportes |
| Error | Mensaje descriptivo y opción de reintento |

Además, incorpora navegación entre la vista de reportes y la sección de fotografías, así como un botón para cerrar sesión.

## 6. Estructura del proyecto

```text
aulafix/
├── android/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── components/
│   │   └── CameraReport.tsx
│   ├── pages/
│   │   └── LoginPage.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── reportUtils.ts
│   │   └── reportUtils.test.ts
│   ├── App.tsx
│   └── main.tsx
├── capacitor.config.ts
├── package.json
├── package-lock.json
└── README.md
```

Las carpetas `node_modules` y `dist` se generan mediante la instalación y compilación y no son necesarias para consultar el código fuente.

## 7. Requisitos de instalación

Para ejecutar el proyecto se requiere:

- Node.js y npm.
- Git.
- Visual Studio Code o un editor compatible.
- Navegador moderno.
- Android Studio y Android SDK para ejecutar la versión Android.

## 8. Instalación del frontend

Clonar el repositorio:

```bash
git clone https://github.com/feller2006/programacion-movil-2026-b-g1.git
```

Entrar a la aplicación:

```bash
cd programacion-movil-2026-b-g1/14-week/04-Activity/aulafix
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

http://localhost:5173/

## 9. Instalación del backend

Desde la carpeta principal de AulaFix:

```bash
cd backend
npm install
```

Crear un archivo `.env` dentro de `backend` con estas variables:

```env
PORT=3000
JWT_SECRET=replace-with-a-secure-random-secret
```

La clave JWT debe contener al menos 32 caracteres y debe generarse de manera segura.

El archivo `.env` no debe publicarse en GitHub.

Ejecutar el backend:

```bash
node index.js
```

El servidor estará disponible en:

http://localhost:3000

Para comprobar su funcionamiento:

```text
GET http://localhost:3000/api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "app": "AulaFix API"
}
```

## 10. Endpoints de la API REST

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | `/api/health` | Estado del servidor | No |
| POST | `/api/auth/register` | Registro de usuarios | No |
| POST | `/api/auth/login` | Generación del token JWT | No |
| GET | `/api/reports` | Consulta de reportes | Sí |

### Registro

```http
POST /api/auth/register
Content-Type: application/json
```

Ejemplo:

```json
{
  "email": "david@aulafix.test",
  "password": "AulaFix2026!"
}
```

### Inicio de sesión

```http
POST /api/auth/login
Content-Type: application/json
```

El servidor devuelve un token JWT cuando las credenciales son válidas.

### Consulta protegida

```http
GET /api/reports
Authorization: Bearer YOUR_JWT_TOKEN
```

Si el token no existe, es incorrecto o ha expirado, el servidor responde con HTTP 401.

## 11. Ejecución en Android

Compilar el frontend:

```bash
npm run build
```

Sincronizar la aplicación:

```bash
npx cap sync android
```

Abrir el proyecto Android:

```bash
npx cap open android
```

Desde Android Studio se puede seleccionar un emulador o dispositivo físico compatible.

**Importante:** para acceder al backend desde Android, se debe configurar `VITE_API_URL` con una dirección accesible desde el dispositivo y volver a compilar y sincronizar la aplicación. `localhost` dentro de Android no representa necesariamente el servidor que está ejecutándose en el computador.

La verificación final de captura y permisos nativos debe realizarse en Android.

## 12. Pruebas unitarias

Se utiliza Vitest para comprobar la validación de reportes.

Archivo:

`src/services/reportUtils.test.ts`

Las pruebas verifican que:

1. Un reporte con información válida sea aceptado.
2. Un reporte sin nombre de equipo sea rechazado.

Ejecutar:

```bash
npx vitest run
```

Resultado obtenido durante el desarrollo:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
```

Para comprobar la compilación:

```bash
npm run build
```

## 13. Pruebas funcionales

| Prueba | Resultado |
|---|---|
| Inicio de sesión con credenciales válidas | Comprobado |
| Generación de JWT | Comprobado |
| Consulta protegida con token válido | Comprobado |
| Respuesta HTTP 401 con token inválido | Comprobado en API |
| Visualización de reportes | Comprobado |
| Selección de fotografía en navegador | Comprobado |
| Vista previa de fotografía | Comprobado |
| Manejo de servidor inaccesible | Comprobado |
| Reintento de consulta | Implementado |
| Pruebas unitarias | 2 aprobadas |
| Permisos de cámara en Android | Pendiente de verificación |
| Comportamiento sin internet real | Pendiente de verificación |

## 14. Quality & connectivity

AulaFix is a mobile application developed with Ionic React, TypeScript, and Capacitor. The application integrates the Capacitor Camera plugin to access the device camera and manage camera permissions on native platforms. On the web, users can select an existing photograph through the browser's file picker. Authentication is handled by an Express backend that validates user credentials and generates JSON Web Tokens (JWT). Each protected API request includes the authentication token in the Authorization header using the Bearer scheme. When a protected endpoint returns HTTP 401, the application invalidates the current session and redirects the user to the login screen. The Capacitor Network plugin checks connectivity before HTTP requests, and network failures are handled with informative error messages. The interface provides loading, data, empty, and error states to improve user experience. A retry button allows the user to request the reports again after a connection failure. Unit tests implemented with Vitest verify that equipment reports contain valid information. Native camera permissions and real offline behavior must also be verified on an Android device before final acceptance.

## 15. Limitaciones conocidas

Esta versión corresponde a un prototipo académico.

- Los usuarios se almacenan temporalmente en memoria y se pierden cuando el backend se reinicia.
- Los reportes actuales son datos de ejemplo.
- La función de fotografía todavía no crea nuevos registros en la API.
- El token se conserva únicamente en memoria durante la sesión actual.
- La comprobación de cámara y permisos en Android sigue pendiente.
- La URL del backend debe adaptarse para dispositivos Android físicos o emulados.
- La configuración CORS del servidor es adecuada para pruebas locales, pero debe restringirse antes de un despliegue público.

## 16. Seguridad

Las contraseñas se procesan mediante bcryptjs antes de almacenarse en memoria.

El backend genera tokens JWT firmados con una clave secreta configurada mediante variables de entorno.

Los endpoints protegidos validan la firma y expiración del token.

El archivo `.env` y las carpetas `node_modules` deben excluirse del control de versiones.

Para un entorno de producción se requieren HTTPS, persistencia segura, controles de acceso y configuración más restrictiva del servidor.

## 17. Conclusión

AulaFix integra una interfaz móvil desarrollada con Ionic React, funcionalidades de hardware mediante Capacitor y comunicación con una API REST protegida por JWT.

Durante el desarrollo se comprobaron el inicio de sesión, el acceso a reportes protegidos, el manejo de errores HTTP 401, la visualización de fotografías en el navegador y la respuesta ante un servidor inaccesible.

También se incorporaron pruebas unitarias utilizando Vitest.

El proyecto demuestra la integración de autenticación, hardware, conectividad y experiencia de usuario, con verificaciones nativas pendientes antes de su entrega definitiva.

## 18. Autor

**Rosfeller David Castillo Garzón**

Programación Móvil — Corte 3

GitHub: [@feller2006](https://github.com/feller2006)

Repositorio: https://github.com/feller2006/programacion-movil-2026-b-g1