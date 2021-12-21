import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import home from './home';
import login from './login';
import tickets from './tickets';
import devices from './devices';
import accounts from './accounts';
import locations from './locations';
import dateRange from './dateRange';
import transactions from './transactions';

/**
 * Persist login Reducer.
 */
const authPersistConfig = {
  storage,
  key: 'auth',
};

export default combineReducers({
  home,
  tickets,
  devices,
  accounts,
  locations,
  dateRange,
  transactions,
  auth: persistReducer(authPersistConfig, login),
});
