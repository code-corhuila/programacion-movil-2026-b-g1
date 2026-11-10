import { IonButton, IonText } from "@ionic/react";

interface SaludoProps {
  nombre: string;
}

export const Saludo = ({ nombre }: SaludoProps) => {
  const mostrarMensaje = () => {
    alert(`¡Hola, ${nombre}!`);
  };

  return (
    <div>
      <IonText>
        <h2>Hola, {nombre}</h2>
      </IonText>

      <IonButton onClick={mostrarMensaje}>
        Saludar
      </IonButton>
    </div>
  );
};
