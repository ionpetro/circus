import React from 'react';
import Head from 'next/head';
import structuredData from '../../utils/structured-data';

const Seo = () => {
  return (
    <Head>
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

      <meta name="twitter:site" content="https://www.circus-strongman.com" />

      <meta name="twitter:creator" content="@ionpetropoulos" />
      <script
        key={`gymJSON`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default Seo;
