// pages/_app.js

import '../styles/globals.css'; // Adjust the path as per your project structure
import Layout from '../components/Layout'; // Example import of layout component
import { AppProvider } from '../contexts/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;