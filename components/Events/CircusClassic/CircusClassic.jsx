import React from 'react';
import Image from 'next/image';
import Footer from '../../Shared/Footer/Footer';
import styles from './CircusClassic.module.scss';
import CircusClassicAbout from './CircusClassicAbout/CircusClassicAbout';
import CircusClassicHosts from './CircusClassicHosts/CircusClassicHosts';
import CircusClassicHeader from './CircusClassicHeader/CircusClassicHeader';
import CircusClassicResults from './CircusClassicResults/CircusClassicResults';
import Navbar from '../../Shared/Navbar/Navbar';

const CircusClassic = () => {
  return (
    <div className={styles.compWrap}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div>
        <div className={styles.image}>
          <div className={styles.filter} />
          <Image
            unoptimized
            layout={'fill'}
            objectFit={'cover'}
            alt={'contest image'}
            src={
              'https://res.cloudinary.com/ionpetro/image/upload/v1631822417/production/assets/240845733_812512286078690_3538823464416521435_n_8151c737bc_85fdd99368.jpg'
            }
          />
        </div>
        <div className={styles.header}>
          <CircusClassicHeader />
        </div>
        <div className={styles.contentWrapper} id={'about'}>
          <div className={styles.content}>
            <CircusClassicAbout />
          </div>
          <div className={styles.content} id={'hosts'}>
            <CircusClassicHosts />
          </div>
          <div className={styles.content} id={'results'}>
            <CircusClassicResults />
          </div>
          <div className={styles.content} id={'aftermovie'}>
            <h4>AFTERMOVIE</h4>
            <div className={styles.empty}>
              The aftermovie will be uploaded after the event
            </div>
          </div>
          <div className={styles.content} id={'photos'}>
            <h4>PHOTO GALLERY</h4>
            <div className={styles.empty}>
              The photo gallery will be uploaded after the event
            </div>
          </div>
        </div>
      </div>
      <Footer simple={true} />
    </div>
  );
};

export default CircusClassic;
