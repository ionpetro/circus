import React from 'react';
import Clawn from '/public/assets/svgs/Clawn.svg';
import PersonnelCard from '../PersonnelCard/PersonnelCard';
import boursi from '/public/assets/images/boursi.png';
import paraskeuh from '/public/assets/images/paraskeuh.png';
import nikos from '/public/assets/images/nikos.png';
import styles from './Personnel.module.scss';

const members = [
  {
    id: 1,
    name: 'John Boursinos',
    position: 'Co-owner',
    imageSrc: boursi.src,
    slogan: 'Lorem Ipsum is simply dummy text',
    instaLink: 'https://www.instagram.com/johnboursi/',
    color: 'red',
  },
  {
    id: 2,
    name: 'Paraskeuh Stamatopoulou',
    position: 'Co-owner',
    imageSrc: paraskeuh.src,
    slogan: 'Lorem Ipsum is simply dummy text',
    instaLink: 'https://instagram.com/paraskevyo',
    color: 'red',
  },
  {
    id: 3,
    name: 'Nikos Protogyros',
    position: 'Trainer',
    imageSrc: nikos.src,
    slogan: 'Lorem Ipsum is simply dummy text',
    instaLink: 'https://instagram.com/redstachetrash',
    color: 'yellow',
  },
];

const Personnel = () => {
  return (
    <section className={styles.compWrap} id={'personnel'}>
      <div className={styles.heading}>
        <Clawn />
        <h2>PERSONNEL</h2>
        <p>Lorem Ipsum is simply dummy text</p>
      </div>
      <div className={styles.members}>
        {members.map((member) => (
          <PersonnelCard
            key={member.id}
            name={member.name}
            position={member.position}
            imageSrc={member.imageSrc}
            slogan={member.slogan}
            instaLink={member.instaLink}
            color={member.color}
          />
        ))}
      </div>
    </section>
  );
};

export default Personnel;
