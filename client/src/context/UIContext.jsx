import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);
  const showError = useCallback((msg) => setError(msg), []);
  const clearError = useCallback(() => setError(null), []);

  return (
    <UIContext.Provider value={{ 
      loading, 
      error, 
      showLoader, 
      hideLoader, 
      showError, 
      clearError 
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);