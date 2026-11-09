import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { apiClient, authService } from '../services/container';

export type AuthStatus = 'checking' | 'authenticated' | 'anonymous';

interface AuthContextValue {
  readonly status: AuthStatus;
  /** Message for the login screen, e.g. "session expired" after a 401. */
  readonly notice: string | null;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const SESSION_EXPIRED_MESSAGE = 'Tu sesión expiró o no es válida. Inicia sesión de nuevo.';
export const LOGGED_OUT_MESSAGE = 'Cerraste sesión correctamente.';

/**
 * Session state (React context + useState, no extra state library).
 * Registers the 401 handler of the API client: on any 401 from a protected
 * request the token is already cleared by the client; here the app switches to
 * "anonymous", which makes the protected routes redirect to /login.
 */
export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    apiClient.setUnauthorizedHandler(() => {
      setStatus('anonymous');
      setNotice(SESSION_EXPIRED_MESSAGE);
    });
    void authService.hasToken().then((has) => setStatus(has ? 'authenticated' : 'anonymous'));
    return () => apiClient.setUnauthorizedHandler(undefined);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await authService.login(email, password);
    setNotice(null);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setNotice(LOGGED_OUT_MESSAGE);
    setStatus('anonymous');
  }, []);

  const value = useMemo(() => ({ status, notice, login, logout }), [status, notice, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs with its provider
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside <AuthProvider>.');
  }
  return context;
}
