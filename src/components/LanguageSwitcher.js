// components/LanguageSwitcher.js
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <div style={{ display: 'flex', gap: '0 3px' }}>
      <button style={{ fontWeight: locale === 'en' ? 'bold' : 'normal' }} onClick={() => changeLanguage('en')}>
        English
      </button>
      <button style={{ fontWeight: locale === 'es' ? 'bold' : 'normal' }} onClick={() => changeLanguage('es')}>
        Español
      </button>
    </div>
  );
};

export default LanguageSwitcher;
