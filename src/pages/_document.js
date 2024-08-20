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
    return (
      <Html lang={this.props.__NEXT_DATA__.locale}>
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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
