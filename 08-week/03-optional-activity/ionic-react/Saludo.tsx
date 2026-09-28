import { IonButton, IonContent, IonText } from '@ionic/react';

const Saludo: React.FC = () => {
  const nombre = 'Julián';

  return (
    <IonContent className="ion-padding">
      <IonText>
        <h1>Hola, {nombre}</h1>
      </IonText>

      <IonButton onClick={() => console.log(`Hola, ${nombre}!`)}>
        Saludar
      </IonButton>
    </IonContent>
  );
};

export default Saludo;
