import { describe, expect, it, vi } from 'vitest';

import { fakeNetwork, fakeTokenStorage, jsonResponse } from '../__tests__/fakes';
import { createApiClient } from './apiClient';
import { HttpError, NetworkError, OfflineError, UnauthorizedError } from './errors';

const BASE = 'http://api.test';

function setup(options: { token?: string | null; online?: boolean; responses?: Response[] } = {}) {
  const tokenStorage = fakeTokenStorage(options.token === undefined ? 'valid-token' : options.token);
  const network = fakeNetwork(options.online ?? true);
  const responses = [...(options.responses ?? [jsonResponse(200, { ok: true })])];
  const fetchFn = vi.fn<typeof fetch>(async () => responses.shift() ?? jsonResponse(200, { ok: true }));
  const onUnauthorized = vi.fn();
  const api = createApiClient({ baseUrl: BASE, tokenStorage, network, fetchFn, onUnauthorized });
  return { api, tokenStorage, network, fetchFn, onUnauthorized };
}

describe('apiClient – token', () => {
  it('sends the stored token as a Bearer Authorization header', async () => {
    const { api, fetchFn } = setup({ token: 'abc123' });
    await api.request('/api/subjects');
    const init = fetchFn.mock.calls[0]?.[1];
    expect(fetchFn).toHaveBeenCalledWith(`${BASE}/api/subjects`, expect.any(Object));
    expect((init?.headers as Record<string, string>).Authorization).toBe('Bearer abc123');
  });

  it('does not send a token on public requests (login)', async () => {
    const { api, fetchFn } = setup();
    await api.request('/api/login', { method: 'POST', body: { email: 'a@b.co' }, auth: false });
    const headers = fetchFn.mock.calls[0]?.[1]?.headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
    expect(headers['Content-Type']).toBe('application/json');
  });
});

describe('apiClient – 401 Unauthorized', () => {
  it('clears the session, notifies the app and throws UnauthorizedError', async () => {
    const { api, tokenStorage, onUnauthorized } = setup({
      responses: [jsonResponse(401, { error: 'Token expired.' })],
    });
    await expect(api.request('/api/profile')).rejects.toBeInstanceOf(UnauthorizedError);
    expect(tokenStorage.clear).toHaveBeenCalledTimes(1);
    expect(tokenStorage.value).toBeNull();
    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });

  it('a 401 on login (wrong password) does not expire any session', async () => {
    const { api, tokenStorage, onUnauthorized } = setup({
      responses: [jsonResponse(401, { error: 'Invalid credentials.' })],
    });
    await expect(
      api.request('/api/login', { method: 'POST', body: {}, auth: false }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
    expect(tokenStorage.clear).not.toHaveBeenCalled();
    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it('a protected request without token is rejected locally as 401 without calling the server', async () => {
    const { api, fetchFn, onUnauthorized } = setup({ token: null });
    await expect(api.request('/api/subjects')).rejects.toBeInstanceOf(UnauthorizedError);
    expect(fetchFn).not.toHaveBeenCalled();
    expect(onUnauthorized).toHaveBeenCalled();
  });
});

describe('apiClient – connectivity', () => {
  it('offline: throws OfflineError and does not send the request', async () => {
    const { api, fetchFn } = setup({ online: false });
    await expect(api.request('/api/subjects')).rejects.toBeInstanceOf(OfflineError);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('server unreachable: fetch rejection becomes NetworkError', async () => {
    const { api, fetchFn } = setup();
    fetchFn.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    await expect(api.request('/api/subjects')).rejects.toBeInstanceOf(NetworkError);
  });

  it('other HTTP errors become HttpError with the status', async () => {
    const { api } = setup({ responses: [jsonResponse(500, { error: 'boom' })] });
    await expect(api.request('/api/subjects')).rejects.toMatchObject({ status: 500 });
    await expect(setup({ responses: [jsonResponse(404, {})] }).api.request('/x')).rejects.toBeInstanceOf(
      HttpError,
    );
  });
});

describe('apiClient – optimization (cache + de-duplication)', () => {
  it('serves repeated GETs from the cache and shares concurrent identical requests', async () => {
    const { api, fetchFn } = setup({ responses: [jsonResponse(200, [1, 2, 3])] });
    const [a, b, c] = await Promise.all([
      api.request('/api/subjects'),
      api.request('/api/subjects'),
      api.request('/api/subjects'),
    ]);
    await api.request('/api/subjects');
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(a).toEqual([1, 2, 3]);
    expect(b).toBe(a);
    expect(c).toBe(a);
  });

  it('forceRefresh bypasses the cache; a 401 empties it', async () => {
    const { api, fetchFn } = setup({
      responses: [jsonResponse(200, ['v1']), jsonResponse(200, ['v2']), jsonResponse(401, {})],
    });
    expect(await api.request('/api/subjects')).toEqual(['v1']);
    expect(await api.request('/api/subjects', { forceRefresh: true })).toEqual(['v2']);
    await expect(api.request('/api/profile')).rejects.toBeInstanceOf(UnauthorizedError);
    await api.request('/api/subjects').catch(() => undefined);
    expect(fetchFn).toHaveBeenCalledTimes(3); // the 4th call fails locally: token was cleared
  });
});
