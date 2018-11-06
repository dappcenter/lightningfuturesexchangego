import React from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { LandingPageRoute } from './components/pages/landing-page/landing-page';
import { EmptyPage } from './components/pages/empty-page/empty-page';
import { LoginPageRoute } from './components/pages/login-page/login-page';
import { RegisterPageRoute } from './components/pages/register-page/register-page';
import { RegisterSuccessPageRoute } from './components/pages/register-success-page/register-success-page';
import { DashboardPageRoute } from './components/pages/dashboard-page/dashboard-page';

export default (store) => (
  <HashRouter>
    <Switch>
      {[LandingPageRoute, RegisterPageRoute, RegisterSuccessPageRoute, DashboardPageRoute, LoginPageRoute]}
      <Route path="*" component={EmptyPage} />
    </Switch>
  </HashRouter>
);
