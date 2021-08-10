import React from 'react';
import UiButton from '../UiButton/UiButton';
import facilities from '../../public/assets/images/facilities.jpg';
import styles from './Hero.module.scss';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className={styles.compWrap}>
      <Image
        alt={'facilities'}
        className={styles.image}
        src={facilities.src}
        layout={'fill'}
        objectFit={'cover'}
        objectPosition={'center'}
      />
      <div className={styles.filter} />
      <div className={styles.transition} />
      <div className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.heading}>CIRCUS</h1>
          <span className={`uppercase ${styles.subheading}`}>
            Strongman Experience
          </span>
          <UiButton>contact us</UiButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
