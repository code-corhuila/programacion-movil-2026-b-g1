import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fakeNetwork } from '../__tests__/fakes';
import { OfflineError, UnauthorizedError } from '../core/errors';

const network = fakeNetwork(true);

vi.mock('@ionic/react', () => ({ useIonViewWillEnter: vi.fn() }));
vi.mock('../services/container', () => ({ networkService: network }));

const { useRemoteData } = await import('./useRemoteData');

describe('useRemoteData – Loading / Data / Error states', () => {
  beforeEach(() => network.setOnline(true));

  it('starts in loading and ends in data', async () => {
    const loader = vi.fn(async () => ['Programación Móvil']);
    const { result } = renderHook(() => useRemoteData(loader));
    expect(result.current.state.status).toBe('loading');
    await waitFor(() => expect(result.current.state).toEqual({ status: 'data', data: ['Programación Móvil'] }));
  });

  it('shows a clear error and recovers with "Reintentar" (reload)', async () => {
    const loader = vi
      .fn<(force: boolean) => Promise<string[]>>()
      .mockRejectedValueOnce(new UnauthorizedError())
      .mockResolvedValueOnce(['ok']);
    const { result } = renderHook(() => useRemoteData(loader));
    await waitFor(() => expect(result.current.state.status).toBe('error'));
    expect(result.current.state).toMatchObject({ offline: false, message: expect.stringMatching(/sesión/) });
    await act(() => result.current.reload());
    expect(result.current.state).toEqual({ status: 'data', data: ['ok'] });
    expect(loader).toHaveBeenLastCalledWith(true);
  });

  it('offline error: retries automatically when the connection comes back', async () => {
    const loader = vi
      .fn<(force: boolean) => Promise<string[]>>()
      .mockRejectedValueOnce(new OfflineError())
      .mockResolvedValueOnce(['back online']);
    network.setOnline(false);
    const { result } = renderHook(() => useRemoteData(loader));
    await waitFor(() => expect(result.current.state).toMatchObject({ status: 'error', offline: true }));
    act(() => network.setOnline(true));
    await waitFor(() => expect(result.current.state).toEqual({ status: 'data', data: ['back online'] }));
    expect(loader).toHaveBeenCalledTimes(2);
  });
});
