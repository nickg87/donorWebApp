// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      ...(await serverSideTranslations(ctx.locale, ['common'])),
    };
  }

  render() {
    // Access the environment variable directly in the render method
    const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
    return (
      <Html lang={this.props.__NEXT_DATA__.locale}>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTagId}');
            `,
            }}
          />
          <link rel="icon" type="image/ico" sizes="32x32" href="/favicons/favicon.ico"/>
          <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
