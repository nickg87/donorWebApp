// src/pages/_app.js
import '../styles/globals.css'; // Import global styles
import { AppProvider } from '@/contexts/AppContext'; // Adjust path as needed
import Web3ModalProvider from '@/utils/web3context'; // Adjust path as needed
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config.js';
import Layout from '../components/Layout'; // Adjust path as needed
import MaintenancePage from './maintenance'; // Import maintenance page

function MyApp({ Component, pageProps }) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <Web3ModalProvider>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </Web3ModalProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
