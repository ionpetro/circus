import React from 'react';
import UiButton from '../UiButton/UiButton';
import image from '../../public/assets/images/hero.png';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div
      className={styles.compWrap}
      style={{ backgroundImage: `url(${image.src})` }}
    >
      <div className={styles.transition} />
      <div className={styles.info}>
        <h1 className={styles.heading}>CIRCUS</h1>
        <span className={`uppercase ${styles.subheading}`}>
          Strongman Experience
        </span>
        <UiButton>contact us</UiButton>
      </div>
    </div>
  );
};

export default Hero;
