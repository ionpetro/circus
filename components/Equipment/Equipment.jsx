import React from 'react';
import styles from './Equipment.module.scss';
import Image from 'next/image';
import Dumbbell from '../../public/assets/svgs/dumbbell.svg';
import equipment from '../../public/assets/images/equipment.png';
import UiCarousel from '../UiCarousel/UiCarousel';

const Equipment = ({ description, media }) => {
  return (
    <section className={styles.compWrap} id={'equipment'}>
      <Image
        alt={'equipment'}
        className={styles.image}
        src={equipment.src}
        layout={'fill'}
        objectFit={'cover'}
        objectPosition={'center'}
      />
      <div className={styles.transitionTop} />
      <div className={styles.content}>
        <Dumbbell className={styles.dumbbell} />
        <h1 className={styles.heading}>EQUIPMENT</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.carousel}>
          <UiCarousel media={media} />
        </div>
      </div>
      <div className={styles.transitionBot} />
    </section>
  );
};

export default Equipment;
