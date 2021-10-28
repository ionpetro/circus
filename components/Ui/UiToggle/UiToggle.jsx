import React from 'react';
import styles from './UiToggle.module.scss';

const UiToggle = ({ className, checked, name, onChange, type }) => {
  return (
    <label className={`${className} ${styles.switch}`}>
      <input
        className={styles.input}
        type={type}
        checked={checked}
        name={name}
        onChange={onChange}
      />
      <span className={styles.slider} />
    </label>
  );
};

export default UiToggle;
