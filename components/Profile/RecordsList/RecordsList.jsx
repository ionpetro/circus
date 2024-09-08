import React from 'react';
import RecordCard from '../RecordCard/RecordCard';
import styles from './RecordList.module.scss';

const RecordsList = ({ records }) => {
  const latestRecords = Array.from(
    records
      .reduce((map, obj) => {
        const gameId = obj.game.id;
        const existingObj = map.get(gameId);

        // Compare and keep the latest `created_at`
        if (
          !existingObj ||
          new Date(obj.created_at) > new Date(existingObj.created_at)
        ) {
          map.set(gameId, obj);
        }

        return map;
      }, new Map())
      .values()
  );

  return (
    <div className={styles.list}>
      {records && records?.length ? (
        latestRecords.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};

export default RecordsList;
