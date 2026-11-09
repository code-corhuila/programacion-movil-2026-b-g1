import { HttpError, NetworkError, OfflineError, UnauthorizedError } from './errors';
import type { NetworkService } from './networkService';
import type { TokenStorage } from './tokenStorage';

export interface RequestOptions {
  readonly method?: 'GET' | 'POST';
  readonly body?: unknown;
  /** Send the Bearer token (default true). Login uses false. */
  readonly auth?: boolean;
  /** Skip the GET cache and force a network call (pull-to-refresh / retry). */
  readonly forceRefresh?: boolean;
}

export interface ApiClientDeps {
  readonly baseUrl: string;
  readonly tokenStorage: TokenStorage;
  readonly network: NetworkService;
  readonly fetchFn?: typeof fetch;
  /** Called once when a protected request answers 401 (session expired / invalid). */
  readonly onUnauthorized?: () => void;
  /** Lifetime of cached GET responses. 0 disables the cache. */
  readonly cacheTtlMs?: number;
  readonly timeoutMs?: number;
  readonly now?: () => number;
}

export interface ApiClient {
  request<T>(path: string, options?: RequestOptions): Promise<T>;
  /** Drops cached responses (logout, 401). */
  clearCache(): void;
  setUnauthorizedHandler(handler: (() => void) | undefined): void;
}

interface CacheEntry {
  readonly value: unknown;
  readonly expiresAt: number;
}

/**
 * Single entry point to the REST API — the "interceptor" of this app:
 * 1. Checks connectivity first: offline -> OfflineError, no request is sent.
 * 2. Adds `Authorization: Bearer <token>` to protected requests.
 * 3. 401 -> clears the token and the cache, notifies the session, throws UnauthorizedError.
 * 4. Network failure / timeout -> NetworkError; other non-2xx -> HttpError.
 * 5. Optimization: GET responses are cached for `cacheTtlMs` and identical
 *    in-flight GETs are shared, so revisiting a screen does not repeat calls.
 */
export function createApiClient(deps: ApiClientDeps): ApiClient {
  const fetchFn = deps.fetchFn ?? ((input, init) => fetch(input, init));
  const cacheTtlMs = deps.cacheTtlMs ?? 60_000;
  const timeoutMs = deps.timeoutMs ?? 10_000;
  const now = deps.now ?? (() => Date.now());
  const cache = new Map<string, CacheEntry>();
  const inFlight = new Map<string, Promise<unknown>>();
  let onUnauthorized = deps.onUnauthorized;

  async function send<T>(path: string, options: RequestOptions): Promise<T> {
    if (!(await deps.network.isOnline())) {
      throw new OfflineError();
    }

    const headers: Record<string, string> = { Accept: 'application/json' };
    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }
    if (options.auth !== false) {
      const token = await deps.tokenStorage.get();
      if (token === null) {
        await expireSession();
        throw new UnauthorizedError('No token');
      }
      headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let response: Response;
    try {
      response = await fetchFn(`${deps.baseUrl}${path}`, {
        method: options.method ?? 'GET',
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: controller.signal,
      });
    } catch {
      // fetch rejects only for network problems (DNS, refused connection, abort/timeout).
      throw new NetworkError();
    } finally {
      clearTimeout(timer);
    }

    if (response.status === 401) {
      if (options.auth !== false) {
        await expireSession();
      }
      throw new UnauthorizedError(await readError(response));
    }
    if (!response.ok) {
      throw new HttpError(response.status, await readError(response));
    }
    return (await response.json()) as T;
  }

  async function expireSession(): Promise<void> {
    cache.clear();
    await deps.tokenStorage.clear();
    onUnauthorized?.();
  }

  return {
    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
      const isGet = (options.method ?? 'GET') === 'GET';
      if (!isGet || cacheTtlMs === 0) {
        return send<T>(path, options);
      }
      const cached = cache.get(path);
      if (!options.forceRefresh && cached !== undefined && cached.expiresAt > now()) {
        return cached.value as T;
      }
      const pending = inFlight.get(path);
      if (pending !== undefined) {
        return pending as Promise<T>;
      }
      const promise = send<T>(path, options)
        .then((value) => {
          cache.set(path, { value, expiresAt: now() + cacheTtlMs });
          return value;
        })
        .finally(() => inFlight.delete(path));
      inFlight.set(path, promise);
      return promise;
    },
    clearCache() {
      cache.clear();
    },
    setUnauthorizedHandler(handler) {
      onUnauthorized = handler;
    },
  };
}

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: unknown };
    return typeof body.error === 'string' ? body.error : `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}
