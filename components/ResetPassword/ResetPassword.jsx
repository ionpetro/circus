import React, { useContext, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Strongman from '../../public/assets/svgs/Error.svg';
import axiosInstance from '../../utils/http-client';
import UiInput from '../Ui/UiInput/UiInput';
import UiButton from '../Ui/UiButton/UiButton';
import Footer from '../Shared/Footer/Footer';
import UiSpinner from '../Ui/UiSpinner/UiSpinner';
import styles from './ResetPassword.module.scss';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import UserContext from '../../contexts/UserContext';

const ResetPassword = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const userContext = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.conPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/reset-password`,
        {
          code: router.query.code,
          password: form.password,
          passwordConfirmation: form.conPassword,
        }
      );
      Cookie.set('token', response.jwt);
      userContext.setUser(response.user);
      setLoading(false);
      router.push('/profile');
    } catch (e) {
      setError('Something went wrong. Contact ionpetro');
      setLoading(false);
    }
  };

  return (
    <div className={styles.compWrap}>
      <Navbar />
      <div className={styles.content}>
        <Strongman />
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Reset your password</h3>
          <p className={styles.subtitle}>Add your new password below</p>
          {error && <span className={styles.error}>{error}</span>}
          {loading ? (
            <UiSpinner />
          ) : (
            <form onSubmit={onSubmit} className={styles.form}>
              <UiInput
                required
                label={false}
                placeholder={'password'}
                type={'password'}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <UiInput
                required
                label={false}
                placeholder={'confirm password'}
                type={'password'}
                onChange={(e) =>
                  setForm({ ...form, conPassword: e.target.value })
                }
              />
              <div className={styles.actions}>
                <UiButton type={'submit'}>Save</UiButton>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer simple={true} />
    </div>
  );
};

export default ResetPassword;
