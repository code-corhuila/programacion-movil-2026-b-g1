
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonSpinner,
  IonText,
} from '@ionic/react';

export default function CameraReport() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function takePhoto() {
    setLoading(true);
    setError('');

    try {
      if (Capacitor.isNativePlatform()) {
        const permissions = await Camera.checkPermissions();

        if (permissions.camera !== 'granted') {
          const requested = await Camera.requestPermissions({
            permissions: ['camera'],
          });

          if (requested.camera !== 'granted') {
            setError(
              'Permiso de cámara denegado. Actívalo en los ajustes.'
            );
            return;
          }
        }
      }

     const image = await Camera.getPhoto({
  quality: 80,
  allowEditing: false,
  resultType: CameraResultType.Uri,
  source: Capacitor.isNativePlatform()
    ? CameraSource.Camera
    : CameraSource.Photos,
});

      if (image.webPath) {
        setPhoto(image.webPath);
      } else {
        setError('No se pudo obtener la fotografía.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '';

      console.error('Error de cámara:', err);

      if (/cancel/i.test(message)) {
        setError('La captura fue cancelada.');
      } else {
        setError(
          'No fue posible acceder a la cámara. Comprueba los permisos.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Fotografía del equipo</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonText color="medium">
          Toma una fotografía para registrar el daño.
        </IonText>

        <IonButton
          expand="block"
          onClick={takePhoto}
          disabled={loading}
          style={{ marginTop: '16px' }}
        >
          {loading ? (
            <IonSpinner name="crescent" />
          ) : (
            'Abrir cámara'
          )}
        </IonButton>

        {photo && (
          <IonImg
            src={photo}
            alt="Fotografía del equipo reportado"
            style={{ marginTop: '16px' }}
          />
        )}

        {error && (
          <IonText color="danger">
            <p role="alert">{error}</p>
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
}
