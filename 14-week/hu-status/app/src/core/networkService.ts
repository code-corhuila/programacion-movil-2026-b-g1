import { Network } from '@capacitor/network';

/** Connectivity contract used by the API client and the UI (easy to fake in tests). */
export interface NetworkService {
  isOnline(): Promise<boolean>;
  /** Calls `listener` whenever connectivity changes. Returns an unsubscribe function. */
  onChange(listener: (online: boolean) => void): () => void;
}

export const capacitorNetworkService: NetworkService = {
  async isOnline() {
    const status = await Network.getStatus();
    return status.connected;
  },
  onChange(listener) {
    const handle = Network.addListener('networkStatusChange', (status) => listener(status.connected));
    return () => {
      void handle.then((h) => h.remove());
    };
  },
};
