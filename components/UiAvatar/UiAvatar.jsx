import React, { useContext } from 'react';
import styles from './UiAvatar.module.scss';
import Image from 'next/image';
import User from '../../public/assets/svgs/user.svg';
import UserContext from '../../contexts/UserContext';

const UiAvatar = ({ size }) => {
  const { user } = useContext(UserContext);

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
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
  );
};

export default UiAvatar;
