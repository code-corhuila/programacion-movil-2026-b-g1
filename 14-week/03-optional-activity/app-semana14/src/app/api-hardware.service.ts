import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ApiHardwareService {

  // 1. Plugin de Cámara + Manejo de Permisos
  async takePicture(): Promise<string | undefined> {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== 'granted') {
      const request = await Camera.requestPermissions();
      if (request.camera !== 'granted') {
        throw new Error('PERMISSION_DENIED: Permiso de cámara denegado');
      }
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    return image.webPath;
  }

  // 2. Consumo de API + Token + 401 + Estado sin red
  async getProtectedData(token: string): Promise<any> {
    if (!navigator.onLine) {
      throw new Error('NETWORK_ERROR: Sin conexión a internet');
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('UNAUTHORIZED: Sesión expirada (401)');
    }

    if (!response.ok) {
      throw new Error(`SERVER_ERROR: Status ${response.status}`);
    }

    return await response.json();
  }
}
