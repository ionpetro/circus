import React, { useState, useEffect } from 'react';
import styles from './Contests.module.scss';
import Stars from '../../public/assets/svgs/stars.svg';
import FestivalCard from '../FestivalCard/FestivalCard';

const Contests = () => {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV}/contests?_sort=date:DESC`
      );
      const data = await response.json();
      setFestivals(data);
    };
    getData().catch((e) => console.log(e));
  }, []);
  return (
    <section className={styles.compWrap}>
      <div className={styles.header}>
        <Stars />
        <h1>Contests</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>
        <div className={styles.festivals}>
          {festivals.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contests;
