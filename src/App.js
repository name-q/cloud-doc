import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { history, routeWithSubRoutes, noop } from './kit'
import { homeRoutes } from './routers'

import Login from './pages/login';

const App = () => (
  <Router history={history}>
    <Switch>
      {routeWithSubRoutes(homeRoutes, noop)}
      <Route component={Login} />
    </Switch>
  </Router>
);

export default App;