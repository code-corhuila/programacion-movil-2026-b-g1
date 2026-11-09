import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCallback, useMemo, useState } from 'react';

import OfflineBanner from '../components/OfflineBanner';
import { ErrorState, LoadingState } from '../components/StateViews';
import SubjectItem from '../components/SubjectItem';
import { useRemoteData } from '../hooks/useRemoteData';
import { academicService } from '../services/container';
import { formatGrade, weightedAverage } from '../utils/academicMath';

/** Protected view: GET /api/subjects with the Bearer token. */
const SubjectsPage: React.FC = () => {
  const loader = useCallback((forceRefresh: boolean) => academicService.getSubjects({ forceRefresh }), []);
  const { state, reload } = useRemoteData(loader);
  const [query, setQuery] = useState('');

  const subjects = state.status === 'data' ? state.data : null;
  // Optimization: derived values are memoized, not recomputed on every keystroke.
  const visible = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('es');
    return subjects === null
      ? []
      : subjects.filter((s) => s.name.toLocaleLowerCase('es').includes(term));
  }, [subjects, query]);
  const average = useMemo(() => (subjects === null ? null : weightedAverage(subjects)), [subjects]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis materias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) => {
            void reload().finally(() => event.detail.complete());
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
        <OfflineBanner />

        {state.status === 'loading' && <LoadingState label="Cargando tus materias…" />}

        {state.status === 'error' && (
          <ErrorState message={state.message} offline={state.offline} onRetry={() => void reload()} />
        )}

        {state.status === 'data' && (
          <>
            <IonCard>
              <IonCardContent>
                <div className="summary-label">Promedio ponderado por créditos</div>
                <div className="summary-value" data-testid="weighted-average">
                  {formatGrade(average)}
                </div>
              </IonCardContent>
            </IonCard>
            <IonSearchbar
              placeholder="Buscar materia"
              value={query}
              debounce={150}
              onIonInput={(e) => setQuery(String(e.detail.value ?? ''))}
            />
            {visible.length === 0 ? (
              <IonText color="medium">
                <p className="ion-padding">No hay materias que coincidan con la búsqueda.</p>
              </IonText>
            ) : (
              <IonList data-testid="subjects-list">
                {visible.map((subject) => (
                  <SubjectItem key={subject.id} subject={subject} />
                ))}
              </IonList>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SubjectsPage;
