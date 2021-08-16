import React from 'react';
import styles from './Contests.module.scss';
import Stars from '../../public/assets/svgs/stars.svg';
import FestivalCard from '../FestivalCard/FestivalCard';

const Contests = ({ description, contests }) => {
  return (
    <section className={styles.compWrap}>
      <div className={styles.header}>
        <Stars />
        <h1>Contests</h1>
        <p>{description}</p>
        <div className={styles.festivals}>
          {contests.map((contest) => (
            <FestivalCard key={contest.id} festival={contest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contests;
