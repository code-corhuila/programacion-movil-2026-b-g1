import { vi } from 'vitest';

import type { NetworkService } from '../core/networkService';
import type { TokenStorage } from '../core/tokenStorage';

/** In-memory token storage. */
export function fakeTokenStorage(initial: string | null = null): TokenStorage & { value: string | null } {
  const storage = {
    value: initial,
    get: vi.fn(async () => storage.value),
    set: vi.fn(async (token: string) => {
      storage.value = token;
    }),
    clear: vi.fn(async () => {
      storage.value = null;
    }),
  };
  return storage;
}

/** Controllable connectivity. */
export function fakeNetwork(online = true): NetworkService & { setOnline(value: boolean): void } {
  let current = online;
  const listeners = new Set<(online: boolean) => void>();
  return {
    isOnline: vi.fn(async () => current),
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setOnline(value) {
      current = value;
      listeners.forEach((listener) => listener(value));
    },
  };
}

export function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
