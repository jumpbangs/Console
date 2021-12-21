import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import init from './init';
import 'assets/sass/style.scss';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from 'store/configure';
import { PersistGate } from 'redux-persist/integration/react';

init();

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
