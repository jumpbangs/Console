import { combineReducers } from 'redux';

import ui from './ui';
import data from './data';
import { store } from 'store/configure';
import AppActions from 'domain/actions/AppActions';
import { LOGOUT_FULFILLED } from 'actions/auth/logout';

const appReducer = combineReducers({
  ui,
  data,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: AppActions) => {
  if (action.type === LOGOUT_FULFILLED) {
    state = undefined;
  }

  return appReducer(state, action);
};

export type AppDispatch = typeof store.dispatch;

export default rootReducer;
