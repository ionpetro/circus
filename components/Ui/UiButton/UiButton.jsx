import React from 'react';
import styles from './Button.module.scss';

const UiButton = ({ children, onClick, type, icon, className }) => {
  return (
    <div className={`${className} ${styles.wrapper}`}>
      <button onClick={onClick} type={type} className={styles.button}>
        <div className={styles.border} />
        <div className={styles.content}>
          <div className={styles.icon}>{icon}</div>
          <span className={`uppercase ${styles.text}`}>{children}</span>
        </div>
      </button>
      <div className={styles.hoverBack} />
    </div>
  );
};

export default UiButton;
