import React, { useLayoutEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import Circus from '../../public/assets/svgs/Circus.svg';
import Link from 'next/link';

const menuItems = [
  'history',
  'equipment',
  'contests',
  'social',
  'personnel',
  'contact',
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    open
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [open]);

  return (
    <div className={styles.compWrap}>
      <Link href={'/'}>
        <a>
          <Circus />
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
        <ul className={styles.sections}>
          {menuItems.map((item) => (
            <li key={item}>
              <a onClick={() => setOpen(false)} href={`#${item}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <ul className={styles.footer}>
          <li>INSTAGRAM</li>
          <span className={styles.bullet} />
          <li>MAP</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
