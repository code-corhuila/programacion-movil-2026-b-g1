import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getIceCreams } from '../api';
import type { IceCream } from '../types';

export default function Home() {
  const history = useHistory();
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadIceCreams = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getIceCreams();
      setIceCreams(data);
    } catch (err) {
      setError('No fue posible cargar los helados. Verifica que la API esté ejecutándose.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIceCreams();
  }, [loadIceCreams]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ice Cream App (ICA)</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/create')}>Nuevo</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={loadIceCreams}>
          Actualizar lista
        </IonButton>

        {loading && <p>Cargando datos...</p>}
        {error && <p className="error">{error}</p>}

        <IonList>
          {iceCreams.map((iceCream) => (
            <IonItem
              key={iceCream.id}
              button
              onClick={() => history.push('/detail', { iceCream })}
            >
              <IonLabel>
                <h2>{iceCream.name}</h2>
                <p>{iceCream.flavor}</p>
                <p>${Number(iceCream.price).toLocaleString()}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {!loading && !error && iceCreams.length === 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>No hay helados</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Crea el primero con el botón “Nuevo”.</IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
}
