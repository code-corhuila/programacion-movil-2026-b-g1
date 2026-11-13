import { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api/tasks';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        setError('');

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error('No fue posible obtener el detalle.');
        }

        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError('Error de red o tarea no encontrada.');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <p>Cargando detalle...</p>}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {task && !error && (
          <>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>
              <strong>ID:</strong> {task.id}
            </p>
          </>
        )}

        <IonButton
          expand="block"
          onClick={() => navigate('/home')}
        >
          Volver a tareas
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default TaskDetail;
