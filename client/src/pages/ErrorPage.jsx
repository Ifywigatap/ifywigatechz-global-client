import React, { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import * as Sentry from '@sentry/react';

export default function ErrorPage() {
  // useRouteError catches the actual error that caused the crash
  const error = useRouteError();
  
  // Log to console for debugging purposes
  console.error("Global App Crash/Error:", error);

  // Automatically send non-routing errors to Sentry
  useEffect(() => {
    if (import.meta.env.PROD && !isRouteErrorResponse(error)) {
      Sentry.captureException(error);
    }
  }, [error]);

  let title = "Oops! Something went wrong.";
  let message = "An unexpected error occurred in the application. Our team has been notified.";

  // Handle Router-specific errors (e.g., 404 Not Found, 401 Unauthorized)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Page Not Found";
      message = "The page you are looking for doesn't exist or has been moved.";
    } else {
      title = `${error.status} - Routing Error`;
      message = error.data?.message || error.statusText;
    }
  } 
  // Handle actual JavaScript crashes in your React components
  else if (error instanceof Error) {
    message = error.message; // Displays the actual JS error (e.g., "Cannot read property 'map' of undefined")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl dark:shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner transition-colors duration-300">
          <AlertTriangle size={36} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed transition-colors duration-300">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <RefreshCcw size={18} /> Try Again
          </button>
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md shadow-blue-200 dark:shadow-none"
          >
            <Home size={18} /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}