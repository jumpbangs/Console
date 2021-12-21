import { combineReducers } from 'redux';

import home from './home';
import login from './login';
import devices from './devices';
import tickets from './tickets';
import accounts from './accounts';
import locations from './locations';
import transactions from './transactions';

export default combineReducers({
  home,
  devices,
  tickets,
  accounts,
  locations,
  transactions,
  auth: login, // [NOTE] shorthand property should come first
});
