import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [isThemeReady, setIsThemeReady] = useState(false);
  const defaultTheme = typeof window !== 'undefined' ? localStorage.getItem('donorSiteTheme') : null;
  const [globalState, setGlobalState] = useState({
    user: null,
    balance: null,
    shouldFetch: false,
    currentPool: null,
    currentPoolBalance: null,
    currentEthPrice: null,
    theme: defaultTheme || 'light',
  });

  // Load the theme from local storage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('donorSiteTheme');
      if (storedTheme) {
        setGlobalState(prevState => ({ ...prevState, theme: storedTheme }));
      }
      setIsThemeReady(true); // Indicate that the theme is ready
    }
  }, []);

  const updateUser = (user) => {
    setGlobalState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  const updateCurrentPool = (currentPool) => {
    setGlobalState((prevState) => ({
      ...prevState,
      currentPool,
    }));
  };

  const updateCurrentPoolBalance = (currentPoolBalance) => {
    setGlobalState((prevState) => ({
      ...prevState,
      currentPoolBalance,
    }));
  };

  const updateCurrentTheme = (theme) => {
    setGlobalState((prevState) => ({
      ...prevState,
      theme,
    }));
    localStorage.setItem('donorSiteTheme', theme);
  };


  const updateCurrentEthPrice = (currentEthPrice) => {
    setGlobalState((prevState) => ({
      ...prevState,
      currentEthPrice,
    }));
  };

  const updateBalance = (balance) => {
    setGlobalState((prevState) => ({
      ...prevState,
      balance,
    }));
  };

  const updateShouldFetch = (shouldFetch) => {
    setGlobalState((prevState) => ({
      ...prevState,
      shouldFetch,
    }));
  };

  return (
    <AppContext.Provider value={{ globalState, updateUser, updateBalance, updateShouldFetch, updateCurrentPool, updateCurrentEthPrice, updateCurrentTheme, updateCurrentPoolBalance }}>
      {isThemeReady ? children : null}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
