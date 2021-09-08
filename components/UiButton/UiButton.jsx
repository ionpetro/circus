import React from 'react';
import styles from './Button.module.scss';

const UiButton = ({ children, onClick, type }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} type={type} className={styles.button}>
        <div className={styles.border} />
        <span className={`uppercase ${styles.text}`}>{children}</span>
      </button>
      <div className={styles.hoverBack} />
    </div>
  );
};

export default UiButton;
