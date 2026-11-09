// Plugin de Capacitor Geolocation con manejo de permisos.
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

export class PermissionError extends Error {}

export async function ensureLocationPermission() {
  if (!Capacitor.isNativePlatform()) return true; // en web el navegador pregunta solo
  let status = await Geolocation.checkPermissions();
  if (status.location === 'granted') return true;
  status = await Geolocation.requestPermissions({ permissions: ['location'] });
  if (status.location !== 'granted') {
    throw new PermissionError('Permiso de ubicación denegado. Actívalo en Ajustes > Aplicaciones > App Hardware > Permisos.');
  }
  return true;
}

export async function getCurrentLocation() {
  await ensureLocationPermission();
  try {
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
    return { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
  } catch (e) {
    if (String(e?.message).toLowerCase().includes('denied')) {
      throw new PermissionError('Permiso de ubicación denegado.');
    }
    throw new Error('No se pudo obtener la ubicación. Verifica que el GPS esté encendido.');
  }
}
