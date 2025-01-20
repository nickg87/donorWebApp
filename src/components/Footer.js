// src/components/Footer.js
import React from 'react';
import Image from 'next/image';
import {useTranslation} from "next-i18next";
import Link from "next/link";
//import LogoWhite from "../../public/logos/donorLogoWhiteNew.svg";
import LogoWhite from "../../public/logos/luckyHubLogoWhite.svg";
import EmailSubscriptionComponent from "@/components/EmailSubscriptionComponent";

const Footer = () => {

  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-[#030A31] text-white py-8 p-4 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-center">
        <EmailSubscriptionComponent/>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-center">
        <div className="md:justify-start flex flex-col gap-2">
          <p className="text-sm text-center md:text-left">&copy; {t('general.copyright')}</p>
          <div
            className="flex gap-1 md:gap-4 items-center justify-evenly flex-col md:flex-row md:justify-between md:items-center text-center md:text-left">
            <Link href="/toc" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('toc.linkText')}
            </Link>
            <Link href="/privacy" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('privacy.linkText')}
            </Link>
            <Link href="/faq" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('faq.linkText')}
            </Link>
            <Link href="/blog" className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('blog.linkText')}
            </Link>
            <Link href="/one-million-dollar-pool"
                  className="block mt-4 md:inline-block md:mt-0 pr-2 text-white hover:text-gray-300">
              {t('one-million-dollar-pool')}
            </Link>
          </div>

        </div>
        <div className="flex my-2 items-center">
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
            <LogoWhite className="w-[160px] h-[30px] md:w-[200px] md:h-[40px] text-white"/>
          </Link>

        </div>
      </div>
    </footer>
);
};

export default Footer;
