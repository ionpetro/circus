import React from 'react';
import styles from './UiInput.module.scss';

const UiInput = ({
  placeholder,
  type,
  name,
  onChange,
  value,
  required,
  min,
  step,
  label = true,
}) => {
  return (
    <div className={styles.compWrap}>
      <label
        className={`${styles.label} ${label ? '' : styles.hide}`}
        htmlFor={type}
      >
        {name}
      </label>
      <input
        required={required}
        min={min}
        step={step}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default UiInput;
