import { createApiClient } from '../core/apiClient';
import { resolveApiBaseUrl } from '../core/config';
import { capacitorNetworkService } from '../core/networkService';
import { preferencesTokenStorage } from '../core/tokenStorage';
import { createAcademicService } from './academicService';
import { createAuthService } from './authService';
import { createCameraService } from './cameraService';

/** Wiring: the only place where concrete implementations are created. */
export const apiClient = createApiClient({
  baseUrl: resolveApiBaseUrl(),
  tokenStorage: preferencesTokenStorage,
  network: capacitorNetworkService,
});

export const authService = createAuthService(apiClient, preferencesTokenStorage);
export const academicService = createAcademicService(apiClient);
export const cameraService = createCameraService();
export const networkService = capacitorNetworkService;
export const tokenStorage = preferencesTokenStorage;
