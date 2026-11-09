import { login, getProfile, getToken, clearToken, ApiError } from './api.js';
import { getCurrentLocation } from './gps.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const banner = document.getElementById('offline-banner');

// ---- Tres estados: carga / datos / error ----
const showLoading = (msg = 'Cargando...') => (app.innerHTML = `<div class="card"><p class="loading">⏳ ${msg}</p></div>`);
const showError = (msg, retry) => {
  app.innerHTML = `<div class="card"><p class="error">⚠️ ${msg}</p>${retry ? '<button id="retry">Reintentar</button>' : ''}</div>`;
  if (retry) document.getElementById('retry').onclick = retry;
};
const showData = (html) => (app.innerHTML = `<div class="card">${html}</div>`);

function handleError(err, retry) {
  if (err instanceof ApiError && err.type === 'unauthorized') {
    alertAndGoLogin(err.message);
    return;
  }
  showError(err.message, retry);
}
function alertAndGoLogin(msg) {
  sessionStorage.setItem('login_msg', msg);
  location.hash = '#/login';
}

// ---- Vistas ----
function loginView() {
  nav.classList.add('hidden');
  const msg = sessionStorage.getItem('login_msg');
  sessionStorage.removeItem('login_msg');
  app.innerHTML = `
    <div class="card">
      <h2>Iniciar sesión</h2>
      ${msg ? `<p class="error">${msg}</p>` : ''}
      <form id="login-form">
        <input name="email" type="email" placeholder="Correo" required value="demo@corhuila.edu.co" />
        <input name="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      <p id="login-status"></p>
    </div>`;
  document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const status = document.getElementById('login-status');
    status.className = 'loading';
    status.textContent = '⏳ Validando...';
    try {
      await login(f.get('email'), f.get('password'));
      location.hash = '#/home';
    } catch (err) {
      status.className = 'error';
      status.textContent = err.type === 'unauthorized' ? 'Correo o contraseña incorrectos.' : err.message;
    }
  };
}

async function homeView() {
  showLoading('Cargando perfil...');
  try {
    const p = await getProfile();
    showData(`<h2>Hola, ${p.name}</h2><p>Correo: ${p.email}</p><p>Rol: ${p.role}</p>
      <p><small>Datos obtenidos con petición protegida (Bearer token).</small></p>`);
  } catch (err) {
    handleError(err, homeView);
  }
}

async function gpsView() {
  showData(`<h2>Mi ubicación</h2><p>Usa el GPS del dispositivo (pide permiso).</p><button id="get-loc">Obtener ubicación</button>`);
  document.getElementById('get-loc').onclick = async function load() {
    showLoading('Obteniendo ubicación...');
    try {
      const { lat, lng, accuracy } = await getCurrentLocation();
      showData(`<h2>Mi ubicación</h2><p>Latitud: ${lat.toFixed(6)}</p><p>Longitud: ${lng.toFixed(6)}</p>
        <p>Precisión: ±${Math.round(accuracy)} m</p>
        <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank">Ver en mapa</a>
        <button id="get-loc">Actualizar</button>`);
      document.getElementById('get-loc').onclick = load;
    } catch (err) {
      showError(err.message, load);
    }
  };
}

// ---- Navegación (hash router con ruta protegida) ----
const routes = { '#/login': loginView, '#/home': homeView, '#/gps': gpsView };
function router() {
  const hash = location.hash || '#/home';
  if (hash !== '#/login' && !getToken()) return (location.hash = '#/login');
  if (hash !== '#/login') nav.classList.remove('hidden');
  (routes[hash] || homeView)();
}

document.getElementById('logout').onclick = () => { clearToken(); location.hash = '#/login'; };
const updateBanner = () => banner.classList.toggle('hidden', navigator.onLine);
window.addEventListener('online', updateBanner);
window.addEventListener('offline', updateBanner);
window.addEventListener('hashchange', router);
updateBanner();
router();
