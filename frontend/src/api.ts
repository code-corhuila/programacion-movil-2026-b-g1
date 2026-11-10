import type { IceCream } from './types';

const API_URL = 'http://localhost:3000/ice-creams';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function getIceCreams(): Promise<IceCream[]> {
  return request<IceCream[]>(API_URL);
}

export async function createIceCream(data: Omit<IceCream, 'id'>): Promise<IceCream> {
  return request<IceCream>(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
