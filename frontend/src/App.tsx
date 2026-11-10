import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Detail from './pages/Detail';

export default function App() {
  return (
    <IonRouterOutlet>
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/detail" component={Detail} />
    </IonRouterOutlet>
  );
}
