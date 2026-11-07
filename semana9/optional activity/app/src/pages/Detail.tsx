import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonSpinner, IonText
} from '@ionic/react';
import { useParams } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/${id}`);
        if (!response.ok) throw new Error('Task not found');
        const data = await response.json();
        setTask(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Task Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading && <IonSpinner name="crescent" />}
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
        {task && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{task.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>ID:</strong> {task.id}</p>
              <p><strong>Description:</strong> {task.description}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Detail;
