import React, { useEffect, useMemo, useState } from 'react';
import styles from '../FestivalCard/FestivalCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import UiButton from '../UiButton/UiButton';
import transformDate, { calculateCountdown } from '../../utils/utilities';
import Circus from '../../public/assets/svgs/Circus.svg';
import Live from '../../public/assets/svgs/Live.svg';
import marked from 'marked';

const FestivalCard = ({ festival }) => {
  const { active } = festival;
  const [date, setDate] = useState('');
  const [countdown, setCountdown] = useState({});

  useMemo(() => setDate(transformDate(festival.date)), [festival.date]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = calculateCountdown(festival.date);
      setCountdown({ ...time });
    }, 1000);

    return () => clearInterval(interval);
  });

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
                width={festival.image.width}
                height={festival.image.height}
                src={festival.image.url}
                alt={'festival'}
              />
            ) : (
              <Circus />
            )}
          </div>
          <div>
            <p className={styles.countdown}>
              {countdown.expired ? (
                <span>Expired</span>
              ) : (
                <span>
                  {countdown.days} <span className={styles.identifier}>d</span>{' '}
                  {countdown.hours} <span className={styles.identifier}>h</span>{' '}
                  {countdown.minutes}{' '}
                  <span className={styles.identifier}>m</span>{' '}
                  {countdown.seconds}{' '}
                  <span className={styles.identifier}>s</span>
                </span>
              )}
            </p>
            {festival.date && <p className={styles.date}>{date}</p>}
            <h3 className={`uppercase ${styles.redColor}`}>{festival.title}</h3>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: marked(festival.description) }}
            />
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
            <h3
              className={`uppercase ${
                active ? styles.redColor : styles.whiteColor
              }`}
            >
              {festival.title}
            </h3>
          </div>
          <div className={styles.description}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: marked(festival.description) }}
            />
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
