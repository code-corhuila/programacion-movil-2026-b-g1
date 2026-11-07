import { useState, type FormEvent } from 'react';
import {
  IonAlert, IonButton, IonContent, IonHeader, IonInput,
  IonPage, IonSelect, IonSelectOption, IonSpinner,
  IonTitle, IonToast, IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { createSession, isValidDate } from './session-store';

export default function SessionFormPage() {
  const history = useHistory();
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const courseError = courseId === '1' ? '' : 'Selecciona un curso.';
  const dateError = isValidDate(date) ? '' : 'Selecciona una fecha válida.';
  const timeError = /^([01]\d|2[0-3]):[0-5]\d$/.test(startTime)
    ? '' : 'Selecciona una hora válida.';
  const invalid = Boolean(courseError || dateError || timeError);
  const locked = sending || success;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (invalid || locked) return;
    setSending(true);
    setError('');
    try {
      const simulateError = new URLSearchParams(
        window.location.search,
      ).get('estado') === 'error';
      await createSession(
        { courseId: Number(courseId), date, startTime }, simulateError,
      );
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo guardar.');
    } finally {
      setSending(false);
    }
  }

  function leaveForm() {
    setCourseId('');
    setDate('');
    setStartTime('');
    setError('');
    setSuccess(false);
    history.replace('/sesiones');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Crear sesión de clase</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className="workshop-content">
          <h1>Nueva sesión</h1>
          <p>Selecciona el curso, la fecha y la hora de inicio.</p>
          <p>Demostración: los datos se guardan solo en este navegador.</p>
          <form onSubmit={submit} noValidate aria-busy={sending}>
            <IonSelect
              label="Curso" labelPlacement="stacked"
              value={courseId} disabled={locked} aria-required="true"
              aria-invalid={Boolean(courseError)} aria-describedby="course-error"
              onIonChange={event => setCourseId(String(event.detail.value ?? ''))}
            >
              <IonSelectOption value="1">Programación Móvil</IonSelectOption>
            </IonSelect>
            <p id="course-error">{courseError}</p>
            <IonInput
              label="Fecha de la clase" labelPlacement="stacked" type="date"
              value={date} disabled={locked} aria-required="true"
              aria-invalid={Boolean(dateError)} aria-describedby="date-error"
              onIonInput={event => setDate(String(event.detail.value ?? ''))}
            />
            <p id="date-error">{dateError}</p>
            <IonInput
              label="Hora de inicio" labelPlacement="stacked" type="time"
              value={startTime} disabled={locked} aria-required="true"
              aria-invalid={Boolean(timeError)} aria-describedby="time-error"
              onIonInput={event => setStartTime(String(event.detail.value ?? ''))}
            />
            <p id="time-error">{timeError}</p>
            {error && <p role="alert">{error} Los campos se conservaron.</p>}
            <IonButton type="submit" disabled={invalid || locked}>
              {sending && <IonSpinner name="dots" aria-hidden="true" />}
              {sending ? 'Guardando…' : 'Crear sesión'}
            </IonButton>
            <IonButton
              type="button" fill="outline" disabled={locked}
              onClick={() => setConfirmCancel(true)}
            >
              Cancelar
            </IonButton>
          </form>
          <IonAlert
            isOpen={confirmCancel} header="¿Cancelar la creación?"
            message="Se perderán los datos ingresados."
            buttons={[
              { text: 'Seguir editando', role: 'cancel' },
              { text: 'Descartar', role: 'destructive', handler: leaveForm },
            ]}
            onDidDismiss={() => setConfirmCancel(false)}
          />
          <IonToast
            isOpen={success} message="Sesión creada correctamente." duration={1800}
            onDidDismiss={() => { if (success) leaveForm(); }}
          />
        </main>
      </IonContent>
    </IonPage>
  );
}