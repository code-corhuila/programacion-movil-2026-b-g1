import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { CameraPermissionState, PermissionStatus } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

/** Outcome of asking for the camera permission. */
export type CameraPermissionResult =
  | 'granted'
  /** The user tapped "Don't allow" in the system dialog just now. */
  | 'denied'
  /** Denied permanently ("Don't ask again" / blocked): only Settings can change it. */
  | 'blocked';

export type TakePhotoResult =
  | { readonly status: 'photo'; readonly webPath: string }
  | { readonly status: 'denied' | 'blocked' | 'cancelled' | 'error' };

/** The subset of the Capacitor Camera plugin we use (injectable for tests). */
export interface CameraPluginLike {
  checkPermissions(): Promise<PermissionStatus>;
  requestPermissions(options?: { permissions: ('camera' | 'photos')[] }): Promise<PermissionStatus>;
  getPhoto: typeof Camera.getPhoto;
}

export interface CameraService {
  /** Current state without prompting the user. */
  checkPermission(): Promise<CameraPermissionState>;
  /** Check -> request only if needed -> map to granted / denied / blocked. */
  ensurePermission(): Promise<CameraPermissionResult>;
  /** Ensures the permission, then opens the camera. */
  takePhoto(): Promise<TakePhotoResult>;
}

const isGranted = (state: CameraPermissionState): boolean => state === 'granted' || state === 'limited';

export function createCameraService(
  plugin: CameraPluginLike = Camera,
  isNative: () => boolean = () => Capacitor.isNativePlatform(),
): CameraService {
  async function checkPermission(): Promise<CameraPermissionState> {
    if (!isNative()) {
      // In the browser the file picker / getUserMedia asks by itself.
      return 'granted';
    }
    return (await plugin.checkPermissions()).camera;
  }

  async function ensurePermission(): Promise<CameraPermissionResult> {
    const current = await checkPermission();
    if (isGranted(current)) {
      return 'granted';
    }
    if (current === 'denied') {
      // Android reports "denied" only after "Don't ask again": the dialog will not show.
      return 'blocked';
    }
    // 'prompt' or 'prompt-with-rationale': show the system dialog.
    const requested = (await plugin.requestPermissions({ permissions: ['camera'] })).camera;
    return isGranted(requested) ? 'granted' : 'denied';
  }

  return {
    checkPermission,
    ensurePermission,
    async takePhoto() {
      const permission = await ensurePermission();
      if (permission !== 'granted') {
        return { status: permission };
      }
      try {
        const photo = await plugin.getPhoto({
          source: CameraSource.Camera,
          resultType: CameraResultType.Uri,
          quality: 70,
          width: 800,
          correctOrientation: true,
        });
        return photo.webPath ? { status: 'photo', webPath: photo.webPath } : { status: 'error' };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message.toLowerCase() : '';
        return { status: message.includes('cancel') ? 'cancelled' : 'error' };
      }
    },
  };
}

/** Spanish message for each camera scenario. */
export const cameraMessages = {
  granted: 'Permiso de cámara concedido.',
  denied: 'Denegaste el permiso de cámara. Puedes seguir usando la app; toca "Tomar foto" para intentarlo de nuevo.',
  blocked:
    'El permiso de cámara está bloqueado. Actívalo en Ajustes > Aplicaciones > Academic Connect > Permisos > Cámara.',
  cancelled: 'Cancelaste la foto.',
  error: 'No se pudo tomar la foto. Inténtalo de nuevo.',
} as const;
