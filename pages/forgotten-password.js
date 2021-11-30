import React from 'react';
import Head from 'next/head';
import ForgottenPassword from '../components/ForgottenPassword/ForgottenPassword';

const ForgottenPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Circus | Forgotten Password</title>
      </Head>
      <ForgottenPassword />
    </>
  );
};

export default ForgottenPasswordPage;
