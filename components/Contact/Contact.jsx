import React from 'react';
import Map from '../Map/Map';
import RightWay from '../../public/assets/svgs/RightWay.svg';
import Tent from '../../public/assets/svgs/tent.svg';
import styles from './Contact.module.scss';
import UiButton from '../UiButton/UiButton';

const Contact = () => {
  return (
    <section className={styles.compWrap}>
      <div className={styles.header}>
        <Tent />
        <h1>CONTACT</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>Location</h2>
          <div className={styles.infoBlock}>
            <p>Dimitrakopoulou 18, Athina 111 41</p>
            <a
              href={'https://goo.gl/maps/UUAgxPJfU8RfGhA18'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              View on map
            </a>
          </div>
          <h2 className={styles.heading}>Telephone</h2>
          <div className={styles.infoBlock}>
            <UiButton>2212212212</UiButton>
          </div>
          <h2 className={styles.heading}>More Info</h2>
          <p>
            Pm on{' '}
            <a
              href={'https://www.instagram.com/circus.strongman.experience/'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              insta
            </a>{' '}
            and ask for more information
          </p>
        </div>
        <div className={styles.mapWrapper}>
          <RightWay />
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
