import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useTranslation} from "next-i18next";

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [isThemeReady, setIsThemeReady] = useState(false);
  const defaultTheme = typeof window !== 'undefined' ? localStorage.getItem('donorSiteTheme') : null;
  const defaultLanguage = typeof window !== 'undefined' ? localStorage.getItem('donorSiteLanguage') : null;
  const [globalState, setGlobalState] = useState({
    user: null,
    balance: null,
    shouldFetch: false,
    currentPool: null,
    currentPoolBalance: null,
    currentEthPrice: null,
    theme: defaultTheme || 'light',
    language: defaultLanguage || 'en',
  });

  // Load the theme and language from local storage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('donorSiteTheme');
      const storedLanguage = localStorage.getItem('donorSiteLanguage');
      let updateObj = {};
      if (storedTheme) {
        updateObj.theme = storedTheme;
      }
      if (storedLanguage) {
        updateObj.language = storedLanguage;
        i18n.changeLanguage(storedLanguage);
        if (storedLanguage !== router.locale) {
          router.replace(router.pathname, router.asPath, { locale: storedLanguage });
        }
      }
      if (Object.keys(updateObj).length > 0) {
        setGlobalState(prevState => ({ ...prevState, ...updateObj }));
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

  const updateCurrentLanguage = (language) => {
    setGlobalState((prevState) => ({
      ...prevState,
      language,
    }));
    localStorage.setItem('donorSiteLanguage', language);
    i18n.changeLanguage(language);
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
    <AppContext.Provider value={{ globalState, updateUser, updateBalance, updateShouldFetch, updateCurrentPool, updateCurrentEthPrice, updateCurrentTheme, updateCurrentLanguage, updateCurrentPoolBalance }}>
      {isThemeReady ? children : null}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
