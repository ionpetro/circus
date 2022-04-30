import React from 'react';
import styles from './HeroesList.module.scss';
import Image from 'next/image';
import User from '../../../public/assets/svgs/user.svg';
import Wreath from '../../../public/assets/svgs/wreath.svg';
import UiAvatar from '../../Ui/UiAvatar/UiAvatar';

const HeroesList = ({ heroes }) => {
  console.log(heroes);
  return (
    <div className={styles.compWrap}>
      <div className={styles.heroes}>
        {heroes.map((hero) => (
          <div className={styles.hero} key={hero.id}>
            <div className={styles.img}>
              <UiAvatar
                size={'xlarge'}
                isHero
                imgUrl={hero.imageUrl}
                id={hero.id}
              />
            </div>
            <h4 className={`${styles.name}`}>
              {hero.firstname} {hero.lastname}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesList;
