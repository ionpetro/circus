import React, { useEffect, useState } from 'react';
import styles from './Records.module.scss';
import axiosInstance from '../../utils/http-client';
import UiButton from '../UiButton/UiButton';
import RecordsList from '../RecordsList/RecordsList';
import RecordsForm from '../RecordsForm/RecordsForm';

const Records = ({ userId }) => {
  const [records, setRecords] = useState([]);
  const [options, setOptions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchRecords = async () => {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?user=${userId}`
    );
    setRecords(response);
  };

  const fetchOptions = async () => {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/games`
    );
    setOptions(response);
  };

  useEffect(() => {
    try {
      fetchOptions();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      fetchRecords();
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  return (
    <div className={styles.compWrap}>
      <div className={styles.title}>
        <h3>Personal Records</h3>
        <UiButton
          onClick={() => setShowForm(true)}
          className={showForm ? styles.hide : ''}
        >
          Update
        </UiButton>
      </div>
      {showForm ? (
        <RecordsForm
          setRecords={setRecords}
          options={options}
          setShowForm={setShowForm}
        />
      ) : (
        <RecordsList records={records} />
      )}
    </div>
  );
};

export default Records;
