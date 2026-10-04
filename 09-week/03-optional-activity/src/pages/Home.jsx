import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [contador, setContador] = useState(0);

  const tareas = [
    'Estudiar Programación Móvil',
    'Practicar Ionic React',
    'Realizar la actividad de la semana 9',
    'Revisar GitHub',
    'Preparar la entrega',
  ];

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Actividad Semana 9</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Lista de tareas</h1>

        <IonList>
          {tareas.map((tarea, index) => (
            <IonItem key={index}>
              <IonLabel>
                {index + 1}. {tarea}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <h2>Contador: {contador}</h2>

        <IonButton expand="block" onClick={() => setContador(contador + 1)}>
          Aumentar contador
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => navigate('/detalle')}
        >
          Ir a segunda página
        </IonButton>
      </IonContent>
    </>
  );
}

export default Home;
