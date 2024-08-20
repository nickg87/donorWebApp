import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (lng) => {
    // Save the current scroll position
    const scrollPosition = window.scrollY;
    i18n.changeLanguage(lng);
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
            src="/flags/ES.svg"  // Replace with your actual path to the Spanish flag
            alt="Switch to Spanish"
            title="Switch to Spanish"
            width={32}
            height={24}
          />
        </button>
      ) : (
        <button onClick={() => changeLanguage('en')} className={'flagWrapper'}>
          <Image
            src="/flags/EN.svg"  // Replace with your actual path to the US flag
            alt="Switch to English"
            title="Switch to English"
            width={32}
            height={24}
          />
        </button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
