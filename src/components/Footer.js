// src/components/Footer.js
import React from 'react';
import Image from 'next/image';
import {useTranslation} from "next-i18next";
import Link from "next/link";

const Footer = () => {

  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white p-4 shadow-md w-full">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; {t('general.copyright')}</p>
          <div style={{display: 'flex'}}>
            <Link href="/toc" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('toc')}
            </Link>
            <Link href="/faq" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('faq')}
            </Link>
          </div>

        </div>
        <div className="flex items-center">
          <Link href="/" passHref>
            By{" "}
            <Image
              src="/donorHubLogo.svg"
              alt="DonerHub Logo"
              className="dark:invert"
              width={100}
              height={24}
              style={{aspectRatio: '120 / 70'}}
              priority
            />
          </Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
