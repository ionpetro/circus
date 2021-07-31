import React from 'react';
import styles from '../FestivalCard/FestivalCard.module.scss';
import Image from 'next/image';
import UiButton from '../UiButton/UiButton';
import Circus from '../../public/assets/svgs/Circus.svg';
import linesFestival from '../../public/assets/images/linesFestival.png';

const FestivalCard = ({ festival }) => {
  const { active } = festival;

  if (active) {
    return (
      <div className={`${styles.containerActive}`}>
        <div className={styles.borderActive} />
        <div className={`${styles.content} ${styles.contentRow}`}>
          <div className={`${styles.image} ${styles.imageActiveSvg}`}>
            {festival.imageSrc ? (
              <Image
                src={festival.imageSrc}
                width={'300px'}
                height={'300px'}
                alt={'festival'}
              />
            ) : (
              <Circus />
            )}
          </div>
          <div>
            {festival.date && <p className={styles.date}>{festival.date}</p>}
            <h3 className={`uppercase ${styles.redColor}`}>{festival.title}</h3>
            <p>{festival.description}</p>
            <a href={festival.readMore} target={'_blank'} rel="noreferrer">
              READ MORE
            </a>
            <div className={styles.spacing} />
            <div className={styles.button}>
              <UiButton>COMPETE</UiButton>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${styles.containerExpired}`}>
        <div className={styles.borderExpired} />
        <div className={`${styles.content}`}>
          <div className={styles.label}>
            <span className={'uppercase'}>FINISHED</span>
          </div>
          <div className={styles.header}>
            <div className={styles.image}>
              {festival.imageSrc ? (
                <Image
                  src={festival.imageSrc}
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
          <div>
            <p>{festival.description}</p>
            <a href={festival.readMore} target={'_blank'} rel="noreferrer">
              READ MORE
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default FestivalCard;
