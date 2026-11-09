import { describe, it, expect, beforeEach } from 'vitest';
import { login, getProfile, getToken, setToken, clearToken } from '../src/api.js';

const fakeFetch = (status, body) => async () => ({ status, ok: status >= 200 && status < 300, json: async () => body });

describe('API client', () => {
  beforeEach(() => clearToken());

  it('guarda el token después de un login exitoso', async () => {
    await login('demo@corhuila.edu.co', '123456', { fetchFn: fakeFetch(200, { token: 'abc' }), online: () => true });
    expect(getToken()).toBe('abc');
  });

  it('borra el token y lanza "unauthorized" cuando la API responde 401', async () => {
    setToken('expirado');
    await expect(getProfile({ fetchFn: fakeFetch(401, {}), online: () => true }))
      .rejects.toMatchObject({ type: 'unauthorized', status: 401 });
    expect(getToken()).toBeNull();
  });

  it('lanza "offline" cuando no hay red', async () => {
    setToken('abc');
    await expect(getProfile({ fetchFn: fakeFetch(200, {}), online: () => false }))
      .rejects.toMatchObject({ type: 'offline' });
  });
});
