import React from 'react';
import Map from '../Map/Map';
import RightWay from '../../../public/assets/svgs/RightWay.svg';
import Tent from '../../../public/assets/svgs/tent.svg';
import styles from './Contact.module.scss';
import UiButton from '../../Ui/UiButton/UiButton';
import { instaUrl, mapUrl, phone } from '../../../utils/links';

const Contact = () => {
  return (
    <section className={styles.compWrap} id={'contact'}>
      <div className={styles.header}>
        <Tent />
        <h2>CONTACT</h2>
        <p className={styles.description}>Come and join us, today!</p>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3>Location</h3>
          <div className={styles.infoBlock}>
            <p>Olvias 5, Athina 111 42</p>
            <a href={mapUrl} target={'_blank'} rel={'noreferrer'}>
              Open in maps
            </a>
          </div>
          <h3 className={styles.heading}>Telephone</h3>

          <a href={`tel:${phone}`}>
            <div className={styles.infoBlock}>
              <UiButton>{phone}</UiButton>
            </div>
          </a>

          <h3 className={styles.heading}>More Info</h3>
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
