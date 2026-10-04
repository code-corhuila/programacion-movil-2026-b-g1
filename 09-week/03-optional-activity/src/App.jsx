import { IonRouterOutlet } from '@ionic/react';
import { Navigate, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detalle from './pages/Detalle';

function App() {
  return (
    <IonRouterOutlet>
      <Route path="/home" element={<Home />} />
      <Route path="/detalle" element={<Detalle />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </IonRouterOutlet>
  );
}

export default App;
