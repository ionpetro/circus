import React from 'react';
import Clawn from '/public/assets/svgs/Clawn.svg';
import PersonnelCard from '../PersonnelCard/PersonnelCard';
import boursi from '/public/assets/images/boursi.png';
import paraskeuh from '/public/assets/images/paraskeuh.png';
import nikos from '/public/assets/images/nikos.png';
import limperis from '/public/assets/images/limperis.png';
import barka from '/public/assets/images/barka.png';
import chris from '/public/assets/images/chris.png';
import soc from '/public/assets/images/soc.png';
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
    name: 'Adrianna Barka',
    position: 'Trainer',
    imageSrc: barka.src,
    slogan: 'Fooling around',
    instaLink: 'https://www.instagram.com/antrianna_mp/',
    color: 'yellow',
  },
  {
    id: 7,
    name: 'Chris Kostas',
    position: 'Trainer',
    imageSrc: chris.src,
    slogan: 'Just like the previous set, but now stronger!',
    instaLink: 'https://www.instagram.com/kris_kostas/',
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
        {members.map((member) => (member.position === 'Co-owner' &&
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
      <div className={styles.members2}>
        {members.map((member) => (member.position !== 'Co-owner' &&
          < PersonnelCard
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
