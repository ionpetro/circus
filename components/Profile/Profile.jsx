import React, { useContext } from 'react';
import Footer from '../Footer/Footer';
import styles from './Profile.module.scss';
import UserContext from '../../contexts/UserContext';
import Cookie from 'js-cookie';
import Router from 'next/router';
import User from '/public/assets/svgs/user.svg';
import Records from '../Records/Records';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    Router.push('/');
  };

  return (
    <div className={styles.compWrap}>
      <div className={styles.center}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <h1>PROFILE</h1>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <User />
              </div>
              <div className={styles.userInfo}>
                <h4>@{user?.username}</h4>
                <a className={styles.logout} onClick={logout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
          <Records userId={user?.id} />
        </div>
      </div>
      <Footer simple />
    </div>
  );
};

export default Profile;
