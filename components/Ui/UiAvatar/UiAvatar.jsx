import React from 'react';
import styles from './UiAvatar.module.scss';
import Image from 'next/image';
import User from '../../../public/assets/svgs/user.svg';

// size can be small, large

const UiAvatar = ({ size, imgUrl }) => {
  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {imgUrl ? (
        <Image
          unoptimized
          layout={'fill'}
          objectFit={'cover'}
          alt={'user avatar'}
          src={imgUrl}
          onError={() => <User />}
        />
      ) : (
        <User />
      )}
    </div>
  );
};

export default UiAvatar;