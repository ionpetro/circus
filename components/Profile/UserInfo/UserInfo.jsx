import React, { useContext } from 'react';
import UiAvatar from '../../Ui/UiAvatar/UiAvatar';
import pages from '../../../utils/profile-pages';
import Pencil from '../../../public/assets/svgs/pencil.svg';
import UserContext from '../../../contexts/UserContext';

import Router from 'next/router';
import styles from './UserInfo.module.scss';

const UserInfo = ({ page, setPage }) => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser(null);
    Router.push('/');
  };

  return (
    <div className={styles.userProfile}>
      <div className={styles.avatarWrapper}>
        <UiAvatar size={'large'} imgUrl={user?.imageUrl} isHero={user?.vip} />
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
        <div>
          <h4>@{user?.username}</h4>
          <div className={`${styles.plan} ${styles[user?.plan]}`}>
            {user?.plan} <span className={styles.mobileOnly}>plan</span>
          </div>
        </div>
        <a className={styles.logout} onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default UserInfo;
