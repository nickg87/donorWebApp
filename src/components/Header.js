"use client";

// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";
import SignInModal from "@/components/SignInModal";
import AuthModal from "@/components/AuthModal";
import { useAppContext } from "@/contexts/AppContext"; // Adjust the import path as needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { globalState, updateUser } = useAppContext();
  const [session, setSession] = useState(globalState.user || null);
  console.log(globalState);

  useEffect(() => {
    setSession(globalState.user);
  }, [globalState.user]);

  const isStage = process.env.NEXT_PUBLIC_IS_STAGE === 'true';
  //console.log(isStage);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const fetchSecureData = async () => {
    if (!session?.token) {
      console.log('No token available');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/secure-data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.token}`, // Include token
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch secure data');
      }

      const data = await res.json();
      console.log('Secure data:', data);
      // Process the secure data as needed
    } catch (error) {
      console.error('Error fetching secure data:', error);
    }
  };

  const signOut = () => {
    // Handle sign out logic
    setSession(null);
    updateUser(null); // Optionally update context
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
          {isStage ? <div>STAGE ENV</div> : null}
        </Link>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
        </div>

        <nav className={`md:flex md:items-center md:gap-4 ${isOpen ? 'block' : 'hidden'}`}>
          {session ? (
            <div>
              <span>Welcome, {session.name}</span>
              <span> | </span>
              <button onClick={signOut}>Sign Out</button>
              <span> | </span>
              <button onClick={() => fetchSecureData()}>Check</button>
            </div>
          ) : (
            <button onClick={() => setShowModal(true)}>Sign In</button>
          )}
          <Link href="/contact" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-300">
            Contact
          </Link>
          <Link href="/toc" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-300">
            ToC
          </Link>
          <Link href="/faq" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-300">
            FAQ
          </Link>
        </nav>
      </div>
      {/*<SignInModal showModal={showModal} setShowModal={setShowModal} />*/}
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;