import React from 'react';
import styles from './CircusClassicHosts.module.scss';
import UiAvatar from '/components/UiAvatar/UiAvatar';
import Instagram from '/public/assets/svgs/Insta.svg';

const CircusClassicHosts = () => {
  return (
    <>
      <h4>HOSTS</h4>
      <div className={styles.hosts}>
        <div className={styles.host}>
          <UiAvatar
            imgUrl={
              'https://res.cloudinary.com/ionpetro/image/upload/v1631993055/production/users/12/qvycyp0wgdxcwwynhjac.jpg'
            }
            size={'large'}
          />
          <span className={styles.hostName}>John Boursinos</span>
          <a
            href={'https://www.instagram.com/johnboursi/'}
            target={'_blank'}
            rel={'noreferrer'}
          >
            <Instagram className={styles.svg} />
          </a>
        </div>
        <div className={styles.host}>
          <UiAvatar
            imgUrl={
              'https://res.cloudinary.com/ionpetro/image/upload/v1632069554/production/users/37/fuu5mytk5gqs7o3if1dj.webp'
            }
            size={'large'}
          />
          <span className={styles.hostName}>Paraskeyh Stamatopoulou</span>
          <a
            href={'https://www.instagram.com/paraskevyo/'}
            target={'_blank'}
            rel={'noreferrer'}
          >
            <Instagram className={styles.svg} />
          </a>
        </div>
      </div>
    </>
  );
};

export default CircusClassicHosts;
