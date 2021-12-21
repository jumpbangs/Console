import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware, Store } from 'redux';

import rootReducer from 'reducers';
import * as env from 'constants/env';

let enhancers;

if (process.env.REACT_APP_ENV === env.DEVELOPMENT) {
  enhancers = [applyMiddleware(thunk, promise, logger)];
} else {
  enhancers = [applyMiddleware(thunk, promise)];
}

// tslint:disable-next-line: no-string-literal
if (process.env.REACT_APP_ENV === env.DEVELOPMENT && window['__REDUX_DEVTOOLS_EXTENSION__']) {
  // tslint:disable-next-line: no-string-literal
  enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const store: Store = createStore(rootReducer, compose(...enhancers));

const persistor = persistStore(store);

export { store, persistor };
