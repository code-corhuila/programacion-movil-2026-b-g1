
import { Network } from '@capacitor/network';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Report {
  id: number;
  equipo: string;
  descripcion: string;
  estado: string;
}


export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}


async function request(
  endpoint: string,
  options: RequestInit = {}
) {
  const network = await Network.getStatus();

  if (!network.connected || !navigator.onLine) {
    throw new ApiError(
      'Sin conexión a internet. Comprueba tu red.',
      0
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError(
      'No fue posible conectar con el servidor.',
      0
    );
  }

  if (response.status === 401) {
    throw new ApiError(
      'Tu sesión no es válida o ha expirado.',
      401
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `Error del servidor: ${response.status}`,
      response.status
    );
  }

  return response.json();
}

export async function login(
  email: string,
  password: string
): Promise<string> {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (typeof data.token !== 'string' || !data.token) {
    throw new ApiError('El servidor no devolvió un token válido.', 500);
  }

  return data.token;
}

export async function getReports(
  token: string
): Promise<Report[]> {
  return request('/api/reports', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
