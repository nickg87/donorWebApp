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
  const defaultShowSurvey = typeof window !== 'undefined' ? localStorage.getItem('donorShowSurvey') : 'true';
  const [globalState, setGlobalState] = useState({
    user: null,
    balance: null,
    shouldFetch: false,
    currentPool: null,
    specialPool: null,
    currentPoolBalance: null,
    specialPoolBalance: null,
    currentEthPrice: null,
    showSurvey: defaultShowSurvey || 'true',
    theme: defaultTheme || 'light',
    language: defaultLanguage || 'en',
  });

  // Load the theme and language from local storage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('donorSiteTheme');
      const storedLanguage = localStorage.getItem('donorSiteLanguage');
      const storedShowSurvey = localStorage.getItem('donorShowSurvey');
      let updateObj = {};
      if (storedTheme) {
        updateObj.theme = storedTheme;
      }
      if (storedShowSurvey) {
        updateObj.showSurvey = storedShowSurvey;
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

  const updateSpecialPool = (specialPool) => {
    setGlobalState((prevState) => ({
      ...prevState,
      specialPool,
    }));
  };

  const updateCurrentPoolBalance = (currentPoolBalance) => {
    setGlobalState((prevState) => ({
      ...prevState,
      currentPoolBalance,
    }));
  };

  const updateSpecialPoolBalance = (specialPoolBalance) => {
    setGlobalState((prevState) => ({
      ...prevState,
      specialPoolBalance,
    }));
  };

  const updateCurrentTheme = (theme) => {
    setGlobalState((prevState) => ({
      ...prevState,
      theme,
    }));
    localStorage.setItem('donorSiteTheme', theme);
  };

  const updateShowSurvey = (showSurvey) => {
    setGlobalState((prevState) => ({
      ...prevState,
      showSurvey,
    }));
    localStorage.setItem('donorShowSurvey', showSurvey);
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
    <AppContext.Provider value={{
      globalState,
      updateUser,
      updateBalance,
      updateShouldFetch,
      updateCurrentPool,
      updateSpecialPool,
      updateCurrentEthPrice,
      updateCurrentTheme,
      updateCurrentLanguage,
      updateCurrentPoolBalance,
      updateSpecialPoolBalance,
      updateShowSurvey
    }}>
      {isThemeReady ? children : null}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
