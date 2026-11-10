import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import type { IceCream } from '../types';

type LocationState = {
  iceCream?: IceCream;
};

export default function Detail() {
  const location = useLocation<LocationState>();
  const iceCream = location.state?.iceCream;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {iceCream ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{iceCream.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>ID:</strong> {iceCream.id}</p>
              <p><strong>Sabor:</strong> {iceCream.flavor}</p>
              <p><strong>Precio:</strong> ${Number(iceCream.price).toLocaleString()}</p>
              <p><strong>Descripción:</strong> {iceCream.description}</p>
            </IonCardContent>
          </IonCard>
        ) : (
          <p>No se encontró información del helado.</p>
        )}
      </IonContent>
    </IonPage>
  );
}
