
import { useEffect, useState } from 'react';

import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  cameraOutline,
  constructOutline,
  logOutOutline,
  refreshOutline,
} from 'ionicons/icons';

import CameraReport from './components/CameraReport';
import LoginPage from './pages/LoginPage';
import { ApiError, getReports, type Report } from './services/api';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    let active = true;

    async function loadReports() {
      setLoading(true);
      setError('');

      try {
        const data = await getReports(token!);

        if (active) {
          setReports(data);
        }
      } catch (err) {
        if (!active) return;

        if (err instanceof ApiError && err.status === 401) {
          setToken(null);
          setReports([]);
          setError('');
        } else {
          setError(
            err instanceof Error
              ? err.message
              : 'No fue posible cargar los reportes.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadReports();

    return () => {
      active = false;
    };
  }, [token]);

  function handleLogout() {
    setToken(null);
    setReports([]);
    setShowCamera(false);
    setError('');
  }

  if (!token) {
    return (
      <IonApp>
        <LoginPage onLogin={setToken} />
      </IonApp>
    );
  }

  async function refreshReports() {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const data = await getReports(token);
      setReports(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        handleLogout();
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'No fue posible cargar los reportes.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>AulaFix</IonTitle>
            <IonButton
              slot="end"
              fill="clear"
              color="light"
              onClick={handleLogout}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <div style={{ maxWidth: '600px', margin: '30px auto' }}>
            <div style={{ textAlign: 'center' }}>
              <IonIcon
                icon={constructOutline}
                color="primary"
                style={{ fontSize: '65px' }}
              />
              <h1>Bienvenido a AulaFix</h1>
              <p>Gestión de reportes de equipos institucionales</p>
            </div>

            <IonButton
              expand="block"
              onClick={() => setShowCamera(false)}
            >
              Ver reportes
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              onClick={() => setShowCamera(true)}
            >
              <IonIcon icon={cameraOutline} slot="start" />
              Registrar novedad
            </IonButton>

            {showCamera ? (
              <CameraReport />
            ) : (
              <>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Reportes registrados</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    {loading && (
                      <div style={{ textAlign: 'center' }}>
                        <IonSpinner name="crescent" />
                        <p>Cargando reportes...</p>
                      </div>
                    )}

                    {!loading && error && (
                      <IonText color="danger">
                        <p role="alert">{error}</p>
                      </IonText>
                    )}

                    {!loading && !error && reports.length === 0 && (
                      <p>No hay reportes disponibles.</p>
                    )}

                    {!loading && !error && reports.map((report) => (
                      <IonCard key={report.id}>
                        <IonCardHeader>
                          <IonCardTitle>{report.equipo}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p>{report.descripcion}</p>
                          <p><strong>Estado:</strong> {report.estado}</p>
                        </IonCardContent>
                      </IonCard>
                    ))}

                    <IonButton
                      expand="block"
                      fill="outline"
                      disabled={loading}
                      onClick={refreshReports}
                    >
                      <IonIcon icon={refreshOutline} slot="start" />
                      Reintentar / Actualizar
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </>
            )}
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}

export default App;
