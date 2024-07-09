import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex-col items-center p-8 md:p-24 gradient-bg">
        <div className="relative z-20 p-4 md:p-20 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-600 border-opacity-50 max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
