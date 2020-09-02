import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { SideBar } from './components/SideBar';
import { Login } from './views/login';
import { MyIdeas } from './views/my-ideas';
import { SignUp } from './views/sign-up';

const StyledContainer = styled.div`
  display: flex;
`;

export const Routes = () => {
  return (
    <StyledContainer>
      <SideBar />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/ideas" component={MyIdeas} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </StyledContainer>
  );
};