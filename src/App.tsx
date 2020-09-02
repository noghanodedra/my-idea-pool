import './App.css';

import { UserProvider } from 'contexts/UserContext';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './routes';
import Theme from './Theme';

const App: React.StatelessComponent<{}> = () => (
  <div>
    <Theme>
      <UserProvider>
        <Router>
          <Routes />
        </Router>
      </UserProvider>
    </Theme>
  </div>
);

export default App;
