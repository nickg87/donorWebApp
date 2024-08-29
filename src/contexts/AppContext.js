import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    balance: null,
    shouldFetch: false,
  });

  const updateUser = (user) => {
    setGlobalState((prevState) => ({
      ...prevState,
      user,
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
    <AppContext.Provider value={{ globalState, updateUser, updateBalance, updateShouldFetch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
