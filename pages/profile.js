import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Cookie from 'js-cookie';
import Router from 'next/router';
import Navbar from '../components/Navbar/Navbar';

const ProfilePage = () => {
  const { setUser } = useContext(UserContext);

  // TODO: fix
  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    Router.push('login');
  };

  return (
    <div>
      <Navbar />
      <button onClick={logout}>logout</button>{' '}
    </div>
  );
};

export default ProfilePage;
