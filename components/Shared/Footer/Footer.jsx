import React from 'react';
import Insta from '/public/assets/svgs/Insta.svg';
import Map from '/public/assets/svgs/Map.svg';
import Phone from '/public/assets/svgs/Phone.svg';
import { instaUrl, mapUrl, phone } from '/utils/links';
import { menuItems } from '../Navbar/Navbar';
import styles from './Footer.module.scss';
import Marquee from '../../Homepage/Marquee/Marquee';

const Footer = ({ hasMarquee, simple = false }) => {
  return (
    <footer>
      {hasMarquee && <Marquee />}
      <div className={styles.compWrap}>
        {!simple && (
          <>
            <h1 className={styles.title}>CIRCUS</h1>
            <span className={styles.subtitle}>strongman experience</span>
            <div className={styles.container}>
              <div className={styles.actions}>
                <a href={instaUrl} target={'_blank'} rel={'noreferrer'}>
                  <Insta />
                </a>
                <a href={mapUrl} target={'_blank'} rel={'noreferrer'}>
                  <Map />
                </a>
                <a href={`tel:${phone}`}>
                  <Phone />
                </a>
              </div>
              <div className={styles.menuItems}>
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={`/#${item.href}`}
                    className={styles.link}
                  >
                    <div className={styles.menuItem}>
                      {item.icon}
                      {item.href}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <hr className={styles.line} />
          </>
        )}
        <div className={styles.legal}>
          <span className={styles.copyWrite}>
            © 2021 Circus. All rights reserved.
          </span>
          <span className={styles.inscription}>
            Developed with ❤️ by a{' '}
            <a
              href={'https://www.youtube.com/user/MrPonzitv'}
              target={'_blank'}
              rel={'noreferrer'}
              className={styles.bored}
            >
              BoredGamers
            </a>{' '}
            <a
              href={'https://www.instagram.com/ionpetro/'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              fan
            </a>
          </span>
        </div>
      </div>
      <div className={styles.end} />
    </footer>
  );
};

export default Footer;
