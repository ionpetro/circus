import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero/Hero';
import History from '../components/History/History';
import Marquee from '../components/Marquee/Marquee';
import Equipment from '../components/Equipment/Equipment';
import Contests from '../components/Contests/Contests';
import Contact from '../components/Contact/Contact';
import Social from '../components/Social/Social';

export default function Home() {
  return (
    <>
      <Head>
        <title>Circus strongman experience</title>
      </Head>
      <Hero />
      <Marquee />
      <History />
      <Equipment />
      <Contests />
      <Social />
      <Contact />
    </>
  );
}
