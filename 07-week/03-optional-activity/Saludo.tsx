import { IonButton, IonText } from '@ionic/react';

interface SaludoProps {
  nombre: string;
}

const Saludo: React.FC<SaludoProps> = ({ nombre }) => {
  const mostrarSaludo = () => {
    alert(`¡Hola, ${nombre}!`);
  };

  return (
    <div>
      <IonText>
        <h2>Hola, {nombre}</h2>
      </IonText>

      <IonButton onClick={mostrarSaludo}>
        Saludar
      </IonButton>
    </div>
  );
};

export default Saludo;
