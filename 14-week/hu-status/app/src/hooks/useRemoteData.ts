import { useIonViewWillEnter } from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { OfflineError, toUserMessage } from '../core/errors';
import { networkService } from '../services/container';

/** The three UX states of every remote screen. */
export type RemoteState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'data'; readonly data: T }
  | { readonly status: 'error'; readonly message: string; readonly offline: boolean };

export interface RemoteData<T> {
  readonly state: RemoteState<T>;
  /** Forces a network call (button "Reintentar" / pull-to-refresh). */
  readonly reload: () => Promise<void>;
}

/**
 * Loads protected data with Loading / Data / Error states.
 * - Entering the screen reuses the API client cache (no repeated calls).
 * - When the error was "offline", it retries automatically as soon as the
 *   device is back online.
 */
export function useRemoteData<T>(loader: (forceRefresh: boolean) => Promise<T>): RemoteData<T> {
  const [state, setState] = useState<RemoteState<T>>({ status: 'loading' });
  const loaderRef = useRef(loader);
  loaderRef.current = loader;
  const stateRef = useRef(state);
  stateRef.current = state;

  const load = useCallback(async (forceRefresh: boolean) => {
    if (stateRef.current.status !== 'data') {
      setState({ status: 'loading' });
    }
    try {
      const data = await loaderRef.current(forceRefresh);
      setState({ status: 'data', data });
    } catch (error: unknown) {
      setState({ status: 'error', message: toUserMessage(error), offline: error instanceof OfflineError });
    }
  }, []);

  useEffect(() => {
    void load(false);
  }, [load]);

  useIonViewWillEnter(() => {
    void load(false);
  }, [load]);

  // Auto-retry when connectivity comes back after an offline error.
  useEffect(
    () =>
      networkService.onChange((online) => {
        const current = stateRef.current;
        if (online && current.status === 'error' && current.offline) {
          void load(true);
        }
      }),
    [load],
  );

  const reload = useCallback(() => load(true), [load]);
  return { state, reload };
}
