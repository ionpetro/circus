import React from 'react';
import styles from './UiInput.module.scss';

const UiInput = ({
  placeholder,
  type,
  name,
  onChange,
  value,
  required,
  label = true,
}) => {
  return (
    <>
      <label
        className={`${styles.label} ${label ? '' : styles.hide}`}
        htmlFor={type}
      >
        {name}
      </label>
      <input
        required={required}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default UiInput;
