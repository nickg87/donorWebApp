import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>DonorHub App - Donations made easy with a bit of luck in the end! | DonorHub App</title>
        <meta name="description" content="Welcome to DonorHub, where donations are made easy. Learn more about our services and how you can contribute."/>
        {/* Other meta tags, stylesheets, etc. */}
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-1 flex-col items-center p-4 md:p-8 lg:p-16 xl:p-24 gradient-bg">
          <div className="relative z-20 p-4 md:p-20 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-600 border-opacity-50 max-w-screen-xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
