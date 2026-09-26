import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import Saludo from '../Saludo';

setupIonicReact();

const App = () => {
  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1>Actividad Semana 7</h1>
      <Saludo nombre="Julián" />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
