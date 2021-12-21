import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import routes from 'constants/routes';
import { validateToken } from 'utils/jwt';
import AppState from 'domain/states/AppState';
import PrivateRouterProps from 'domain/misc/Router/Private';
import TopNavigation from 'components/common/layouts/topNavigation';
import SideNavigation from 'components/common/layouts/sideNavigation';

interface MappedProps {
  accessToken: string;
}

type InjectedProps = MappedProps & PrivateRouterProps;

/**
 * Private route creator component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const PrivateRoute = (props: InjectedProps) => {
  const { component: Component, path, accessToken, exact = false } = props;

  const checkUserAuth = validateToken(accessToken);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return checkUserAuth ? (
          <>
            <TopNavigation />
            <SideNavigation />
            <div className="main-wrapper">
              <div className="main-container">
                <Component {...props} />
              </div>
            </div>
          </>
        ) : (
          <Redirect
            to={{
              pathname: routes.SIGNIN,
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  accessToken: state.data.auth.accessToken,
});

export default connect(mapStateToProps)(PrivateRoute);
