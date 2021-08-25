import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <link
            rel={'shortcut icon'}
            href={
              'https://res.cloudinary.com/ionpetro/image/upload/v1627764951/circus_lsu3u9.png'
            }
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,400&display=swap"
            rel="stylesheet"
          />
          <link rel="canonical" href="https://www.circus-strongman.com" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
