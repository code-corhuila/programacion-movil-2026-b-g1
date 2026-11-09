import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { cameraOutline, logOutOutline, personCircleOutline, warningOutline } from 'ionicons/icons';
import { useCallback, useState } from 'react';
import type { CameraPermissionState } from '@capacitor/camera';

import OfflineBanner from '../components/OfflineBanner';
import { ErrorState, LoadingState } from '../components/StateViews';
import { useAuth } from '../context/AuthContext';
import { useRemoteData } from '../hooks/useRemoteData';
import { cameraMessages } from '../services/cameraService';
import { academicService, cameraService, tokenStorage } from '../services/container';

const permissionLabels: Record<CameraPermissionState, string> = {
  granted: 'Concedido',
  limited: 'Concedido (limitado)',
  denied: 'Bloqueado',
  prompt: 'Sin solicitar',
  'prompt-with-rationale': 'Denegado (se puede volver a pedir)',
};

/** Protected view: GET /api/profile + camera (hardware) + logout. */
const ProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const loader = useCallback((forceRefresh: boolean) => academicService.getProfile({ forceRefresh }), []);
  const { state, reload } = useRemoteData(loader);
  const [photo, setPhoto] = useState<string | null>(null);
  const [permission, setPermission] = useState<CameraPermissionState | null>(null);
  const [cameraMessage, setCameraMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  const refreshPermission = useCallback(async () => {
    try {
      setPermission(await cameraService.checkPermission());
    } catch {
      setPermission(null);
    }
  }, []);

  useIonViewWillEnter(() => {
    void refreshPermission();
  }, [refreshPermission]);

  const handleTakePhoto = async () => {
    setBusy(true);
    setCameraMessage(null);
    const result = await cameraService.takePhoto();
    if (result.status === 'photo') {
      setPhoto(result.webPath);
      setCameraMessage({ text: 'Foto actualizada.', ok: true });
    } else {
      setCameraMessage({ text: cameraMessages[result.status], ok: false });
    }
    await refreshPermission();
    setBusy(false);
  };

  /** Test tool: replaces the stored token with an invalid one, so the next protected call gets 401. */
  const simulateExpiredToken = async () => {
    await tokenStorage.set('invalid.token.for-401-test');
    await reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <OfflineBanner />

        <IonCard>
          <IonCardContent className="avatar-block">
            <IonAvatar className="profile-avatar">
              {photo === null ? (
                <IonIcon icon={personCircleOutline} className="avatar-placeholder" aria-hidden="true" />
              ) : (
                <img src={photo} alt="Foto de perfil tomada con la cámara" />
              )}
            </IonAvatar>
            <IonChip outline data-testid="camera-permission">
              <IonLabel>Permiso de cámara: {permission === null ? '—' : permissionLabels[permission]}</IonLabel>
            </IonChip>
            <IonButton onClick={() => void handleTakePhoto()} disabled={busy}>
              <IonIcon slot="start" icon={cameraOutline} aria-hidden="true" />
              Tomar foto
            </IonButton>
            {cameraMessage !== null && (
              <IonText color={cameraMessage.ok ? 'success' : 'warning'}>
                <p role="status" data-testid="camera-message">
                  {cameraMessage.text}
                </p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>

        {state.status === 'loading' && <LoadingState label="Cargando tu perfil…" />}
        {state.status === 'error' && (
          <ErrorState message={state.message} offline={state.offline} onRetry={() => void reload()} />
        )}
        {state.status === 'data' && (
          <IonCard data-testid="profile-card">
            <IonCardHeader>
              <IonCardSubtitle>{state.data.program}</IonCardSubtitle>
              <IonCardTitle>{state.data.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{state.data.email}</IonCardContent>
          </IonCard>
        )}

        <IonButton expand="block" color="medium" fill="outline" onClick={() => void logout()}>
          <IonIcon slot="start" icon={logOutOutline} aria-hidden="true" />
          Cerrar sesión
        </IonButton>

        <IonCard className="ion-margin-top">
          <IonCardHeader>
            <IonCardSubtitle>Herramientas de prueba</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Reemplaza el token guardado por uno inválido para comprobar el manejo del error 401.</p>
            <IonButton size="small" color="warning" onClick={() => void simulateExpiredToken()}>
              <IonIcon slot="start" icon={warningOutline} aria-hidden="true" />
              Simular token vencido (401)
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
