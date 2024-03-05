import React from 'react';
import Wreath from '../../../public/assets/svgs/wreath.svg';
import Image from 'next/image';
import User from '../../../public/assets/svgs/user.svg';
import { useRouter } from 'next/router';
import styles from './UiAvatar.module.scss';

// size can be small, large, xlarge

const UiAvatar = ({ id, size, imgUrl, isHero }) => {
  const router = useRouter();
  const wreathSize = size ? `wreath${size}` : 'wreathmedium';

  return (
    <div className={styles.compWrap}>
      <div
        className={`${styles.avatar} ${styles[size]} ${isHero && styles.hero}`}
        tabIndex={0}
        role={'button'}
        onClick={id ? () => router.push(`/users/${id}`) : () => { }}
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
      {isHero && (
        <Wreath className={`${styles.wreath} ${styles[wreathSize]}`} />
      )}
    </div>
  );
};

export default UiAvatar;
