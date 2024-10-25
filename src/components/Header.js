import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";
import SignInModal from "@/components/SignInModal";
import AuthModal from "@/components/AuthModal";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from 'next-i18next'; // Fixed import
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {fetchCurrentPool} from "@/utils/helpers";
import ProfileCircle from '../../public/iconsax/profile-circle.svg';
import axios from "axios";
import ButtonWrapper from "@/components/UI/ButtonWrapper";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { globalState, updateUser, updateCurrentPool, updateCurrentTheme } = useAppContext();
  const [session, setSession] = useState(globalState.user || null);
  const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0); // Update state based on scroll position
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    // This ensures that the language is correctly set client-side after hydration
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(i18n.language).then();
    }
  }, []);

  useEffect(() => {
    if (isDev) console.log('Locale:', i18n.language);
  }, []);

  useEffect(() => {
    setSession(globalState.user);
  }, [globalState.user]);

  useEffect(() => {
    const getCurrentPool = async () => {
        const data = await fetchCurrentPool();
        if (data.id) {
          updateCurrentPool(data);
        }
    };
    if (!globalState.currentPool) {
      getCurrentPool();
    }
  }, [globalState.currentPool]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`p-4 w-full sticky top-0 z-[9] transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/10 shadow-lg' : 'bg-transparent'} ${globalState?.theme === 'dark' ? 'text-white shadow-gray-900' : 'text-black shadow-gray-200'}`}>
      <div className="container mx-auto max-w-7xl flex justify-between items-center p-4">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image
              src={globalState?.theme === 'dark' ? "/logos/donorLogoWhiteNew.svg" : "/logos/donorLogoBlackNew.svg"}
              alt="DonorHub Logo"
              width={220}
              height={50}
              priority
            />
            {/*<h1 className="hidden md:block text-3xl font-bold mr-2">DonorHub</h1>*/}
          </div>
        </Link>

        <div className="md:hidden z-50 " onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
        </div>

        <nav
          className={`absolute left-0 w-full bg-gray-800 p-4 md:p-0 md:bg-transparent md:static  md:flex md:items-center md:justify-end md:gap-4 md:ml-auto transition-all duration-300 ease-in-out ${
            isOpen ? 'block ' : 'hidden'
          }`}
          style={{zIndex: isOpen ? 40 : 'auto'}}
        >
          <LanguageSwitcher/>
          {session ? (
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="text-white">{t('welcome')}, {session.name}</span>
              <span className="text-inherit mx-2">|</span>
              <button className="text-inherit hover:text-gray-300" onClick={signOut}>
                {t('signOut')}
              </button>
            </div>
          ) : (
            <button className="flex gap-2 items-center text-center justify-center align-center text-inherit"
                    onClick={() => setShowModal(true)}>

              <ProfileCircle className={`w-6 h-6 ${globalState?.theme === 'dark' ? 'text-white' : 'text-black'}`}
                             width={24} stroke={'red'} alt="Sign in" title="Sign in"/>
              {t('signIn')}
            </button>
          )}
          <Link href="/contact" className="block mt-4 md:inline-block md:mt-0 text-inherit hover:text-gray-300">
            <ButtonWrapper>
              {t('contact')}
            </ButtonWrapper>
          </Link>

          <ThemeSwitcher/>
        </nav>
      </div>

      <AuthModal showModal={showModal} setShowModal={setShowModal}/>
    </header>
  );
};

export default Header;
