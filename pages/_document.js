import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
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
          <meta
            name={'description'}
            content={
              'The official circus strongman experience website. See our equipment, meet our personnel and come join us to become the next monster'
            }
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="CIRCUS STRONGMAN EXPERIENCE" />
          <meta
            property="og:description"
            content="The official circus strongman experience website. See our equipment, meet our personnel and come join us to become the next monster"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/ionpetro/image/upload/v1629745325/Screenshot_2021-08-23_at_10.01.34_PM_ljmttl.png"
          />
          <meta property="og:url" content="https://www.circus-strongman.com" />
          <meta property="og:site_name" content="CIRCUS STRONGMAN EXPERIENCE" />
          <meta name="twitter:title" content="CIRCUS STRONGMAN EXPERIENCE" />
          <meta
            name="twitter:description"
            content="The official circus strongman experience website. See our equipment, meet our personnel and come join us to become the next monster"
          />

          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/ionpetro/image/upload/v1629745325/Screenshot_2021-08-23_at_10.01.34_PM_ljmttl.png"
          />

          <meta
            name="twitter:site"
            content="https://www.circus-strongman.com"
          />

          <meta name="twitter:creator" content="@ionpetropoulos" />
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
