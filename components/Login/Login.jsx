import React, { useContext, useEffect, useState } from 'react';
import LoginMan from '/public/assets/svgs/loginman.svg';
import styles from './Login.module.scss';
import Link from 'next/link';
import Footer from '../Footer/Footer';
import UiInput from '../UiInput/UiInput';
import UiButton from '../UiButton/UiButton';
import axiosInstance from '../../utils/http-client';
import { isValidEmail } from '../../utils/validations';
import Cookie from 'js-cookie';
import Router from 'next/router';
import UserContext from '../../contexts/UserContext';
import Navbar from '../Navbar/Navbar';

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
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/local`,
        { identifier: email, password: password }
      );
      Cookie.set('token', response.jwt);
      userContext.setUser(response.user);
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
                label={false}
                placeholder={'email'}
                type={'text'}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <UiInput
                label={false}
                placeholder={'password'}
                type={'password'}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
