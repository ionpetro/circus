import React from 'react';
import RecordCard from '../RecordCard/RecordCard';
import styles from './RecordList.module.scss';

const RecordsList = ({ records }) => {
  return (
    <div className={styles.list}>
      {records.length ? (
        records.map((record) => <RecordCard key={record.id} record={record} />)
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};

export default RecordsList;
