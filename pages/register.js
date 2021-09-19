import React from 'react';
import Register from '../components/Register/Register';
import Head from 'next/head';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Circus | Login</title>
      </Head>
      <Register />
    </>
  );
};

export default RegisterPage;
