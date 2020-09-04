import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { TokenStorage } from 'services/token-storage-service';

const Page: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  title: string;
  privateRoute?: boolean;
}> = ({ component: Component, ...rest }) => {
  const { title, privateRoute } = rest;
  useEffect(() => {
    document.title = `My Idea Pool | ${title}`;
  });

  const condition = TokenStorage.isAuthenticated();
  if (!privateRoute) {
    return <Route path={rest.path} exact={rest.exact} component={Component} />;
  }
  return condition ? (
    <Route path={rest.path} exact={rest.exact} component={Component} />
  ) : (
    <Redirect to="" />
  );
};

export default Page;
