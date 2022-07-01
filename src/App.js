import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { history, routeWithSubRoutes, noop } from './kit'
import { openRouters } from './routers'

import Main from './pages/main';

const App = () => (
  <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', overflow:'hidden' }}>
    <Router history={history}>
      <Switch>
        {/* 开放路由 */}
        {routeWithSubRoutes(openRouters, noop)}
        {/* 需登入后展示的路由 */}
        <Route component={Main} />
      </Switch>
    </Router>
  </div>
);

export default App;