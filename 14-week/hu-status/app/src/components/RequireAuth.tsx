import { IonContent, IonPage } from '@ionic/react';
import type { ReactNode } from 'react';

import { useAuth } from '../context/AuthContext';
import { LoadingState } from './StateViews';

/**
 * Protected route content. Without a session it shows a placeholder page while
 * <AuthRedirects> sends the user to /login (Ionic needs every route to render an IonPage).
 */
const RequireAuth: React.FC<{ readonly children: ReactNode }> = ({ children }) => {
  const { status } = useAuth();
  if (status !== 'authenticated') {
    return (
      <IonPage>
        <IonContent>
          <LoadingState label={status === 'checking' ? 'Verificando sesión…' : 'Redirigiendo al inicio de sesión…'} />
        </IonContent>
      </IonPage>
    );
  }
  return <>{children}</>;
};

export default RequireAuth;
