import { useEffect, useState } from 'react';

import { networkService } from '../services/container';

/** true / false once known; null while the first check runs. */
export function useNetworkStatus(): boolean | null {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    void networkService.isOnline().then((value) => {
      if (active) setOnline(value);
    });
    const unsubscribe = networkService.onChange(setOnline);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return online;
}
