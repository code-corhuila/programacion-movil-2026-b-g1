import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { library, person } from 'ionicons/icons';
import { Navigate, Route } from 'react-router-dom';

import AuthRedirects from './components/AuthRedirects';
import RequireAuth from './components/RequireAuth';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SubjectsPage from './pages/SubjectsPage';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';
import './theme/app.css';

setupIonicReact();

/**
 * Navigation: /login is public; /subjects and /profile are protected tabs.
 * The tab bar is shown only with an active session; <AuthRedirects> moves
 * between /login and the protected area when the session changes.
 */
const Shell: React.FC = () => {
  const { status } = useAuth();
  return (
    <IonTabs>
      <AuthRedirects />
      <IonRouterOutlet>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/subjects"
          element={
            <RequireAuth>
              <SubjectsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/subjects" replace />} />
        <Route path="*" element={<Navigate to="/subjects" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className={status === 'authenticated' ? undefined : 'ion-hide'}>
        <IonTabButton tab="subjects" href="/subjects">
          <IonIcon aria-hidden="true" icon={library} />
          <IonLabel>Materias</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon aria-hidden="true" icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <Shell />
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
