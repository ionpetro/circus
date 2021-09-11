import React from 'react';
import Profile from '../components/Profile/Profile';
import Auth from '../components/Auth/Auth';

const ProfilePage = () => {
  return <Profile />;
};

export default Auth(ProfilePage);
