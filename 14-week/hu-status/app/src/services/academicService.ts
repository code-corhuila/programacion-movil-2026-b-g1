import type { ApiClient } from '../core/apiClient';
import type { Subject, User } from './types';

/** Protected endpoints (Bearer token required). */
export interface AcademicService {
  getSubjects(options?: { forceRefresh?: boolean }): Promise<Subject[]>;
  getProfile(options?: { forceRefresh?: boolean }): Promise<User>;
}

export function createAcademicService(api: ApiClient): AcademicService {
  return {
    getSubjects: (options = {}) => api.request<Subject[]>('/api/subjects', options),
    getProfile: (options = {}) => api.request<User>('/api/profile', options),
  };
}
