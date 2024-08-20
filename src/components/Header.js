import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";
import SignInModal from "@/components/SignInModal";
import AuthModal from "@/components/AuthModal";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from 'next-i18next'; // Fixed import
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { globalState, updateUser } = useAppContext();
  const [session, setSession] = useState(globalState.user || null);

  useEffect(() => {
    // This ensures that the language is correctly set client-side after hydration
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(i18n.language).then();
    }
  }, []);

  useEffect(() => {
    console.log('Locale:', i18n.language);
  }, []);

  useEffect(() => {
    setSession(globalState.user);
  }, [globalState.user]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <h1 className="hidden md:block text-3xl font-bold mr-2">DonorHub</h1>
            <Image
              src="/donorHubLogo.svg"
              alt="DonorHub Logo"
              style={{aspectRatio: '120 / 70'}}
              width={100}
              height={24}
              priority
            />
          </div>
        </Link>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
        </div>
        <nav className={`md:flex md:items-center md:gap-4 ${isOpen ? 'block' : 'hidden'}`}>
          {session ? (
            <div>
              <span>{t('welcome')}, {session.name}</span> {/* Example usage of translation */}
              <span> | </span>
              <button onClick={signOut}>{t('signOut')}</button>
            </div>
          ) : (
            <button onClick={() => setShowModal(true)}>{t('signIn')}</button>
          )}
          <Link href="/contact" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-300">
            {t('contact')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;
