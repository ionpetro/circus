import React from 'react';
import styles from './ProgramNotice.module.scss';
import InfoIcon from '../../../public/assets/svgs/info-circle-solid.svg';
import BombIcon from '../../../public/assets/svgs/bomb-solid.svg';
import WarningIcon from '../../../public/assets/svgs/exclamation-triangle-solid.svg';
import { daysUntilDate } from '../../../utils/utilities';

const ProgramNotice = ({ paymentDue }) => {
  const threshold = 10;
  const daysUntilExpire = daysUntilDate(paymentDue);

  // we have more than 10 days until expire
  if (daysUntilExpire > threshold) {
    return null;
  }

  // we have 1 - 10 days until expire
  if (daysUntilExpire > 0) {
    return (
      <div className={styles.compWrap}>
        <div className={styles.wrapper}>
          <InfoIcon />
          <p>{`You have ${
            daysUntilExpire === 1
              ? `${daysUntilExpire} day`
              : `${daysUntilExpire} days`
          } until payment`}</p>
        </div>
      </div>
    );
  }

  // today expires
  if (daysUntilExpire === 0) {
    return (
      <div className={styles.compWrap}>
        <div className={styles.wrapper}>
          <InfoIcon />
          <p>{`Today is the payment day!`}</p>
        </div>
      </div>
    );
  }

  // we have passed the expiration (negative number)
  if (daysUntilExpire < 0 && daysUntilExpire > -5) {
    return (
      <div className={styles.compWrap}>
        <div className={styles.wrapper}>
          <WarningIcon />
          <p>{`You are ${
            Math.abs(daysUntilExpire) === 1
              ? `${Math.abs(daysUntilExpire)} day`
              : `${Math.abs(daysUntilExpire)} days`
          } late to pay`}</p>
        </div>
      </div>
    );
  }

  // we have passed the expiration (negative number)
  if (daysUntilExpire < 0 && daysUntilExpire <= -5) {
    return (
      <div className={styles.compWrap}>
        <div className={styles.wrapper}>
          <BombIcon />
          <p>{`You are ${Math.abs(
            daysUntilExpire
          )} days late to pay. Soon the program will lock for you`}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ProgramNotice;
