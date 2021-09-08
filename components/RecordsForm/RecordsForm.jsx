import React, { useState, useContext } from 'react';
import UiInput from '../UiInput/UiInput';
import UiSelect from '../UiSelect/UiSelect';
import UiButton from '../UiButton/UiButton';
import axiosInstance from '../../utils/http-client';
import styles from './RecordsForm.module.scss';
import Medal from '/public/assets/svgs/Medal.svg';
import UserContext from '../../contexts/UserContext';

const RecordsForm = ({ options, setShowForm, setRecords }) => {
  const { user } = useContext(UserContext);

  const gameId = (gameTitle) => {
    const game = options.find((option) => option.title === gameTitle);
    return game ? game.id : null;
  };

  const getUnitByGameId = (id) => {
    const game = options.find((option) => option.id === id);
    return game ? game.unit : null;
  };

  const [form, setForm] = useState({ game: gameId(options[0].title) });

  const addRecord = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?user=${user.id}`,
        { ...form, user: user.id }
      );
      console.log(response);
      setRecords(response);
      setShowForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => addRecord(e)}>
      <div className={styles.notice}>
        When you submit a new personal record, the circus owners will be
        notified in order to review the PR. You can find the following statuses
        inside the record cards:
      </div>
      <div className={styles.statuses}>
        <Medal />
        Under review
        <Medal />
        Approved
        <Medal />
        Rejected
      </div>
      <div className={styles.inputs}>
        <UiSelect
          onChange={(e) => setForm({ ...form, game: gameId(e.target.value) })}
          options={options}
          name={'event'}
          className={styles.select}
        />
        <UiInput
          name={`score (${getUnitByGameId(form.game)})`}
          label={true}
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