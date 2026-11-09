import { Preferences } from '@capacitor/preferences';

/**
 * Where the session token lives.
 * Uses @capacitor/preferences (Android SharedPreferences, private to the app;
 * never bundled in the code or sent anywhere except the Authorization header).
 * The token is short-lived (server TTL) and is removed on logout and on any 401.
 */
export interface TokenStorage {
  get(): Promise<string | null>;
  set(token: string): Promise<void>;
  clear(): Promise<void>;
}

const TOKEN_KEY = 'w14.auth.token';

export const preferencesTokenStorage: TokenStorage = {
  async get() {
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    return value && value.length > 0 ? value : null;
  },
  async set(token) {
    await Preferences.set({ key: TOKEN_KEY, value: token });
  },
  async clear() {
    await Preferences.remove({ key: TOKEN_KEY });
  },
};
