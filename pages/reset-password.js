import React from 'react';
import Head from 'next/head';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Circus | Reset Password</title>
      </Head>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
