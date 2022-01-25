import React from 'react';
import styles from './UiAvatar.module.scss';
import Image from 'next/image';
import User from '../../../public/assets/svgs/user.svg';
import { useRouter } from 'next/router';

// size can be small, large, xlarge

const UiAvatar = ({ id, size, imgUrl }) => {
  const router = useRouter();

  return (
    <div
      className={`${styles.avatar} ${styles[size]}`}
      tabIndex={0}
      role={'button'}
      onClick={id ? () => router.push(`/users/${id}`) : () => {}}
    >
      {imgUrl ? (
        <Image
          unoptimized
          layout={'fill'}
          objectFit={'cover'}
          alt={'user avatar'}
          // resize image with cloudinary
          src={imgUrl.replace('upload', 'upload/w_200,c_scale')}
          onError={() => <User />}
        />
      ) : (
        <User />
      )}
    </div>
  );
};

export default UiAvatar;
