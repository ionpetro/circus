import React from 'react';
import styles from './UiSelect.module.scss';

const UiSelect = ({ options, htmlFor, name, onChange, className }) => {
  return (
    <div className={`${className} ${styles.compWrap}`}>
      <label htmlFor={htmlFor} className={styles.label}>
        {name}
      </label>
      <select
        defaultValue={options[0].title}
        onChange={onChange}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.id}>{option.title}</option>
        ))}
      </select>
    </div>
  );
};

export default UiSelect;
