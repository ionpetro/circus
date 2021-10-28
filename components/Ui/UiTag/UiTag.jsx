import React from 'react';
import styles from './UiTag.module.scss';

const UiTag = ({ children, onClick, selected, onKeyDown }) => {
  return (
    <div
      className={`${styles.compWrap} ${selected ? styles.selected : ''}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

export default UiTag;
