# Week 13 Optional Activity — Login, JWT, and Protected Requests

| Field | Details |
| --- | --- |
| Student | Juan Jose Guzman Bohorquez |
| Course | Mobile Programming — CORHUILA |
| Project | Attendance Control |
| Technologies | Ionic React, TypeScript, Express, JSON Web Token |
| Test environment | Local Ionic app and Express demo API |

## 1. Objective and scope

This activity demonstrates how Attendance Control signs in a user, keeps a
session token, and uses it to access a protected profile. It also covers
two failures that require different responses: an invalid session and an
unreachable API.

The exercise uses the Express server in the course workshop, with a demo
professor account. The Spring Boot API in `att-check-api` is outside the
scope of this exercise.

## 2. Authentication flow

1. From **Sesiones de clase**, open **Mi cuenta** and enter the demo
   professor's email and password.
2. The client sends the credentials to `POST /api/auth/login`. Express
   validates them and returns a signed JWT.
3. The API service keeps the JWT in memory and sends it to
   `GET /api/users/me` in the `Authorization` header.
4. Express verifies the signature and expiration before returning the
   professor's profile. The Ionic screen then displays the name, email,
   and role under **Mi perfil**.

### API endpoints

| Method and path | Request | Successful response | Unauthorized response |
| --- | --- | --- | --- |
| `POST /api/auth/login` | JSON with `email` and `password` | `200 OK` with a signed JWT in `token` | `401 Unauthorized` for incorrect credentials |
| `GET /api/users/me` | `Authorization: Bearer <token>` | `200 OK` with the professor's profile | `401 Unauthorized` for a missing, invalid, or expired token |

## 3. Token storage and session behavior

The client keeps the JWT in memory for the current session. Reloading the
page or selecting **Cerrar sesión** removes it. A `401` from the protected
profile endpoint also clears the session and returns the user to the login
form.

Tokens expire after 15 minutes. The demo server generates a new signing key
each time it starts. Restarting Express therefore provides a repeatable way
to test an invalid token immediately.

## 4. Centralized API service

| File | Responsibility |
| --- | --- |
| [`src/app/api.ts`](../../11-week/workshop/app/src/app/api.ts) | Configures the base URL, sends HTTP requests, manages the in-memory token, adds the authorization header, and classifies errors. |
| [`src/app/AuthPage.tsx`](../../11-week/workshop/app/src/app/AuthPage.tsx) | Displays the login form, profile, error messages, and actions to retry or sign out. |
| [`server/auth.js`](../../11-week/workshop/app/server/auth.js) | Validates the demo credentials, issues the JWT, and verifies it before serving the profile. |
| [`server/app.js`](../../11-week/workshop/app/server/app.js) | Registers the authentication routes in the Express app. |

The Ionic screen calls `login()` and `getProfile()` through the service.
The service builds the requests and handles the HTTP responses in one place.

## 5. Error handling

| Scenario | User-facing behavior | Session behavior |
| --- | --- | --- |
| The login endpoint returns `401`. | The form shows **Correo o contraseña incorrectos.** | No new session is created. |
| The profile endpoint returns `401`. | The app returns to the login form and explains that the session expired or is invalid. | The token and displayed profile are cleared. |
| The API cannot be reached. | The app shows **No se pudo conectar con el servidor. Revisa la conexión e inténtalo de nuevo.** The user can try again. | An existing token stays in memory. |

A `401` is a response from the server. A connection failure occurs when the
client cannot obtain an HTTP response. The app keeps the session during a
connection failure so the user can retry.

## 6. Run locally

From the root of the course repository, start the demo API:

```bash
cd 11-week/workshop/app
npm install
npm run server
```

Open a second terminal in `11-week/workshop/app` and start Ionic:

```bash
npm run dev -- --port 5173 --strictPort
```

Open `http://localhost:5173` and select **Mi cuenta**. The default API URL
is `http://localhost:3000`. The `VITE_API_URL` environment variable can
override it.

| Demo credential | Value |
| --- | --- |
| Email | `profesor@example.test` |
| Password | `Semana13Demo!` |

## 7. Verification and evidence

| Case | How to reproduce | Expected result | Result |
| --- | --- | --- | --- |
| Login and protected profile | Sign in with the demo credentials. | **Mi perfil** shows the professor's name, email, and role. The profile request returns `200`. | Pending |
| Incorrect credentials | Sign out and try an incorrect password. | The login request returns `401` and the form displays the credentials message. | Pending |
| API unreachable | Sign in, stop Express with `Ctrl + C`, and select **Actualizar perfil**. Keep Ionic running and leave the page open. | The connection message appears and the profile screen stays open. | Pending |
| Invalid token | After the previous case, restart Express and select **Actualizar perfil** without reloading the page. | The profile request returns `401`. The app clears the session and shows the login form with the session message. | Pending |

