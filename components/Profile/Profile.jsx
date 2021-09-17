import React, { useContext, useState } from 'react';
import Footer from '../Footer/Footer';
import styles from './Profile.module.scss';
import UserContext from '../../contexts/UserContext';
import Cookie from 'js-cookie';
import Router from 'next/router';
import Pencil from '/public/assets/svgs/pencil.svg';
import Records from '../Records/Records';
import EditProfile from '../EditProfile/EditProfile';
import UiAvatar from '../UiAvatar/UiAvatar';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [showRecords, setShowRecords] = useState(true);

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    Router.push('/');
  };

  return (
    <div className={styles.compWrap}>
      <Navbar />

      <div className={styles.center}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <h1>PROFILE</h1>
            <div className={styles.userProfile}>
              <div className={styles.avatarWrapper}>
                <UiAvatar size={'large'} imgUrl={user?.imageUrl} />
                {showRecords && (
                  <div
                    className={styles.editWrapper}
                    onClick={() => setShowRecords(false)}
                  >
                    <Pencil className={styles.edit} />
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <h4>@{user?.username}</h4>
                {!showRecords && (
                  <a className={styles.logout} onClick={logout}>
                    Logout
                  </a>
                )}
              </div>
            </div>
          </div>
          {showRecords ? (
            <Records userId={user?.id} />
          ) : (
            <EditProfile setShowRecords={setShowRecords} />
          )}
        </div>
      </div>
      <Footer simple />
    </div>
  );
};

export default Profile;
