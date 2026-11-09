// Cliente HTTP: login por token, petición protegida, manejo de 401 y sin red.
export const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000';
const TOKEN_KEY = 'auth_token';

// Almacenamiento: localStorage en el navegador, memoria en las pruebas
const memory = new Map();
const storage = {
  get: (k) => (globalThis.localStorage ? localStorage.getItem(k) : memory.get(k) ?? null),
  set: (k, v) => (globalThis.localStorage ? localStorage.setItem(k, v) : memory.set(k, v)),
  remove: (k) => (globalThis.localStorage ? localStorage.removeItem(k) : memory.delete(k)),
};

export const getToken = () => storage.get(TOKEN_KEY);
export const setToken = (t) => storage.set(TOKEN_KEY, t);
export const clearToken = () => storage.remove(TOKEN_KEY);

export class ApiError extends Error {
  constructor(type, message, status) {
    super(message);
    this.type = type;     // 'offline' | 'unauthorized' | 'server'
    this.status = status;
  }
}

const isOnline = () => typeof navigator === 'undefined' || navigator.onLine !== false;

export async function request(path, { method = 'GET', body, auth = true, fetchFn = fetch, online = isOnline } = {}) {
  if (!online()) throw new ApiError('offline', 'Sin conexión a internet. Revisa tu red e intenta de nuevo.');

  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (!token) throw new ApiError('unauthorized', 'Debes iniciar sesión.', 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetchFn(API_URL + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch {
    throw new ApiError('offline', 'No se pudo conectar con el servidor.');
  }

  if (res.status === 401) {
    clearToken(); // token inválido o expirado: se elimina y se pide login de nuevo
    throw new ApiError('unauthorized', 'Tu sesión expiró o el token no es válido. Inicia sesión otra vez.', 401);
  }
  if (!res.ok) throw new ApiError('server', `Error del servidor (${res.status}).`, res.status);
  return res.json();
}

export async function login(email, password, opts = {}) {
  const data = await request('/auth/login', { method: 'POST', body: { email, password }, auth: false, ...opts });
  if (!data.token) throw new ApiError('server', 'La API no devolvió un token.');
  setToken(data.token);
  return data;
}

// Petición protegida (requiere Authorization: Bearer <token>)
export const getProfile = (opts) => request('/api/profile', opts);
