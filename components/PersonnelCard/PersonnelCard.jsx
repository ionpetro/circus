import React from 'react';
import styles from './PersonnelCard.module.scss';
import Insta from '/public/assets/svgs/Insta.svg';
import Image from 'next/image';

const PersonnelCard = ({
  name,
  position,
  slogan,
  instaLink,
  imageSrc,
  color,
}) => {
  return (
    <div className={styles.compWrap}>
      <div className={styles.container}>
        <div className={styles.border}>
          <Image alt={name} src={imageSrc} width={260} height={260} />
        </div>
        <div className={styles.instagram}>
          <a href={instaLink} target={'_blank'} rel={'noreferrer'}>
            <Insta />
          </a>
        </div>
      </div>
      <h2 className={styles.name}>{name}</h2>
      <div className={`${styles.position} ${styles[color]}`}>
        <span>{position}</span>
      </div>
      <div className={styles.slogan}>
        <em>{slogan}</em>
      </div>
    </div>
  );
};

export default PersonnelCard;
