import { Capacitor } from '@capacitor/core';

/**
 * Base URL of the W14 API.
 * - VITE_API_URL (see .env.example) wins, e.g. a real device: http://192.168.1.50:3000
 * - Android emulator: 10.0.2.2 is the host computer's localhost.
 * - Browser (npm run dev): localhost.
 */
export function resolveApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv !== undefined && fromEnv.trim() !== '') {
    return fromEnv.trim().replace(/\/$/, '');
  }
  return Capacitor.getPlatform() === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
}
