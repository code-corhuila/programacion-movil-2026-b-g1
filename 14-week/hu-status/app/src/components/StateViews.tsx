import { IonButton, IonIcon, IonSpinner, IonText } from '@ionic/react';
import { alertCircleOutline, cloudOfflineOutline, refreshOutline } from 'ionicons/icons';

/** Loading state. */
export const LoadingState: React.FC<{ readonly label?: string }> = ({ label = 'Cargando…' }) => (
  <div className="state-view" role="status" aria-live="polite" data-testid="state-loading">
    <IonSpinner name="crescent" />
    <IonText color="medium">
      <p>{label}</p>
    </IonText>
  </div>
);

/** Error state with a recovery action. */
export const ErrorState: React.FC<{
  readonly message: string;
  readonly offline?: boolean;
  readonly onRetry: () => void;
}> = ({ message, offline = false, onRetry }) => (
  <div className="state-view" role="alert" data-testid="state-error">
    <IonIcon
      icon={offline ? cloudOfflineOutline : alertCircleOutline}
      color={offline ? 'medium' : 'danger'}
      className="state-icon"
      aria-hidden="true"
    />
    <IonText color={offline ? 'dark' : 'danger'}>
      <p>{message}</p>
    </IonText>
    <IonButton onClick={onRetry}>
      <IonIcon slot="start" icon={refreshOutline} aria-hidden="true" />
      Reintentar
    </IonButton>
  </div>
);
