import React, { useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Strongman from '../../public/assets/svgs/Error.svg';
import axiosInstance from '../../utils/http-client';
import UiInput from '../Ui/UiInput/UiInput';
import UiButton from '../Ui/UiButton/UiButton';
import Footer from '../Shared/Footer/Footer';
import UiSpinner from '../Ui/UiSpinner/UiSpinner';
import Link from 'next/link';
import styles from './ForgottenPassword.module.scss';

const ForgottenPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/forgot-password`,
        { email: email.trim() }
      );
      setSuccess(`✉️ Mail sent to ${email}. Check the spam folder!`);
      setLoading(false);
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
          <h3 className={styles.title}>Forgot password?</h3>
          <p className={styles.subtitle}>
            Add your mail to send you a reset password link
          </p>
          {error && <span className={styles.error}>{error}</span>}
          {success && <p className={styles.success}>{success}</p>}
          {loading ? (
            <UiSpinner />
          ) : (
            <form onSubmit={onSubmit} className={styles.form}>
              <UiInput
                label={false}
                placeholder={'email'}
                type={'email'}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className={styles.actions}>
                <UiButton type={'submit'}>Send</UiButton>
                <Link href={'/login'}>Cancel</Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer simple={true} />
    </div>
  );
};

export default ForgottenPassword;
