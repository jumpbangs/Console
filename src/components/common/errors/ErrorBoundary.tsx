import * as React from 'react';

interface State {
  hasError: boolean;
}

/**
 * Error boundary class.
 */
class ErrorBoundary extends React.Component<React.PropsWithChildren<any>, State> {
  constructor(props: React.PropsWithChildren<any>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          <p>We're sorry — something went wrong.</p>
          <p>Our team has been notified.</p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
