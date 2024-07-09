// src/components/Footer.js
import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 shadow-md w-full">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; 2024 My DonorHub App. All rights reserved.</p>
          <p className="text-sm mt-2">Contact: info@myapp.com</p>
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
