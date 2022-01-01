import Document, { Html, Head, Main, NextScript } from "next/document";
import Fonts from "../styles/Theme/fonts";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/MonoLisa-Bold.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/MonoLisa-Bold.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/MonoLisa-Regular.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/MonoLisa-Regular.woff"
            as="font"
            crossOrigin=""
          />
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
