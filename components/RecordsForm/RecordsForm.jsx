import React, { useState, useContext } from 'react';
import UiInput from '../UiInput/UiInput';
import UiSelect from '../UiSelect/UiSelect';
import UiButton from '../UiButton/UiButton';
import axiosInstance from '../../utils/http-client';
import styles from './RecordsForm.module.scss';
import Medal from '/public/assets/svgs/Medal.svg';
import UserContext from '../../contexts/UserContext';
import Cookie from 'js-cookie';

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
    const token = Cookie.get('token');
    const [record] = records.filter((record) => record.game.id === form.game);

    try {
      if (record) {
        // the game already exists, so we update it
        response = await axiosInstance.put(
          `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users/${record.id}?user=${user.id}`,
          { score: form.score, accepted: null },
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
      {error && <div className={styles.error}>{error}</div>}
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
