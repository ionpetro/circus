import React from 'react';
import styles from './HypeCard.module.scss';
import Image from 'next/image';
import linesBig from '../../public/assets/images/linesBig.png';

const HypeCard = ({ hype }) => {
  return (
    <div className={styles.compWrap}>
      <div className={`${styles.container} ${styles[hype.color]}`}>
        <div className={styles.border} />
        <div className={styles.content}>
          <div className={styles.backImage}>
            <Image
              unoptimized
              width={'270px'}
              height={'384px'}
              src={hype.imgSrc}
              alt={hype.hype}
            />
          </div>
          <div className={styles.info}>
            {hype.icon}
            <p>{hype.p}</p>
            <h3 className={`uppercase ${styles.hype}`}>{hype.hype}</h3>
          </div>
        </div>
      </div>
      <div
        className={styles.hoverBack}
        style={{ backgroundImage: `url(${linesBig.src}` }}
      />
    </div>
  );
};

export default HypeCard;
