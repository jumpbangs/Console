import * as React from 'react';

import { AppRouter } from 'router';
import ErrorBoundary from 'components/common/errors';

/**
 * App Component
 *
 * @returns {React.ReactElement}
 */
const App: React.FC = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
};

export default App;
