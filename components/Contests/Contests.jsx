import React from 'react';
import styles from './Contests.module.scss';
import Tickets from '../../public/assets/svgs/Tickets.svg';
import FestivalCard from '../FestivalCard/FestivalCard';

const Contests = ({ description, contests }) => {
  return (
    <section className={styles.compWrap} id={'contests'}>
      <div className={styles.header}>
        <Tickets />
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
