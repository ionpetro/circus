import React from 'react';
import Profile from '../components/Profile/Profile';
import Auth from '../components/Shared/Auth/Auth';
import Head from 'next/head';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Circus | Profile</title>
      </Head>
      <Profile />
    </>
  );
};

export default Auth(ProfilePage);
