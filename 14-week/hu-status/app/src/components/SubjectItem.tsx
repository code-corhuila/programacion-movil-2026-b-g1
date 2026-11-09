import { IonBadge, IonItem, IonLabel } from '@ionic/react';
import { memo } from 'react';

import type { Subject } from '../services/types';
import { formatGrade, isPassing } from '../utils/academicMath';

interface SubjectItemProps {
  readonly subject: Subject;
}

/**
 * One row of the protected list.
 * Optimization: wrapped in React.memo, so typing in the search bar (or any
 * parent re-render) does not re-render rows whose subject did not change.
 */
/** Plain (non-memoized) row, exported only to measure the optimization. */
export const SubjectItemView: React.FC<SubjectItemProps> = ({ subject }) => (
  <IonItem>
    <IonLabel>
      <h2>{subject.name}</h2>
      <p>{subject.teacher}</p>
      <p>{subject.credits === 1 ? '1 crédito' : `${subject.credits} créditos`}</p>
    </IonLabel>
    <IonBadge slot="end" color={isPassing(subject.average) ? 'success' : 'danger'}>
      {formatGrade(subject.average)}
    </IonBadge>
  </IonItem>
);

const SubjectItem = memo(SubjectItemView);

export default SubjectItem;
