import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';

import history from 'utils/history';
import routes from 'constants/routes';
import RootRouter from './RootRouter';

/**
 * Router Component.
 *
 * @returns {React.ReactElement}
 */
const Router: React.FC = (): React.ReactElement => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path={routes.ROOT} component={RootRouter} title="Home" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
