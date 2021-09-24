import React from 'react';
import Head from 'next/head';
import CircusClassic from '../../components/events/CircusClassic/CircusClassic';

const CircusClassicPage = () => {
  return (
    <>
      <Head>
        <title>Circus Classic</title>
      </Head>
      <CircusClassic />
    </>
  );
};

export default CircusClassicPage;
