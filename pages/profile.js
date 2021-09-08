import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../components/Profile/Profile';
import Auth from '../components/Auth/Auth';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <Profile />
    </div>
  );
};

export default Auth(ProfilePage);
