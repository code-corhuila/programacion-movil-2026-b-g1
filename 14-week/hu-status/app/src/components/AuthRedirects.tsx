import { useIonRouter } from '@ionic/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

/**
 * Keeps the route in sync with the session:
 * - no session (logout, 401, never logged in) on a protected route -> /login
 * - session on /login -> /subjects
 * Uses Ionic's router with a "root" transition so the page stack is reset.
 */
const AuthRedirects: React.FC = () => {
  const { status } = useAuth();
  const { pathname } = useLocation();
  const router = useIonRouter();

  useEffect(() => {
    if (status === 'anonymous' && pathname !== '/login') {
      router.push('/login', 'root', 'replace');
    } else if (status === 'authenticated' && pathname === '/login') {
      router.push('/subjects', 'root', 'replace');
    }
  }, [status, pathname, router]);

  return null;
};

export default AuthRedirects;
