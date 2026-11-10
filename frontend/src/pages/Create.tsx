import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createIceCream } from '../api';

export default function Create() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [flavor, setFlavor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!name || !flavor || !price || !description) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      setSaving(true);
      await createIceCream({
        name,
        flavor,
        price: Number(price),
        description
      });
      history.replace('/home');
    } catch {
      setError('No fue posible crear el helado. Verifica la conexión con la API.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear helado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={name} onIonInput={(e) => setName(e.detail.value ?? '')} />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Sabor</IonLabel>
            <IonInput value={flavor} onIonInput={(e) => setFlavor(e.detail.value ?? '')} />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Precio</IonLabel>
            <IonInput
              type="number"
              value={price}
              onIonInput={(e) => setPrice(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonTextarea
              value={description}
              onIonInput={(e) => setDescription(e.detail.value ?? '')}
            />
          </IonItem>

          {error && <p className="error">{error}</p>}

          <IonButton expand="block" type="submit" disabled={saving}>
            {saving ? 'Guardando...' : 'Crear helado'}
          </IonButton>

          <IonButton expand="block" fill="outline" onClick={() => history.push('/home')}>
            Cancelar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
