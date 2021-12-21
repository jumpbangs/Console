import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import routes from 'constants/routes';
import { validateToken } from 'utils/jwt';
import AppState from 'domain/states/AppState';
import CommonRouterProps from 'domain/misc/Router/Common';

interface MappedProps {
  accessToken: string;
}

type InjectedProps = MappedProps & CommonRouterProps;

/**
 * Common route creator component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const CommonRoute = (props: InjectedProps) => {
  const { component: Component, path, accessToken, exact = false } = props;

  const isLoggedIn = validateToken(accessToken);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return isLoggedIn ? (
          <Redirect
            to={{
              pathname: routes.ROOT,
            }}
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  accessToken: state.data.auth.accessToken,
});

export default connect(mapStateToProps)(CommonRoute);
