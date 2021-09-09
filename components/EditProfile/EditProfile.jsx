import React, { useContext, useEffect, useState } from 'react';
import styles from './EditProfile.module.scss';
import axiosInstance from '../../utils/http-client';
import UserContext from '../../contexts/UserContext';
import UiInput from '../UiInput/UiInput';
import UiTag from '../UiTag/UiTag';
import UiButton from '../UiButton/UiButton';

const EditProfile = ({ setShowForm }) => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState({ status: null, text: '' });

  const onTagClick = (category) => {
    setForm({ ...form, category });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND}/users/${user?.id}`,
        { ...form }
      );
      setUser(response);
      setMessage({
        status: 'success',
        text: 'Your profile details were successfully updated!',
      });
    } catch (e) {
      setMessage({
        status: 'error',
        text: 'Something went wrong, try again later',
      });
      console.log(e);
    }
  };

  console.log(form);
  useEffect(() => {
    setForm({
      username: user?.username,
      email: user?.email,
      category: user?.category,
    });
  }, [user]);

  return (
    <div className={styles.compWrap}>
      <h3 className={styles.title}>Edit Profile</h3>
      {message.text && (
        <div className={styles[message.status]}>{message.text}</div>
      )}
      {user && (
        <form className={styles.form} onSubmit={(e) => updateUser(e)}>
          <div className={styles.inputs}>
            <UiInput
              required
              label={true}
              name={'email'}
              value={form.email}
              type={'email'}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <UiInput
              required
              label={true}
              name={'username'}
              value={form.username}
              type={'username'}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className={styles.category}>body category</div>
          <div className={styles.tags}>
            <UiTag
              selected={form.category === 'below60'}
              onClick={() => onTagClick('below60')}
              onKeyDown={(e) =>
                e.keyCode === 13 ? onTagClick('below60') : null
              }
            >
              {'<60kg'}
            </UiTag>
            <UiTag
              selected={form.category === 'below80'}
              onClick={() => onTagClick('below80')}
              onKeyDown={(e) =>
                e.keyCode === 13 ? onTagClick('below80') : null
              }
            >
              {'<80kg'}
            </UiTag>
            <UiTag
              selected={form.category === 'below100'}
              onClick={() => onTagClick('below100')}
              onKeyDown={(e) =>
                e.keyCode === 13 ? onTagClick('below100') : null
              }
            >
              {'<100kg'}
            </UiTag>
            <UiTag
              selected={form.category === 'above100'}
              onClick={() => onTagClick('above100')}
              onKeyDown={(e) =>
                e.keyCode === 13 ? onTagClick('above100') : null
              }
            >
              {'>100kg'}
            </UiTag>
          </div>
          <div className={styles.actions}>
            <a onClick={() => setShowForm(false)}>Cancel</a>
            <UiButton>Save</UiButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
