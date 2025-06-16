import Document, { Html, Head, Main, NextScript } from "next/document";
import Fonts from "../styles/Theme/fonts";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
          
          {/* Fonts */}
          <link
            rel="preload"
            href="/fonts/MonoLisa-Bold.otf"
            as="font"
            type="font/otf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/MonoLisa-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/MonoLisa-Regular.otf"
            as="font"
            type="font/otf"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/MonoLisa-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          
          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="//intripid.com" />
          <link rel="dns-prefetch" href="//github.com" />
          <link rel="dns-prefetch" href="//linkedin.com" />
          <link rel="dns-prefetch" href="//dribbble.com" />
          <link rel="dns-prefetch" href="//behance.net" />
          <link rel="dns-prefetch" href="//x.com" />
        </Head>
        <body>
          <Fonts />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
