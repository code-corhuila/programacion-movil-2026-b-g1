import type { ApiClient } from '../core/apiClient';
import type { TokenStorage } from '../core/tokenStorage';
import type { LoginResponse, User } from './types';

export interface AuthService {
  /** POST /api/login; stores the token. Throws UnauthorizedError on bad credentials. */
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  hasToken(): Promise<boolean>;
}

export function createAuthService(api: ApiClient, tokens: TokenStorage): AuthService {
  return {
    async login(email, password) {
      const response = await api.request<LoginResponse>('/api/login', {
        method: 'POST',
        body: { email: email.trim(), password },
        auth: false,
      });
      await tokens.set(response.token);
      api.clearCache();
      return response.user;
    },
    async logout() {
      api.clearCache();
      await tokens.clear();
    },
    async hasToken() {
      return (await tokens.get()) !== null;
    },
  };
}
