import React from 'react';
import Map from '../Map/Map';
import RightWay from '../../public/assets/svgs/RightWay.svg';
import Tent from '../../public/assets/svgs/tent.svg';
import styles from './Contact.module.scss';
import UiButton from '../UiButton/UiButton';
import { instaUrl, mapUrl, phone } from '../../utils/links';

const Contact = () => {
  return (
    <section className={styles.compWrap} id={'contact'}>
      <div className={styles.header}>
        <Tent />
        <h1>contact</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>Location</h2>
          <div className={styles.infoBlock}>
            <p>Dimitrakopoulou 18, Athina 111 41</p>
            <a href={mapUrl} target={'_blank'} rel={'noreferrer'}>
              Open in maps
            </a>
          </div>
          <h2 className={styles.heading}>Telephone</h2>

          <a href={`tel:${phone}`}>
            <div className={styles.infoBlock}>
              <UiButton>{phone}</UiButton>
            </div>
          </a>

          <h2 className={styles.heading}>More Info</h2>
          <p>
            Pm on{' '}
            <a href={instaUrl} target={'_blank'} rel={'noreferrer'}>
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
