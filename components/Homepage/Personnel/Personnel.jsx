import React from 'react';
import Clawn from '/public/assets/svgs/Clawn.svg';
import PersonnelCard from '../PersonnelCard/PersonnelCard';
import boursi from '/public/assets/images/boursi.png';
import paraskeuh from '/public/assets/images/paraskeuh.png';
import nikos from '/public/assets/images/nikos.png';
import limperis from '/public/assets/images/limperis.jpg';
import nirgianakis from '/public/assets/images/nirgianakis.jpg';
import menelaou from '/public/assets/images/menelaou.jpg';
import soc from '/public/assets/images/soc.jpg';
import styles from './Personnel.module.scss';

const members = [
  {
    id: 1,
    name: 'John Boursinos',
    position: 'Co-owner',
    imageSrc: boursi.src,
    slogan: '💪 Strongman\n' + '🌱 Vegan',
    instaLink: 'https://www.instagram.com/johnboursi/',
    color: 'red',
  },
  {
    id: 2,
    name: 'Paraskeuh Stamatopoulou',
    position: 'Co-owner',
    imageSrc: paraskeuh.src,
    slogan:
      'Berry eater. BV player. Art history student.\n' +
      'Funny when in a room with notsofunny people. Still counts.',
    instaLink: 'https://instagram.com/paraskevyo',
    color: 'red',
  },
  {
    id: 7,
    name: 'Socrates rizos',
    position: 'Co-owner',
    imageSrc: soc.src,
    slogan: 'Protein shake? Do you mean whiskey?',
    instaLink: 'https://www.instagram.com/iamsocratesrizos/',
    color: 'red',
  },
  {
    id: 3,
    name: 'Nikos Protogyros',
    position: 'Trainer',
    imageSrc: nikos.src,
    slogan: "If you're gonna be dumb, you gotta be tough",
    instaLink: 'https://instagram.com/redstachetrash',
    color: 'yellow',
  },
  {
    id: 4,
    name: 'Giannis Limperis',
    position: 'Trainer',
    imageSrc: limperis.src,
    slogan: "If you park outside my front door, i'm lifting your car",
    instaLink: 'https://www.instagram.com/giannis_limperis/',
    color: 'yellow',
  },
  {
    id: 5,
    name: 'Giannis Nirgianakis',
    position: 'Trainer',
    imageSrc: nirgianakis.src,
    slogan: 'Coach, athlete, sugar addicted',
    instaLink: 'https://www.instagram.com/john_nirgianakis/',
    color: 'yellow',
  },
  {
    id: 6,
    name: 'Dimitris menelaou',
    position: 'Trainer',
    imageSrc: menelaou.src,
    slogan: "Of course it's heavy, it's iron",
    instaLink: 'https://www.instagram.com/dimitris_menelaou/',
    color: 'yellow',
  },
];

const Personnel = () => {
  return (
    <section className={styles.compWrap} id={'personnel'}>
      <div className={styles.heading}>
        <Clawn />
        <h2>PERSONNEL</h2>
        <p>Train next to these monsters</p>
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
