import React from 'react';
import UserDashboard from './UserDashboard/UserDashboard';
import styles from './User.module.scss';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import UiAvatar from '../Ui/UiAvatar/UiAvatar';
import Image from 'next/image';

const User = ({ user }) => {
  const date = new Date(user.created_at);

  return (
    <div className={styles.compWrap}>
      <div>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.header}>
          {' '}
          <Image
            unoptimized
            alt={'navbar background overlay'}
            src={'/assets/svgs/userBack.svg'}
            layout={'fill'}
            objectFit={'cover'}
            objectPosition={'center'}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <UiAvatar
              imgUrl={user.imageUrl}
              size={'xlarge'}
              isHero={user.vip}
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.fullName}>
              {user.firstname && user.lastname
                ? `${user.firstname} ${user.lastname}`
                : 'Strongman wannabe'}
            </div>
            <div className={styles.info}>
              @{user.username} • Joined{' '}
              {`${date.toLocaleString('default', {
                month: 'long',
              })} ${date.getFullYear()}`}
            </div>
          </div>
          <div className={styles.body}>
            <UserDashboard
              user={user}
              possessive={`${user.username}'s`}
            />
          </div>
        </div>
      </div>
      <Footer simple={true} />
    </div>
  );
};

export default User;
