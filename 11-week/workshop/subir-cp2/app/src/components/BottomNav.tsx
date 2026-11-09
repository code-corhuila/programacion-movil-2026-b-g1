import { IonButton, IonFooter, IonIcon, IonToolbar } from '@ionic/react';
import { person, search } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import './BottomNav.css';

const secciones = [
  { ruta: '/home', texto: 'Buscar', icono: search },
  { ruta: '/profile', texto: 'Mi perfil', icono: person },
];

const BottomNav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <IonFooter>
      <IonToolbar>
        <nav className="bottom-nav" aria-label="Navegación principal">
          {secciones.map((s) => {
            const activa = pathname === s.ruta;
            return (
              <IonButton
                key={s.ruta}
                fill="clear"
                color={activa ? 'primary' : 'medium'}
                routerLink={s.ruta}
                routerDirection="root"
                aria-current={activa ? 'page' : undefined}
              >
                <IonIcon slot="start" icon={s.icono} aria-hidden="true" />
                {s.texto}
              </IonButton>
            );
          })}
        </nav>
      </IonToolbar>
    </IonFooter>
  );
};

export default BottomNav;
