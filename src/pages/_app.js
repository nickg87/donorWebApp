// src/pages/_app.js
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { AppProvider } from '../contexts/AppContext';
import nextI18NextConfig from '../../next-i18next.config.js';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
