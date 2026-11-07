
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonBackButton,
  IonSpinner,
} from '@ionic/react';

export default function CameraPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isNative = Capacitor.isNativePlatform();

  async function takePhoto() {
    setLoading(true);
    setError('');
    setPhoto(null);

    try {
      // Native Android/iOS permissions are handled by Capacitor.
      // On web, the browser manages camera permissions.
      if (isNative) {
        const permissions = await Camera.checkPermissions();

        if (permissions.camera !== 'granted') {
          const requested = await Camera.requestPermissions({
            permissions: ['camera'],
          });

          if (requested.camera !== 'granted') {
            setError(
              'Permiso de cámara denegado. Actívalo desde los ajustes del dispositivo.'
            );
            return;
          }
        }
      }

      const result = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (result.webPath) {
        setPhoto(result.webPath);
      } else {
        setError('No se pudo obtener la fotografía.');
      }
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : String(cause);

      console.error('Camera error:', cause);

      if (/cancel/i.test(message)) {
        setError('Se canceló la captura de la fotografía.');
      } else if (
        /permission|denied|notallowed/i.test(message)
      ) {
        setError(
          `No se concedió acceso a la cámara: ${message}`
        );
      } else {
        setError(`Error de cámara: ${message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/sesiones"
              text="Volver"
            />
          </IonButtons>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Probar cámara</h1>

        <p>
          Utiliza la cámara del dispositivo para capturar
          una fotografía.
        </p>

        <p>
          <strong>Plataforma:</strong>{' '}
          {isNative
            ? 'Aplicación nativa'
            : 'Navegador web'}
        </p>

        <IonButton
          expand="block"
          onClick={takePhoto}
          disabled={loading}
        >
          {loading
            ? 'Abriendo cámara...'
            : 'Tomar foto'}
        </IonButton>

        {loading && (
          <div role="status">
            <IonSpinner name="crescent" />
            <p>Esperando respuesta de la cámara...</p>
          </div>
        )}

        {error && (
          <p
            role="alert"
            style={{
              color: 'var(--ion-color-danger)',
            }}
          >
            {error}
          </p>
        )}

        {photo && (
          <section>
            <h2>Fotografía capturada</h2>

            <img
              src={photo}
              alt="Fotografía tomada con la cámara"
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '12px',
              }}
            />

            <IonButton
              expand="block"
              fill="outline"
              onClick={takePhoto}
              disabled={loading}
            >
              Tomar otra foto
            </IonButton>
          </section>
        )}
      </IonContent>
    </IonPage>
  );
}
