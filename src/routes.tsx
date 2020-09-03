import NotFound from 'components/NotFound';
import Page from 'components/Page';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Page title="Login" exact path="/login" component={Login} />
        <Page title="Sign Up" exact path="/signup" component={SignUp} />
        <Page
          title="Ideas"
          privateRoute={true}
          exact
          path="/ideas"
          component={MyIdeas}
        />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </StyledContainer>
  );
};
