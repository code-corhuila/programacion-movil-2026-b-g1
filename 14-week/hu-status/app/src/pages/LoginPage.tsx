import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonNote,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import OfflineBanner from '../components/OfflineBanner';
import { useAuth } from '../context/AuthContext';
import { UnauthorizedError, toUserMessage } from '../core/errors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Public screen: token login. On success <AuthRedirects> opens /subjects. */
const LoginPage: React.FC = () => {
  const { notice, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim()) || password.length === 0) {
      setError('Escribe un correo válido y tu contraseña.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
    } catch (caught: unknown) {
      setError(
        caught instanceof UnauthorizedError ? 'Correo o contraseña incorrectos.' : toUserMessage(caught),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Academic Connect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <OfflineBanner />
        <div className="login-wrapper">
          <h1>Iniciar sesión</h1>
          <p className="login-subtitle">Accede a tus materias con tu cuenta institucional.</p>

          {notice !== null && (
            <div className="notice" role="status" data-testid="login-notice">
              {notice}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <IonList lines="full">
              <IonInput
                label="Correo"
                labelPlacement="stacked"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="estudiante@corhuila.edu.co"
                value={email}
                onIonInput={(e) => setEmail(String(e.detail.value ?? ''))}
                data-testid="login-email"
              />
              <IonInput
                label="Contraseña"
                labelPlacement="stacked"
                type="password"
                autocomplete="current-password"
                value={password}
                onIonInput={(e) => setPassword(String(e.detail.value ?? ''))}
                data-testid="login-password"
              />
            </IonList>

            {error !== null && (
              <IonText color="danger">
                <p role="alert" data-testid="login-error">
                  {error}
                </p>
              </IonText>
            )}

            <IonButton type="submit" expand="block" className="ion-margin-top" disabled={submitting}>
              {submitting ? <IonSpinner name="dots" /> : 'Ingresar'}
            </IonButton>
          </form>

          <IonNote className="demo-hint">
            Cuenta de prueba: estudiante@corhuila.edu.co · Movil2026*
          </IonNote>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
