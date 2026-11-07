
import { Profiler, useCallback, useRef, useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  type RefresherEventDetail,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import SessionList from './SessionList';
import SessionFormPage from './SessionFormPage';
import SessionQrPage from './SessionQrPage';
import CameraPage from './CameraPage';
import { getSessions } from './session-store';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import './theme/variables.css';

function SessionsPage() {
  const [sessions, setSessions] = useState(getSessions);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const pendingRefresh = useRef<RefresherEventDetail | null>(null);

  useIonViewWillEnter(() => {
    setSessions(getSessions());
  });

  const finishRefresh = useCallback(() => {
    pendingRefresh.current?.complete();
    pendingRefresh.current = null;
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Attendance · Profesor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={event => {
            pendingRefresh.current = event.detail;
            setSessions(getSessions());
            setRefreshVersion(value => value + 1);
          }}
        >
          <IonRefresherContent
            pullingText="Desliza para actualizar sesiones"
            refreshingText="Actualizando sesiones…"
          />
        </IonRefresher>

        <main className="workshop-content">
          <h1>Sesiones de clase</h1>
          <p>
            Selecciona la sesión para consultar sus datos
            y el estado del QR.
          </p>

          <section aria-labelledby="storage-heading">
            <h2 id="storage-heading">
              Demostración con guardado local
            </h2>
            <p>
              Las sesiones que crees solo estarán disponibles en este
              navegador. No se comparten con otros navegadores ni dispositivos.
            </p>
            <p>
              Para volver a consultarlas, utiliza el mismo navegador
              y la misma dirección de la aplicación.
            </p>
            <p>
              La sincronización con el servidor todavía no está disponible.
            </p>
          </section>

          <IonButton routerLink="/sesiones/nueva">
            Crear sesión
          </IonButton>

          <IonButton routerLink="/camara" color="secondary">
            Probar cámara
          </IonButton>

          <Profiler
            id="SessionList"
            onRender={(_id, phase, actualDuration) => {
              console.log(
                `[Week14][BEFORE] ${phase}: ${actualDuration.toFixed(2)} ms`
              );
            }}
          >
            <SessionList
              sessions={sessions}
              refreshVersion={refreshVersion}
              onSettled={finishRefresh}
            />
          </Profiler>
        </main>
      </IonContent>
    </IonPage>
  );
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route
          exact
          path="/sesiones/nueva"
          component={SessionFormPage}
        />
        <Route
          exact
          path="/sesiones"
          component={SessionsPage}
        />
        <Route
          exact
          path="/sesiones/:id/qr"
          render={({ location }) => (
            <SessionQrPage
              key={location.pathname + location.search}
            />
          )}
        />
        <Route
          exact
          path="/camara"
          component={CameraPage}
        />
        <Route exact path="/">
          <Redirect to="/sesiones" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
