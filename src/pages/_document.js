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
          <script data-name="BMC-Widget" data-cfasync="false"
                  src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="donorhubapp"
                  data-description="Support me on Buy me a coffee!" data-message="💖 Support the effort :)"
                  data-color="#9766FF" data-position="Right" data-x_margin="22" data-y_margin="22"></script>
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
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
