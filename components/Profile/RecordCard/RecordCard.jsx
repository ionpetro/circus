import React, { useEffect, useState } from 'react';
import styles from './RecordCard.module.scss';
import Medal from '/public/assets/svgs/Medal.svg';
import { transformRecordDate } from '../../../utils/utilities';

const RecordCard = ({ record }) => {
  const [className, setClassName] = useState(null);

  useEffect(() => {
    if (record.accepted) {
      setClassName('approved');
    } else if (record.accepted === false) {
      setClassName('rejected');
    } else {
      setClassName(null);
    }
  }, []);

  return (
    <div className={`${styles.compWrap} ${styles[className]}`}>
      <Medal />
      <div className={styles.info}>
        <div className={styles.title}>{record.game?.title}</div>
        <div className={styles.score}>
          {record.score} {record.game?.unit}
        </div>
      </div>
      <div className={styles.date}>
        {transformRecordDate(record.updated_at)}
      </div>
    </div>
  );
};

export default RecordCard;
