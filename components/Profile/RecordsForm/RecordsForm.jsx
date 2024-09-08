import React, { useState, useContext, useEffect } from 'react';
import UiInput from '../../Ui/UiInput/UiInput';
import UiSelect from '../../Ui/UiSelect/UiSelect';
import UiButton from '../../Ui/UiButton/UiButton';
import axiosInstance from '../../../utils/http-client';
import styles from './RecordsForm.module.scss';
import Medal from '/public/assets/svgs/Medal.svg';
import UserContext from '../../../contexts/UserContext';
import { transformDateShort } from '../../../utils/utilities';

const RecordsForm = ({ options, setShowForm, records, setRecords }) => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');

  const gameId = (gameTitle) => {
    const game = options.find((option) => option.title === gameTitle);
    return game ? game.id : null;
  };

  const getUnitByGameId = (id) => {
    const game = options.find((option) => option.id === id);
    return game ? game.unit : null;
  };

  const [form, setForm] = useState({ game: gameId(options[0].title) });

  const addOrUpdateRecord = async (e) => {
    e.preventDefault();
    let response;
    const token = window.localStorage.getItem('token');
    const [record] = records.filter((record) => record.game.id === form.game);

    try {
      if (record) {
        // the game already exists, so we update it
        response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?user=${user.id}`,
          { ...form, user: user.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // the game doesn't exist, so we create it
        response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?user=${user.id}`,
          { ...form, user: user.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setRecords(response);
      setError('');
      setShowForm(false);
    } catch (e) {
      setError('Something went wrong');
      console.log(e);
    }
  };

  useEffect(async () => {
    console.log(records);
  }, []);

  return (
    <form className={styles.form} onSubmit={(e) => addOrUpdateRecord(e)}>
      <div className={styles.notice}>
        When you submit a new personal record, the circus owners will be
        notified in order to review the PR. You can find the following statuses
        inside the record cards:
      </div>
      <div className={styles.statuses}>
        <Medal />
        Approved
        <Medal />
        Under review
        <Medal />
        Rejected
      </div>

      {records.filter((record) => record.game.id === form.game).length !==
        0 && (
        <div>
          <h4>Past Records</h4>
          <div className={styles.records}>
            {records
              .filter((record) => record.game.id === form.game)
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((record) => (
                <div className={styles.record} key={record.created_at}>
                  <div>{transformDateShort(record.created_at)}</div>
                  <div>
                    {'💪 '}
                    {record.score} {record.game.unit}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <h4>Create new</h4>
      <div className={styles.inputs}>
        <UiSelect
          onChange={(e) => setForm({ ...form, game: gameId(e.target.value) })}
          options={options}
          name={'event'}
          className={styles.select}
        />
        <UiInput
          name={`score (${getUnitByGameId(form.game)})`}
          required
          label={true}
          step={0.01}
          min={0}
          type={'number'}
          placeholder={'Please be honest'}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
      <div className={styles.actions}>
        <a onClick={() => setShowForm(false)} className={styles.cancel}>
          Cancel
        </a>
        <UiButton>Submit</UiButton>
      </div>
    </form>
  );
};

export default RecordsForm;
