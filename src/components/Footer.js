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
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
