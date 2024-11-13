// Custom404.js (404 page component)
import React from 'react';
import classes from "./General.module.scss";
import { useAppContext } from "@/contexts/AppContext";
import ButtonWrapper from "@/components/UI/ButtonWrapper";
import { useTranslation } from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Custom404 = () => {
  const { globalState } = useAppContext();
  const { t } = useTranslation(); // Load translations for both common and errorPage

  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
      <div
        className={`p-8 rounded-[30px] ${classes.contentWrapper} ${classes[globalState?.theme]} border backdrop-blur-md ${globalState?.theme === 'dark' ? 'border-darkBorder bg-[#030A31] bg-opacity-80 shadow-darkTheme' : 'border-lightBorder bg-white/54 shadow-lightTheme'}`}>
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl mb-6">{t('errorPage.primaryText')}</p>
        <p className="text-lg mb-6">{t('errorPage.secondaryText')}</p>
        <a href="/" className="inline-block py-3 px-6 rounded-lg transition duration-300">
          <ButtonWrapper theme={'dark'} extra={'h-[50px] w-[186px]'}>{t('errorPage.buttonText')}</ButtonWrapper>
        </a>
      </div>
    </div>
  );
};

export default Custom404;

// Add getStaticProps for static generation of translations
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Loading common and errorPage namespaces
    },
  };
}