import React from 'react';
import styles from './Contests.module.scss';
import Stars from '../../public/assets/svgs/stars.svg';
import UiButton from '../UiButton/UiButton';
import festival from '../../public/assets/images/festival.png';
import Image from 'next/image';

const Contests = () => {
  return (
    <section className={styles.compWrap}>
      <div className={styles.header}>
        <Stars />
        <h1>Contests</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>

        {/*FestivalCard start*/}
        <div className={styles.cardWrap}>
          <div className={`${styles.container}`}>
            <div className={styles.border} />
            <div className={styles.content}>
              <div className={styles.image}>
                <Image
                  src={festival.src}
                  width={'184px'}
                  height={'184px'}
                  alt={'festival'}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.date}>March 21, 2021</p>
                <h3 className={`uppercase ${styles.title}`}>
                  Connected We Stand II Digital Festival
                </h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s
                </p>
                <a>READ MORE</a>
                <div className={styles.button}>
                  <UiButton>COMPETE</UiButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*FestivalCard end*/}
      </div>
    </section>
  );
};

export default Contests;
