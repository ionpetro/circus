import React, { useContext, useEffect, useState } from 'react';
import LoginMan from '/public/assets/svgs/loginman.svg';
import styles from './Login.module.scss';
import Link from 'next/link';
import Footer from '../Shared/Footer/Footer';
import UiInput from '../Ui/UiInput/UiInput';
import UiButton from '../Ui/UiButton/UiButton';
import axiosInstance from '../../utils/http-client';
import { isValidEmail } from '../../utils/validations';
import Router from 'next/router';
import UserContext from '../../contexts/UserContext';
import Navbar from '../Shared/Navbar/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      Router.push('/profile');
    }
  }, [userContext]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Add a valid email');
      return;
    }

    try {
      const { jwt, user } = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/local`,
        { identifier: email, password: password }
      );
      window.localStorage.setItem('token', jwt);
      userContext.setUser(user);
      setEmail('');
      setPassword('');
      Router.push('/profile');
    } catch (e) {
      setError('Something went wrong, try again later!');
      console.log(e);
    }
  };
  return (
    <>
      <div className={styles.compWrap}>
        <Navbar />

        <div className={styles.content}>
          <LoginMan />
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Let&apos;s sign you in</h3>
            <p className={styles.subtitle}>
              Don&apos;t have an account?{' '}
              <Link href={'/register'}>Register</Link>
            </p>
            {error && <span className={styles.error}>{error}</span>}
            <form onSubmit={onSubmit} className={styles.form}>
              <UiInput
                name={'email'}
                label={false}
                placeholder={'email'}
                type={'text'}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
              />
              <UiInput
                name={'password'}
                label={false}
                placeholder={'password'}
                type={'password'}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link href={'/forgotten-password'}>
                <a className={styles.forgot}>Forgot Password? </a>
              </Link>
              <UiButton type={'submit'}>Login</UiButton>
            </form>
          </div>
        </div>
        <Footer simple={true} />
      </div>
    </>
  );
};

export default Login;
