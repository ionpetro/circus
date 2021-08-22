import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import Circus from '../../public/assets/svgs/Circus.svg';
import Link from 'next/link';
import Image from 'next/image';
import navBack from '../../public/assets/svgs/navBack.svg';
import Stars from '../../public/assets/svgs/stars.svg';
import Tent from '../../public/assets/svgs/tent.svg';
import Clawn from '../../public/assets/svgs/Clawn.svg';
import Dumbbell from '../../public/assets/svgs/dumbbell.svg';
import Banner from '../../public/assets/svgs/banner.svg';
import Tickets from '../../public/assets/svgs/Tickets.svg';
import { instaUrl, mapUrl } from '../../utils/links';

export const menuItems = [
  { href: 'history', icon: <Banner />, direction: 'left' },
  { href: 'equipment', icon: <Dumbbell />, direction: 'right' },
  { href: 'contests', icon: <Tickets />, direction: 'left' },
  { href: 'social', icon: <Stars />, direction: 'right' },
  { href: 'personnel', icon: <Clawn />, direction: 'left' },
  { href: 'contact', icon: <Tent />, direction: 'right' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    open
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [open]);

  return (
    <div className={styles.compWrap}>
      <Link href={'/'}>
        <a className={styles.logoLink}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <Circus />
            </div>
            <h3 className={styles.logoName}>CIRCUS</h3>
          </div>
        </a>
      </Link>
      <div className={styles.menu} onClick={() => setOpen(!open)}>
        <span className={open ? styles.isOpen : null} />
      </div>
      <div
        className={
          open
            ? `${styles.container} ${styles.containerActive}`
            : styles.container
        }
      >
        <Image
          alt={navBack.Alt}
          src={'/assets/svgs/navBack.svg'}
          layout={'fill'}
          objectFit={'cover'}
          objectPosition={'center'}
        />
        <ul className={styles.sections}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                onClick={() => setOpen(false)}
                href={`#${item.href}`}
                className={styles[item.direction]}
              >
                {item.icon}
                <span className={styles.text}>{item.href}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className={styles.footer}>
          <li>
            <a href={instaUrl} target={'_blank'} rel={'noreferrer'}>
              INSTAGRAM
            </a>
          </li>
          <span className={styles.bullet} />
          <li>
            <a href={mapUrl} target={'_blank'} rel={'noreferrer'}>
              LOCATION IN MAPS
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
