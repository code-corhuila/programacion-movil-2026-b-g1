import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonInput, IonButton,
  IonText, IonSpinner, IonItemDivider
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const API_URL = 'http://localhost:3001/api/tasks';

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error fetching data from server');
      const data = await response.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Network error connecting to API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Please fill in both title and description');
      return;
    }

    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error('Failed to create task');

      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Error submitting new task');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Tasks App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Add New Task</h2>
        <form onSubmit={handleCreateTask}>
          <IonItem>
            <IonLabel position="floating">Task Title</IonLabel>
            <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput value={description} onIonChange={e => setDescription(e.detail.value!)} />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Save Task
          </IonButton>
        </form>

        {error && (
          <IonText color="danger" className="ion-margin-top">
            <p><strong>Error:</strong> {error}</p>
          </IonText>
        )}

        <IonItemDivider className="ion-margin-top" />
        <h2>Task List</h2>

        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {tasks.map(task => (
              <IonItem 
                key={task.id} 
                button 
                onClick={() => history.push(`/detail/${task.id}`)}
              >
                <IonLabel>
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
