import React from 'react';
import Image from 'next/image';
import Footer from '../../Shared/Footer/Footer';
import styles from './CircusClassic2.module.scss';
import CircusClassicAbout from './CircusClassicAbout/CircusClassicAbout';
import CircusClassicHosts from './CircusClassicHosts/CircusClassicHosts';
import CircusClassicHeader from './CircusClassicHeader/CircusClassicHeader';
import CircusClassicResults from './CircusClassicResults/CircusClassicResults';
import Navbar from '../../Shared/Navbar/Navbar';

const CircusClassic2 = () => {
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
              'https://res.cloudinary.com/ionpetro/image/upload/v1662239923/production/assets/295530316_10225886513343701_4866315061951243281_n_mjeuvw.jpg'
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

export default CircusClassic2;
