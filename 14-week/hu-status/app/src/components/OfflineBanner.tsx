import { IonIcon, IonText } from '@ionic/react';
import { cloudOfflineOutline } from 'ionicons/icons';

import { useNetworkStatus } from '../hooks/useNetworkStatus';

/** Visible on every screen while the device has no connection. */
const OfflineBanner: React.FC = () => {
  const online = useNetworkStatus();
  if (online !== false) {
    return null;
  }
  return (
    <div className="offline-banner" role="status" aria-live="polite" data-testid="offline-banner">
      <IonIcon icon={cloudOfflineOutline} aria-hidden="true" />
      <IonText>Sin conexión. Mostraremos los datos cuando vuelva la red.</IonText>
    </div>
  );
};

export default OfflineBanner;
