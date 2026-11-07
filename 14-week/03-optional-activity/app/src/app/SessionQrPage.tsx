import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation, useParams } from 'react-router-dom';
import { getSessions, type Session } from './session-store';

type Result =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'missing' }
  | { status: 'ready'; session: Session };

export default function SessionQrPage() {
  const { id } = useParams<{ id: string }>();
  const { search } = useLocation();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result>({ status: 'loading' });
  const mode = new URLSearchParams(search).get('estado');

  useEffect(() => {
    setResult({ status: 'loading' });

    const timer = window.setTimeout(() => {
      try {
        if (mode === 'error' && attempt === 0) {
          setResult({ status: 'error' });
          return;
        }

        const session = getSessions().find(item => item.id === id);
        setResult(
          session
            ? { status: 'ready', session }
            : { status: 'missing' },
        );
      } catch {
        setResult({ status: 'error' });
      }
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [id, mode, attempt]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/sesiones" text="Sesiones" />
          </IonButtons>
          <IonTitle>Detalle y QR de la sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <main className="workshop-content">
          {result.status === 'loading' && (
            <section role="status" aria-label="Cargando sesión">
              <h1>Cargando sesión…</h1>
              <IonSkeletonText
                animated
                aria-hidden="true"
                style={{ width: '80%', height: '2rem' }}
              />
              <IonSkeletonText
                animated
                aria-hidden="true"
                style={{ width: '100%', height: '6rem' }}
              />
            </section>
          )}

          {result.status === 'error' && (
            <section role="alert">
              <h1>No pudimos cargar la sesión</h1>
              <p>Intenta consultar nuevamente la información de la clase.</p>
              <IonButton onClick={() => setAttempt(value => value + 1)}>
                Reintentar
              </IonButton>
            </section>
          )}

          {result.status === 'missing' && (
            <section>
              <h1>Sesión no encontrada</h1>
              <p>No existe una sesión guardada con este identificador.</p>
              <IonButton routerLink="/sesiones" routerDirection="back">
                Volver a sesiones
              </IonButton>
            </section>
          )}

          {result.status === 'ready' && (
            <section aria-labelledby="session-heading">
              <h1 id="session-heading">{result.session.course}</h1>
              <dl>
                <dt>Identificador de sesión</dt>
                <dd>{result.session.id}</dd>
                <dt>Fecha</dt>
                <dd>{result.session.date}</dd>
                <dt>Hora de inicio</dt>
                <dd>{result.session.time}</dd>
              </dl>
              <h2>Registro de asistencia mediante QR</h2>
              <p>
                La generación del QR todavía no está conectada al backend.
              </p>
              <p>
                Esta demostración muestra los datos guardados en el navegador.
              </p>
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}