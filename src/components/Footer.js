// src/components/Footer.js
import React from 'react';
import Image from 'next/image';
import {useTranslation} from "next-i18next";
import Link from "next/link";
import LogoWhite from "../../public/logos/donorLogoWhiteNew.svg";

const Footer = () => {

  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-[#030A31] text-white py-8 p-4 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; {t('general.copyright')}</p>
          <div style={{display: 'flex'}}>
            <Link href="/toc" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('toc')}
            </Link>
            <Link href="/faq" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('faq')}
            </Link>
            <Link href="/one-million-dollar-pool" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('one-million-dollar-pool')}
            </Link>
          </div>

        </div>
        <div className="flex items-center">
          <Link href="/" passHref>
            {/*<Image*/}
            {/*  src="/logos/donorHubLogo.svg"*/}
            {/*  alt="DonerHub Logo"*/}
            {/*  // className="dark:invert"*/}
            {/*  width={100}*/}
            {/*  height={24}*/}
            {/*  style={{aspectRatio: '120 / 70'}}*/}
            {/*  priority*/}
            {/*/>*/}
            {/*<Image*/}
            {/*  src="/logos/donorLogoWhite.svg"*/}
            {/*  alt="DonerHub Logo"*/}
            {/*  // className="dark:invert"*/}
            {/*  width={100}*/}
            {/*  height={100}*/}
            {/*  priority*/}
            {/*/>*/}
            <LogoWhite  className="w-[160px] h-[30px] md:w-[200px] md:h-[40px] text-white"  />
          </Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
