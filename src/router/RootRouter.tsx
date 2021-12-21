import React from 'react';
import { Redirect, RouteProps, Switch, withRouter } from 'react-router-dom';

import Home from 'components/home';
import Login from 'components/login';
import routes from 'constants/routes';
import Ticket from 'components/ticket';
import Devices from 'components/devices';
import Profile from 'components/profile';
import Settings from 'components/settings';
import { routeToNameMap } from 'maps/routeToName';
import { APP_NAME } from 'constants/appConstants';
import { CommonRoute, PrivateRoute } from 'router';
import CreatePassword from 'components/createPassword';
import ForgotPassword from 'components/forgotPassword';
import Transactions from 'components/transactions/Transactions';
import ForgotPasswordSubmit from 'components/forgotPassword/components/ForgotPasswordSubmit';

/**
 * Root router Component.
 *
 * @returns {React.ReactElement}
 */
const RootRouter: React.FC = (props: RouteProps): React.ReactElement => {
  const pathName = props.location?.pathname;
  const docTitle = pathName && routeToNameMap[pathName] ? routeToNameMap[pathName] : APP_NAME;

  React.useEffect(() => {
    document.title = docTitle;
  });

  return (
    <div className="App">
      <Switch>
        <CommonRoute exact path={routes.SIGNIN} component={Login} />
        <CommonRoute exact path={routes.CREATE_PASSWORD} component={CreatePassword} />
        <CommonRoute exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
        <CommonRoute exact path={routes.FORGOT_PASSWORD_SUBMIT} component={ForgotPasswordSubmit} />
        <PrivateRoute exact path={routes.ROOT} component={Home} />
        <PrivateRoute exact path={routes.TICKETS} component={Ticket} />
        <PrivateRoute exact path={routes.TRANSACTIONS} component={Transactions} />
        <PrivateRoute exact path={routes.DEVICES} component={Devices} />
        <PrivateRoute exact path={routes.PROFILE} component={Profile} />
        <PrivateRoute exact path={routes.SETTINGS} component={Settings} />
        <Redirect to={routes.ROOT} />
      </Switch>
    </div>
  );
};

export default withRouter(RootRouter);
