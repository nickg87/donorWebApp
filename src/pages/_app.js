// pages/_app.js

import '../styles/globals.css'; // Adjust the path as per your project structure
import Layout from '../components/Layout'; // Example import of layout component

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;