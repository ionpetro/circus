import React, { useContext, useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import styles from './Profile.module.scss';
import UserContext from '../../contexts/UserContext';
import Cookie from 'js-cookie';
import Router from 'next/router';
import Pencil from '/public/assets/svgs/pencil.svg';
import Records from './Records/Records';
import EditProfile from './EditProfile/EditProfile';
import UiAvatar from '../Ui/UiAvatar/UiAvatar';
import Navbar from '../Shared/Navbar/Navbar';
import pages from '../../utils/profile-pages';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(pages.PROGRAM);

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
                {page !== pages.USER && (
                  <div
                    className={styles.editWrapper}
                    onClick={() => setPage(pages.USER)}
                  >
                    <Pencil className={styles.edit} />
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <h4>@{user?.username}</h4>
                <a className={styles.logout} onClick={logout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div>
            {page !== pages.USER && (
              <div className={styles.tabs}>
                <h3
                  className={`${styles.tab} ${
                    page === pages.PROGRAM && styles.activeTab
                  }`}
                  onClick={() => {
                    setPage(pages.PROGRAM);
                  }}
                >
                  Program
                </h3>
                <h3
                  className={`${styles.tab} ${
                    page === pages.RECORDS && styles.activeTab
                  }`}
                  onClick={() => {
                    setPage(pages.RECORDS);
                  }}
                >
                  Records
                </h3>
              </div>
            )}
            {page === pages.RECORDS && <Records userId={user?.id} />}
            {page === pages.PROGRAM && <div />}
            {page === pages.USER && <EditProfile setPage={setPage} />}
          </div>
        </div>
      </div>
      <Footer simple />
    </div>
  );
};

export default Profile;
