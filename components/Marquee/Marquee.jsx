import React from 'react';
import styles from './Marquee.module.scss';

const Marquee = () => {
  const items = 8;
  return (
    <div className={styles.mScroll}>
      <div className={styles.title}>
        <div>
          <h2>
            {[...Array(items)].map((_, index) => (
              <span key={index} className={styles.name}>
                <span>C</span>
                <span>I</span>
                <span>R</span>
                <span>C</span>
                <span>U</span>
                <span>S</span>
              </span>
            ))}
          </h2>
          <h2>
            {[...Array(items)].map((_, index) => (
              <span key={index + items} className={styles.name}>
                <span>C</span>
                <span>I</span>
                <span>R</span>
                <span>C</span>
                <span>U</span>
                <span>S</span>
              </span>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
