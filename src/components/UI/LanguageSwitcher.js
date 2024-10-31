import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import {useAppContext} from "@/contexts/AppContext";

const LanguageSwitcher = () => {
  const { globalState, updateCurrentLanguage } = useAppContext();
  const { i18n } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (lng) => {
    // Save the current scroll position
    const scrollPosition = window.scrollY;
    i18n.changeLanguage(lng);
    updateCurrentLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng }).then(() => {
      // Restore the scroll position after navigation
      window.scrollTo(0, scrollPosition);
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {locale === 'en' ? (
        <button onClick={() => changeLanguage('es')} className={'flagWrapper'}>
          <Image
            src="/flags/en-circle.svg"  // Replace with your actual path to the Spanish flag
            alt="Switch to Spanish"
            title="Switch to Spanish"
            width={26}
            height={24}
          />
        </button>
      ) : (
        <button onClick={() => changeLanguage('en')} className={'flagWrapper'}>
          <Image
            src="/flags/es-circle.svg"  // Replace with your actual path to the US flag
            alt="Switch to English"
            title="Switch to English"
            width={26}
            height={24}
          />
        </button>
      )}
      {locale.toUpperCase()}
    </div>
  );
};

export default LanguageSwitcher;
