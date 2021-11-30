import React, { useContext, useEffect, useState } from 'react';
import RegisterMan from '/public/assets/svgs/registerMan.svg';
import styles from './Register.module.scss';
import Link from 'next/link';
import Footer from '../Shared/Footer/Footer';
import UiInput from '../Ui/UiInput/UiInput';
import UiButton from '../Ui/UiButton/UiButton';
import axiosInstance from '../../utils/http-client';
import { isValidEmail, matchSecretCode } from '../../utils/validations';
import Router from 'next/router';
import UserContext from '../../contexts/UserContext';
import Cookie from 'js-cookie';
import UiTag from '../Ui/UiTag/UiTag';
import Navbar from '../Shared/Navbar/Navbar';

const Register = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const userContext = useContext(UserContext);
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    if (userContext.user) {
      Router.push('/profile');
    }
  }, [userContext]);

  const onTagClick = (tag) => {
    setCategory(tag);
    setForm({ ...form, category: tag });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    if (!isValidEmail(email)) {
      setError('Add a valid email');
      return;
    }

    if (!category) {
      setError('Please add your body category');
      return;
    }

    if (form.password !== form.conPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!matchSecretCode(form.code)) {
      setError('Incorrect code! Contact john boursinos');
      return;
    }

    try {
      const { jwt, user } = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/local/register`,
        { username, email, password, category }
      );
      Cookie.set('token', jwt);
      userContext.setUser(user);
      setForm({});
      Router.push('/profile');
    } catch (e) {
      setError(
        e?.response?.data?.message[0]?.messages[0]?.message
          ? 'Email or username already taken'
          : 'Something went wrong! Try again later'
      );
    }
  };
  return (
    <>
      <div className={styles.compWrap}>
        <Navbar />
        <div className={styles.content}>
          <RegisterMan />
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Let&apos;s create your account</h3>
            <p className={styles.subtitle}>
              Already have an account? <Link href={'/login'}>Login</Link>
            </p>
            {error && <span className={styles.error}>{error}</span>}
            <form onSubmit={onSubmit} className={styles.form}>
              <UiInput
                required
                label={false}
                placeholder={'email'}
                type={'text'}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <UiInput
                required
                label={false}
                placeholder={'username'}
                type={'text'}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
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
              <span className={styles.category}>Select your body category</span>
              <div className={styles.tags}>
                <UiTag
                  selected={category === 'below60'}
                  onClick={() => onTagClick('below60')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('below60') : null
                  }
                >
                  {'<60kg'}
                </UiTag>
                <UiTag
                  selected={category === 'below80'}
                  onClick={() => onTagClick('below80')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('below80') : null
                  }
                >
                  {'<80kg'}
                </UiTag>
                <UiTag
                  selected={category === 'below100'}
                  onClick={() => onTagClick('below100')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('below100') : null
                  }
                >
                  {'<100kg'}
                </UiTag>
                <UiTag
                  selected={category === 'above100'}
                  onClick={() => onTagClick('above100')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('above100') : null
                  }
                >
                  {'>100kg'}
                </UiTag>
              </div>
              <UiInput
                label={false}
                placeholder={'code (ask the owner)'}
                type={'number'}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
              />
              <UiButton type={'submit'}>Register</UiButton>
            </form>
          </div>
        </div>
        <Footer simple={true} />
      </div>
    </>
  );
};

export default Register;
