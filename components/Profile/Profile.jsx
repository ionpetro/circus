import React, { useContext } from 'react';
import Footer from '../Footer/Footer';
import styles from './Profile.module.scss';
import UserContext from '../../contexts/UserContext';
import Cookie from 'js-cookie';
import Router from 'next/router';
import User from '/public/assets/svgs/user.svg';
import Image from 'next/image';
import Records from '../Records/Records';
import EditProfile from '../EditProfile/EditProfile';

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
                {user?.imageUrl ? (
                  <Image
                    layout={'fill'}
                    objectFit={'cover'}
                    alt={'user avatar'}
                    src={user?.imageUrl}
                    onError={() => <User />}
                  />
                ) : (
                  <User />
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
          {/*<Records userId={user?.id} />*/}
          <EditProfile setShowForm={() => {}} />
        </div>
      </div>
      <Footer simple />
    </div>
  );
};

export default Profile;
