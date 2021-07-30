import React from 'react';
import styles from './Button.module.scss';

const UiButton = ({ children, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} className={styles.button}>
        <div className={styles.border} />
        <span className={`uppercase ${styles.text}`}>{children}</span>
      </button>
      <div className={styles.hoverBack} />
    </div>
  );
};

export default UiButton;
