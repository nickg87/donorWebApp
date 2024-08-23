import React, {useEffect} from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useAppContext } from '../contexts/AppContext';

const Layout = ({ children }) => {

  const { globalState, updateUser } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    const authenticateUser = async (token) => {
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/secure-data`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Include token
            },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.user.email && data.user.name) {
              updateUser({
                email: data.user.email, // Include other user details if available
                token: token,
                name: data.user.name,
              });
            }
          } else {
            // Token is invalid or expired
            localStorage.removeItem('sessionToken');
            updateUser(null);
          }
        } catch (error) {
          console.error('Error fetching secure data:', error);
          // Handle error, e.g., remove token from localStorage
          localStorage.removeItem('sessionToken');
          updateUser(null);
        }
      }
    };
   if (!globalState.user && token) {
     authenticateUser(token);
   }
  }, [globalState.user]);

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
          <div className="z-20 p-4 md:p-20 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-600 border-opacity-50 max-w-screen-xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
