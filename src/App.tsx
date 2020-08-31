import './App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './routes';
import Theme from './Theme';

const App: React.StatelessComponent<{}> = () => (
  <div>
    <Theme>
      <Router>
        <Routes />
      </Router>
    </Theme>
  </div>
);

export default App;
