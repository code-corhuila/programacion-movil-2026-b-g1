import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

function Detalle() {
  const navigate = useNavigate();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Segunda página</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Detalle de la actividad</h1>

        <p>
          Esta es la segunda página de la aplicación de la Semana 9.
        </p>

        <p>
          La navegación se realiza utilizando React Router.
        </p>

        <IonButton expand="block" onClick={() => navigate('/home')}>
          Volver a la lista
        </IonButton>
      </IonContent>
    </>
  );
}

export default Detalle;
