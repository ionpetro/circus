import React, { useMemo, useState } from 'react';
import styles from '../FestivalCard/FestivalCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import UiButton from '../UiButton/UiButton';
import Circus from '../../public/assets/svgs/Circus.svg';
import Live from '../../public/assets/svgs/Live.svg';
import transformDate from '../../utils/utilities';

const FestivalCard = ({ festival }) => {
  const { active } = festival;
  const [date, setDate] = useState('');

  useMemo(() => setDate(transformDate(festival.date)), [festival.date]);

  if (active) {
    return (
      <div className={`${styles.containerActive}`}>
        <div className={styles.borderActive} />
        <div className={`${styles.content} ${styles.contentRow}`}>
          <div className={`${styles.label} ${styles.activeLabel}`}>
            <Live />
            <span className={'uppercase'}>OPEN</span>
          </div>
          <div className={`${styles.image} ${styles.imageActiveImage}`}>
            {festival.image ? (
              <Image
                src={festival.image.url}
                width={'300px'}
                height={'300px'}
                alt={'festival'}
              />
            ) : (
              <Circus />
            )}
          </div>
          <div>
            {festival.date && <p className={styles.date}>{date}</p>}
            <h3 className={`uppercase ${styles.redColor}`}>{festival.title}</h3>
            <p>{festival.description}</p>
            {festival.readMoreLink && (
              <a
                href={festival.readMoreLink}
                target={'_blank'}
                rel="noreferrer"
              >
                READ MORE
              </a>
            )}
            <div className={styles.spacing} />
            {festival.competeLink && (
              <div className={styles.button}>
                <Link href={festival.competeLink}>
                  <a target="_blank" rel="noreferrer">
                    <UiButton>COMPETE</UiButton>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${styles.containerExpired}`}>
        <div className={styles.borderExpired} />
        <div className={`${styles.content}`}>
          <div className={`${styles.label} ${styles.finishedLabel}`}>
            <span className={'uppercase'}>FINISHED</span>
          </div>
          <div className={styles.header}>
            <div className={styles.image}>
              {festival.image ? (
                <Image
                  src={festival.image.url}
                  width={'100px'}
                  height={'100px'}
                  alt={'festival'}
                />
              ) : (
                <Circus />
              )}
            </div>
            {festival.date && <p className={styles.date}>{festival.date}</p>}
            <h3
              className={`uppercase ${
                active ? styles.redColor : styles.whiteColor
              }`}
            >
              {festival.title}
            </h3>
          </div>
          <div className={styles.description}>
            <p>{festival.description}</p>
            {festival.readMoreLink && (
              <a
                href={festival.readMoreLink}
                target={'_blank'}
                rel="noreferrer"
              >
                READ MORE
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default FestivalCard;
