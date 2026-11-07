import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonText
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api/tasks';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Completa el título y la descripción.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim()
        })
      });

      if (!response.ok) {
        throw new Error('No fue posible crear la tarea.');
      }

      await response.json();

      navigate('/home');
    } catch (err) {
      setError('Error de red. Verifica que la API esté ejecutándose.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Título"
            labelPlacement="stacked"
            placeholder="Escribe el título"
            value={title}
            onIonInput={(event) => setTitle(event.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonTextarea
            label="Descripción"
            labelPlacement="stacked"
            placeholder="Escribe la descripción"
            value={description}
            onIonInput={(event) =>
              setDescription(event.detail.value ?? '')
            }
            autoGrow
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Guardar tarea'}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => navigate('/home')}
        >
          Cancelar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default CreateTask;
