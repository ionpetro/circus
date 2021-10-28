import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import Error from '/public/assets/svgs/Error.svg';
import styles from './UiError.module.scss';
import UiButton from '../UiButton/UiButton';
import Link from 'next/link';

const UiError = ({ statusCode }) => {
  return (
    <div className={styles.compWrap}>
      <Navbar />
      <div className={styles.error}>
        <Error />
        <p className={styles.paragraph}>
          Oups! Something went wrong... <br /> Try again later or{' '}
          <span>GO LIFT SOME WEIGHTS!!!</span>
        </p>
        {statusCode === 404 && (
          <Link href={'/'}>
            <a>
              <UiButton>Back to site</UiButton>
            </a>
          </Link>
        )}
      </div>
      <div className={styles.footer}>
        <Footer hasMarquee={false} simple={true} />
      </div>
    </div>
  );
};

export default UiError;
