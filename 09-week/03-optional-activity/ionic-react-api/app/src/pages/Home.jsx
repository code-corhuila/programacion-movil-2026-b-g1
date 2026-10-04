import { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3001/api/tasks');

      if (!response.ok) {
        throw new Error('No se pudieron cargar las tareas.');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Error de conexión con la API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="home-container">
          <div className="home-header">
            <h1>Mis tareas</h1>
            <p>Administra tus actividades de forma sencilla.</p>

            <IonButton
              expand="block"
              className="create-button"
              onClick={() => navigate('/create')}
            >
              Crear nueva tarea
            </IonButton>
          </div>

          {loading && (
            <div className="state-message">
              <IonSpinner name="crescent" />
              <p>Cargando tareas...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <strong>Error</strong>
              <p>{error}</p>
              <IonButton fill="outline" onClick={loadTasks}>
                Intentar nuevamente
              </IonButton>
            </div>
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className="state-message">
              <p>No hay tareas registradas.</p>
            </div>
          )}

          {!loading &&
            !error &&
            tasks.map((task) => (
              <IonCard
                key={task.id}
                className="task-card"
                button
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <IonCardHeader>
                  <IonCardTitle>{task.title}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  {task.description}
                </IonCardContent>
              </IonCard>
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Home;
