// src/pages/_app.js
import '../styles/globals.scss'; // Import global styles
import { AppProvider } from '@/contexts/AppContext'; // Adjust path as needed
import Web3ModalProvider from '@/utils/web3context'; // Adjust path as needed
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config.js';
import Layout from '../components/Layout'; // Adjust path as needed

function MyApp({ Component, pageProps }) {
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
