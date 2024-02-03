import React from 'react';
import UiButton from '../../Ui/UiButton/UiButton';
import Link from 'next/link';
import LeaderboardIcon from '/public/assets/svgs/leaderboard.svg';
import facilities from '../../../public/assets/images/facilities-new.jpg';
import styles from './Hero.module.scss';
import WreathSmall from '/public/assets/svgs/wreath-small.svg';
import Image from 'next/image';
import Navbar from '../../Shared/Navbar/Navbar';

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
          <div className={styles.actions}>
            <Link href={'/heroes'}>
              <UiButton icon={<WreathSmall />}>heroes</UiButton>
            </Link>
            <Link href={'/leaderboard'}>
              <UiButton icon={<LeaderboardIcon />}>records</UiButton>
            </Link>
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
