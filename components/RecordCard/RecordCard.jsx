import React from 'react';
import styles from './RecordCard.module.scss';
import Medal from '/public/assets/svgs/Medal.svg';
import Delete from '/public/assets/svgs/Delete.svg';

const RecordCard = ({ record }) => {
  return (
    <div className={styles.compWrap}>
      <Medal />
      <div className={styles.info}>
        <div className={styles.title}>{record.game?.title}</div>
        <div className={styles.score}>
          {record.score} {record.game?.unit}
        </div>
      </div>
      <div>
        <Delete />
      </div>
    </div>
  );
};

export default RecordCard;
