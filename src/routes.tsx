import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { SideBar } from './components/SideBar';
import { Login } from './views/login';

const StyledContainer = styled.div`
  display: flex;
`;

export const Routes = () => {
  return (
    <StyledContainer>
      <SideBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </StyledContainer>
  );
};
