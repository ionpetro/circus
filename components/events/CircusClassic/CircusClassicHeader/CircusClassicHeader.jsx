import React from 'react';
import styles from './CircusClassicHeader.module.scss';
import Map from '/public/assets/svgs/Map.svg';
import User from '/public/assets/svgs/user.svg';
import Facebook from '/public/assets/svgs/facebook.svg';

const CircusClassicHeader = () => {
  return (
    <>
      <span className={styles.date}>
        Saturday September 25 | 26 2021 11:00 AM
      </span>
      <h3 className={styles.title}>Circus Classic - Strongman Event</h3>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <Map className={styles.svg} />
          <span>Porto Rafti</span>
        </div>
        <div className={styles.infoItem}>
          <User className={styles.svg} />
          <span>70 Going</span>
        </div>
        <div className={styles.infoItem}>
          <Facebook className={styles.svg} />
          <span>
            <a
              href={'https://www.facebook.com/events/2954728121467673/'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              {' '}
              event
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default CircusClassicHeader;
