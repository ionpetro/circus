import React from 'react';
import UiButton from '../UiButton/UiButton';
import facilities from '../../public/assets/images/facilities.jpeg';
import styles from './Hero.module.scss';
import Image from 'next/image';
import Navbar from '../Navbar/Navbar';

const Hero = () => {
  return (
    <div className={styles.compWrap}>
      <Navbar />
      <Image
        alt={'facilities'}
        src={facilities.src}
        layout={'fill'}
        objectFit={'cover'}
        objectPosition={'center'}
      />
      <div className={styles.filter} />
      <div className={styles.transition} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.button}>
            <a href={'/#contact'}>
              {' '}
              <UiButton>contact us</UiButton>
            </a>
          </div>
          <span className={`uppercase ${styles.subheading}`}>
            Strongman Experience
          </span>
          <h1 className={styles.heading}>
            <span>C</span>
            <span>I</span>
            <span>R</span>
            <span>C</span>
            <span>U</span>
            <span>S</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
