
import { useState } from 'react';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { login } from '../services/api';

interface LoginPageProps {
  onLogin: (token: string) => void;
}

export default function LoginPage({
  onLogin,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await login(email.trim(), password);
      onLogin(token);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No fue posible iniciar sesión.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>AulaFix</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '420px', margin: '50px auto' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Iniciar sesión</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                Ingresa para consultar los reportes de equipos.
              </p>

              <IonItem>
                <IonInput
                  label="Correo electrónico"
                  labelPlacement="stacked"
                  type="email"
                  value={email}
                  onIonInput={(event) =>
                    setEmail(event.detail.value ?? '')
                  }
                />
              </IonItem>

              <IonItem>
                <IonInput
                  label="Contraseña"
                  labelPlacement="stacked"
                  type="password"
                  value={password}
                  onIonInput={(event) =>
                    setPassword(event.detail.value ?? '')
                  }
                />
              </IonItem>

              {error && (
                <IonText color="danger">
                  <p role="alert">{error}</p>
                </IonText>
              )}

              <IonButton
                expand="block"
                onClick={handleLogin}
                disabled={loading}
                style={{ marginTop: '20px' }}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  'Ingresar'
                )}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}
