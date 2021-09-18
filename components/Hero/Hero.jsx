import React from 'react';
import UiButton from '../UiButton/UiButton';
// import Link from 'next/link';
// import LeaderboardIcon from '/public/assets/svgs/leaderboard.svg';
import facilities from '../../public/assets/images/facilities.jpeg';
import styles from './Hero.module.scss';
import Tent from '/public/assets/svgs/tent.svg';
import Image from 'next/image';
import Navbar from '../Navbar/Navbar';

const Hero = () => {
  return (
    <div className={styles.compWrap}>
      <Navbar />
      <Image
        unoptimized
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
          <div className={styles.actions}>
            {/*<Link href={'/leaderboard'}>*/}
            {/*  <UiButton icon={<LeaderboardIcon />}>records</UiButton>*/}
            {/*</Link>*/}
            <div className={styles.button}>
              <a href={'/#contact'}>
                {' '}
                <UiButton icon={<Tent />}>contact</UiButton>
              </a>
            </div>
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
