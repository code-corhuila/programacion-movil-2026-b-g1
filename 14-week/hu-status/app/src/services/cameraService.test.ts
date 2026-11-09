import type { PermissionStatus } from '@capacitor/camera';
import { describe, expect, it, vi } from 'vitest';

import { createCameraService } from './cameraService';
import type { CameraPluginLike } from './cameraService';

type State = PermissionStatus['camera'];

function fakeCamera(initial: State, afterRequest: State = initial) {
  const plugin = {
    checkPermissions: vi.fn(async (): Promise<PermissionStatus> => ({ camera: initial, photos: 'granted' })),
    requestPermissions: vi.fn(async (): Promise<PermissionStatus> => ({ camera: afterRequest, photos: 'granted' })),
    getPhoto: vi.fn(async () => ({ webPath: 'blob:photo-1', format: 'jpeg', saved: false })),
  };
  return plugin as typeof plugin & CameraPluginLike;
}

const native = () => true;

describe('cameraService – permissions', () => {
  it('already granted: takes the photo without asking again', async () => {
    const plugin = fakeCamera('granted');
    const result = await createCameraService(plugin, native).takePhoto();
    expect(result).toEqual({ status: 'photo', webPath: 'blob:photo-1' });
    expect(plugin.requestPermissions).not.toHaveBeenCalled();
  });

  it('not asked yet: requests the permission explicitly and continues when the user grants it', async () => {
    const plugin = fakeCamera('prompt', 'granted');
    const result = await createCameraService(plugin, native).takePhoto();
    expect(plugin.requestPermissions).toHaveBeenCalledWith({ permissions: ['camera'] });
    expect(result.status).toBe('photo');
  });

  it('user denies the dialog: returns "denied" and never opens the camera', async () => {
    const plugin = fakeCamera('prompt', 'denied');
    const result = await createCameraService(plugin, native).takePhoto();
    expect(result).toEqual({ status: 'denied' });
    expect(plugin.getPhoto).not.toHaveBeenCalled();
  });

  it('permanently denied: returns "blocked" without showing a dialog that Android would ignore', async () => {
    const plugin = fakeCamera('denied');
    expect(await createCameraService(plugin, native).ensurePermission()).toBe('blocked');
    expect(plugin.requestPermissions).not.toHaveBeenCalled();
  });

  it('user closes the camera: returns "cancelled"', async () => {
    const plugin = fakeCamera('granted');
    plugin.getPhoto.mockRejectedValueOnce(new Error('User cancelled photos app'));
    expect((await createCameraService(plugin, native).takePhoto()).status).toBe('cancelled');
  });
});
