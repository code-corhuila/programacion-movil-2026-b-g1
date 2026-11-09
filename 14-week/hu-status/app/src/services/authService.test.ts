import { describe, expect, it, vi } from 'vitest';

import { fakeNetwork, fakeTokenStorage, jsonResponse } from '../__tests__/fakes';
import { createApiClient } from '../core/apiClient';
import { UnauthorizedError } from '../core/errors';
import { createAuthService } from './authService';

const user = { id: 1, name: 'Estudiante', email: 'estudiante@corhuila.edu.co', program: 'Sistemas' };

function setup(response: Response) {
  const tokens = fakeTokenStorage(null);
  const fetchFn = vi.fn<typeof fetch>(async () => response);
  const api = createApiClient({ baseUrl: 'http://api.test', tokenStorage: tokens, network: fakeNetwork(), fetchFn });
  return { auth: createAuthService(api, tokens), tokens, fetchFn };
}

describe('authService', () => {
  it('login posts the credentials and stores the returned token', async () => {
    const { auth, tokens, fetchFn } = setup(jsonResponse(200, { token: 'jwt-123', expiresIn: 300, user }));
    await expect(auth.login(' estudiante@corhuila.edu.co ', 'Movil2026*')).resolves.toEqual(user);
    expect(tokens.value).toBe('jwt-123');
    expect(JSON.parse(String(fetchFn.mock.calls[0]?.[1]?.body))).toEqual({
      email: 'estudiante@corhuila.edu.co',
      password: 'Movil2026*',
    });
    expect(await auth.hasToken()).toBe(true);
  });

  it('wrong credentials: throws UnauthorizedError and stores nothing', async () => {
    const { auth, tokens } = setup(jsonResponse(401, { error: 'Invalid credentials.' }));
    await expect(auth.login('estudiante@corhuila.edu.co', 'bad')).rejects.toBeInstanceOf(UnauthorizedError);
    expect(tokens.value).toBeNull();
  });

  it('logout removes the token', async () => {
    const { auth, tokens } = setup(jsonResponse(200, { token: 'jwt-123', expiresIn: 300, user }));
    await auth.login('estudiante@corhuila.edu.co', 'Movil2026*');
    await auth.logout();
    expect(tokens.value).toBeNull();
    expect(await auth.hasToken()).toBe(false);
  });
});
