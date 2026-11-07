
import { memo, useEffect, useMemo, useState } from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
} from '@ionic/react';

export type Session = {
  id: string;
  course: string;
  date: string;
  time: string;
};

type Props = {
  sessions: Session[];
  refreshVersion?: number;
  onSettled?: () => void;
};

type LoadStatus = 'loading' | 'error' | 'ready';

export function formatSessionDate(session: Session): string {
  return `${session.date} · ${session.time}`;
}

export function filterSessions(
  sessions: Session[],
  mode: string | null
): Session[] {
  return mode === 'vacio' ? [] : sessions;
}

const SessionItem = memo(function SessionItem({
  session,
}: {
  session: Session;
}) {
  return (
    <IonItem
      routerLink={`/sesiones/${session.id}/qr`}
      detail
    >
      <IonLabel className="ion-text-wrap">
        <h2>{session.course}</h2>
        <p>{formatSessionDate(session)}</p>
        <p>Ver QR de la sesión {session.id}</p>
      </IonLabel>
    </IonItem>
  );
});

function SessionList({
  sessions,
  refreshVersion = 0,
  onSettled,
}: Props) {
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  const mode = new URLSearchParams(window.location.search).get('estado');

  const visibleSessions = useMemo(
    () => filterSessions(sessions, mode),
    [sessions, mode]
  );

  useEffect(() => {
    setStatus('loading');

    const timer = window.setTimeout(() => {
      setStatus(mode === 'error' && attempt === 0 ? 'error' : 'ready');
      onSettled?.();
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [attempt, mode, refreshVersion, onSettled]);

  if (status === 'loading') {
    return (
      <section role="status" aria-label="Cargando sesiones">
        <p>Cargando sesiones…</p>
        {[1, 2, 3].map(item => (
          <IonSkeletonText
            key={item}
            animated
            aria-hidden="true"
            style={{ width: '100%', height: '4rem' }}
          />
        ))}
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section role="alert">
        <h2>No pudimos cargar las sesiones</h2>
        <p>Intenta consultar nuevamente la lista de clases.</p>
        <IonButton onClick={() => setAttempt(value => value + 1)}>
          Reintentar
        </IonButton>
      </section>
    );
  }

  if (visibleSessions.length === 0) {
    return (
      <section aria-labelledby="empty-title">
        <h2 id="empty-title">No hay sesiones para mostrar</h2>
        <p>
          {mode === 'vacio'
            ? 'Esta vista simula un curso sin clases registradas.'
            : 'Todavía no hay clases registradas en esta lista.'}
        </p>
        <IonButton href="/sesiones">
          Ver sesiones de ejemplo
        </IonButton>
      </section>
    );
  }

  return (
    <IonList aria-label="Sesiones de clase">
      {visibleSessions.map(session => (
        <SessionItem key={session.id} session={session} />
      ))}
    </IonList>
  );
}

export default memo(SessionList);
