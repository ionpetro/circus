import React from 'react';
import Head from 'next/head';
import Hero from '../components/Homepage/Hero/Hero';
import History from '../components/Homepage/History/History';
import Marquee from '../components/Homepage/Marquee/Marquee';
import Equipment from '../components/Homepage/Equipment/Equipment';
import Contests from '../components/Homepage/Contests/Contests';
import Contact from '../components/Homepage/Contact/Contact';
import Social from '../components/Homepage/Social/Social';
import instance from '../utils/http-client';
import Error from './_error';
import Personnel from '../components/Homepage/Personnel/Personnel';
import Footer from '../components/Shared/Footer/Footer';
import Seo from '../components/Shared/Seo/Seo';
import Topbar from '../components/Homepage/Topbar/Topbar';
import ProgramInfo from '../components/Homepage/ProgramInfo/ProgramInfo';

const strapiUrl = process.env.NEXT_PUBLIC_BACKEND;

export default function Home({ cmsData, slots, error }) {
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
      <ProgramInfo slots={slots} />
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
    const slots = await instance(`${strapiUrl}/slots?_sort=created_at`);
    return {
      props: {
        cmsData,
        slots,
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
