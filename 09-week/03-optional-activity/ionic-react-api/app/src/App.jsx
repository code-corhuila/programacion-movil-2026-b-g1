import { Navigate, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <IonRouterOutlet>
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateTask />} />
      <Route path="/task/:id" element={<TaskDetail />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </IonRouterOutlet>
  );
}

export default App;
