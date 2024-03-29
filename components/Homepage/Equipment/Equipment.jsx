import React from 'react';
import styles from './Equipment.module.scss';
import Image from 'next/image';
import Dumbbell from '../../../public/assets/svgs/dumbbell.svg';
import equipment from '../../../public/assets/images/equipment-new.jpg';
import UiCarousel from '../../Ui/UiCarousel/UiCarousel';

const Equipment = ({ description, media }) => {
  return (
    <section className={styles.compWrap} id={'equipment'}>
      <Image
        unoptimized
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
        <h2>EQUIPMENT</h2>
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
