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
import Error from 'next/error';
import Navbar from '../components/Navbar/Navbar';

const strapiUrl = process.env.NEXT_PUBLIC_BACKEND;

export default function Home({ cmsData, error }) {
  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <>
      <Head>
        <title>Circus strongman experience</title>
      </Head>
      <Navbar />
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
      <Contact />
    </>
  );
}

export async function getStaticProps() {
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
