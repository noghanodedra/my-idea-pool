import './App.css';

import { UserProvider } from 'contexts/UserContext';
import React from 'react';

import { Routes } from './routes';
import Theme from './Theme';

const App: React.StatelessComponent<{}> = () => (
  <div>
    <Theme>
      <UserProvider>
        <Routes />
      </UserProvider>
    </Theme>
  </div>
);

export default App;
