"use client";

// src/components/Header.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isStage = process.env.NEXT_PUBLIC_IS_STAGE === 'true';
  console.log(isStage);

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
          {isStage ? <div>STAGE ENV</div> : null}
        </Link>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
        </div>
        <nav className={`md:flex md:items-center md:gap-4 ${isOpen ? 'block' : 'hidden'}`}>
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
    </header>
  );
};

export default Header;