import React, {useEffect} from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useAppContext } from '../contexts/AppContext';
import MaintenancePage from "./MaintenancePage";
import axios from "axios";
import {themeCustomClass} from "@/utils/helpers";

const Layout = ({ children }) => {

  const { globalState, updateUser } = useAppContext();
  const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';
  // console.log('isDev: ' + isDev);

  // const [isMaintenanceMode, setIsMaintenanceMode] = React.useState(false);
  // useEffect(() => {
  //   const checkMaintenanceMode = async () => {
  //
  //     const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //     try {
  //       const { data } = await axios.get(apiUrl + 'next-api/maintenance');
  //       setIsMaintenanceMode(data.isMaintenanceMode);
  //     } catch (error) {
  //       console.error('Error checking maintenance mode', error);
  //     }
  //   };
  //
  //   checkMaintenanceMode().then();
  // }, []);
  //
  // console.log('isMaintenanceMode in XXXX Layout: ' + isMaintenanceMode);
  //
  // if (isMaintenanceMode) {
  //   return <MaintenancePage />;
  // }

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

  // Change body background color based on theme
  useEffect(() => {
    const rootElement = document.documentElement; // This is the <html> element
    if (globalState.theme === 'dark') {
      document.body.style.backgroundColor = 'var(--darkThemeMainColor)';
      rootElement.style.backgroundColor = 'var(--darkThemeMainColor)';
    } else {
      document.body.style.backgroundColor = 'var(--lightThemeMainColor)';
      rootElement.style.backgroundColor = 'var(--lightThemeMainColor)';
    }
  }, [globalState.theme]);



  return (
    <>
      {/*<div className={['grid-pattern'].join(' ')}></div>*/}
      <div className="absolute" style={{width: '100%', height: '100vh', overflow: 'hidden'}}>
        <div className="grid-container">
          {Array.from({length: 100}, (_, index) => ( // 7 rows * 10 items max = 70 items
            <div key={index} className={['grid-item', globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'].join(' ')}></div>
          ))}
        </div>
      </div>
      <div className={['mainContainer'].join(' ')}>
        <Head>
          <title>DonorHub App - Donations made easy with a bit of luck in the end! | DonorHub App</title>
          <meta name="description"
                content="Welcome to DonorHub, where donations are made easy. Learn more about our services and how you can contribute."/>
          {/* Other meta tags, stylesheets, etc. */}
        </Head>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className={["flex-1", "flex-col", "items-center", "p-4", "md:p-8", "lg:p-16", "xl:p-24"].join(' ')}>
            <div
              className="z-10 p-4 md:p-20 rounded-lg shadow-lg max-w-screen-xl mx-auto">
              {children}
            </div>
          </main>
          <Footer/>
        </div>
      </div>
      <div className="absolute" style={{width: '100%', overflow: 'hidden'}}>
        <div
          className={['top-right-ellipse-gradient', globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'].join(' ')}></div>
        <div
          className={['left-ellipse-gradient', globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'].join(' ')}></div>
      </div>
    </>
  );
};

export default Layout;
