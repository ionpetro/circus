import React from 'react';
import styles from './Contests.module.scss';
import Stars from '../../public/assets/svgs/stars.svg';
import FestivalCard from '../FestivalCard/FestivalCard';

const festivals = [
  {
    id: 1,
    active: true,
    imageSrc:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627675410/festival_kvkavn.jpg',
    date: 'March 21, 2021',
    title: 'Connected We Stand II Digital Festival',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
    readMore: 'https://www.facebook.com',
  },
  {
    id: 2,
    active: false,
    imageSrc:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627675410/festival_kvkavn.jpg',
    date: null,
    title: 'Connected We Stand II Digital Festival',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    readMore: 'https://www.facebook.com',
  },
  {
    id: 3,
    active: false,
    imageSrc: null,
    date: null,
    title: 'Connected We Stand II Digital Festival',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    readMore: 'https://www.facebook.com',
  },
  {
    id: 4,
    active: false,
    imageSrc: null,
    date: null,
    title: 'Connected We Stand II Digital Festival',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    readMore: 'https://www.facebook.com',
  },
];

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
