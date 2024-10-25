import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    balance: null,
    shouldFetch: false,
    currentPool: null,
    currentPoolBalance: null,
    currentEthPrice: null,
    theme: 'light',
  });

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
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
