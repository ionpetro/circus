import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero/Hero';
import History from '../components/History/History';
import Marquee from '../components/Marquee/Marquee';
import Equipment from '../components/Equipment/Equipment';
import Contests from '../components/Contests/Contests';
import Contact from '../components/Contact/Contact';
import Social from '../components/Social/Social';
import instance from '../utils/http-client';
import Error from './_error';
import Personnel from '../components/Personnel/Personnel';
import Footer from '../components/Footer/Footer';
import Seo from '../components/Seo/Seo';
import Topbar from '../components/Topbar/Topbar';

const strapiUrl = process.env.NEXT_PUBLIC_BACKEND;

export default function Home({ cmsData, error }) {
  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <>
      <Head>
        <title>Circus Strongman</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Seo />
      <Topbar news={cmsData.news} />
      <Hero />
      <Marquee />
      <History history={cmsData.history} />
      <Equipment
        description={cmsData.equipmentDescription}
        media={cmsData.galleries}
      />
      <Contests
        description={cmsData.contestsDescription}
        contests={cmsData.contests}
      />
      <Social />
      <Personnel />
      <Contact />
      <Footer hasMarquee={true} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const cmsData = await instance(`${strapiUrl}/home-page`);
    return {
      props: {
        cmsData,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.status || err?.response?.status || 422,
      },
    };
  }
}
