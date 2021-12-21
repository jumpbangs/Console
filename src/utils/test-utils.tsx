import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';

import reducers from 'reducers';

/**
 * Wraps given component with reducer and router
 */
function render(
  Component: any,
  { path = '/', route = '/', history = createMemoryHistory({ initialEntries: [route] }) }: any = {},
  { initialState, store = createStore(reducers, initialState), ...renderOptions }: any = {}
) {
  function Wrapper({ children }: any) {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path={path} component={children} />
        </Router>
      </Provider>
    );
  }

  return rtlRender(Component, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export { render, userEvent };
