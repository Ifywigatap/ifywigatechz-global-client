/**
 * React Error Boundary
 * Catches JavaScript errors anywhere in child component tree,
 * logs them, and displays a fallback UI instead of crashing.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error tracking service (e.g., Sentry)
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    
    // Send to Sentry in production
    if (import.meta.env.PROD) {
      Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-lg">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-brandGold mb-4">
              Something went wrong
            </h1>
            <p className="text-neutral-400 mb-6">
              We apologize for the inconvenience. Our team has been notified.
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <pre className="bg-black/30 p-4 rounded-lg text-left text-xs text-red-400 mb-6 overflow-auto max-h-48">
                {this.state.error.toString()}
              </pre>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-brandBlue text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-brandGold text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
