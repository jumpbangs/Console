import routes from 'constants/routes';

/**
 * Maps routes to the specific page name.
 */
export const routeToNameMap = {
  [routes.HOME]: 'Home',
  [routes.ROOT]: 'Home',
  [routes.SIGNIN]: 'Signin',
  [routes.PROFILE]: 'Profile',
  [routes.DEVICES]: 'Devices',
  [routes.TICKETS]: 'Tickets',
  [routes.LOCATIONS]: 'Locations',
  [routes.TRANSACTIONS]: 'Transaction',
  [routes.CREATE_PASSWORD]: 'Create Password',
};
