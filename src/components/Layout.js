import React, {useEffect} from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useAppContext } from '../contexts/AppContext';
import MaintenancePage from "./MaintenancePage";
import axios from "axios";
import {themeCustomClass} from "@/utils/helpers";
import LeftEllipseGradientDark from "../../public/images/leftEllipseGradientDark.svg";
import GridEffectComponent from "@/components/UI/GridEffectComponent";
import EllipseGradients from "@/components/UI/EllipseGradients";

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
      rootElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.style.backgroundColor = 'var(--lightThemeMainColor)';
      rootElement.style.backgroundColor = 'var(--lightThemeMainColor)';
      rootElement.removeAttribute('data-theme');
    }
  }, [globalState.theme]);

  return (
    <>
      <GridEffectComponent/>
      <div className={['mainContainer', 'absolute', 'z-2'].join(' ')}>
        <Head>
          <title>DonorHub App - Donations made easy with a bit of luck in the end! | DonorHub App</title>
          <meta name="description"
                content="Discover the top crypto lottery pools with high prize amounts and transparent draws. Join today to win big!"/>
          <meta name="robots" content="index, follow"/>
          {/* Other meta tags, stylesheets, etc. */}
        </Head>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className={["flex-1", "flex-col", "items-center", "p-0", "md:p-4"].join(' ')}>
            <div
              className="z-10 p-4 md:p-8 rounded-lg max-w-screen-xl mx-auto">
              {children}
            </div>
          </main>
          <Footer/>
        </div>
      </div>
      <EllipseGradients/>
    </>
  );
};

export default Layout;
