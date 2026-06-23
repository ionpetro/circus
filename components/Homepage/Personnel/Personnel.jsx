import React from 'react';
import Clawn from '/public/assets/svgs/Clawn.svg';
import PersonnelCard from '../PersonnelCard/PersonnelCard';
import boursi from '/public/assets/images/boursi.png';
import nikos from '/public/assets/images/nikos.png';
import limperis from '/public/assets/images/limperis.png';
import chris from '/public/assets/images/chris.png';
import soc from '/public/assets/images/soc.png';
import anastasia from '/public/assets/images/anastasia.png';
import alkmini from '/public/assets/images/alkmini.png';
import thomas from '/public/assets/images/thomas.png';
import styles from './Personnel.module.scss';

const members = [
  {
    id: 1,
    name: 'John Boursinos',
    position: 'Co-owner',
    imageSrc: boursi,
    slogan: '💪 Strongman\n' + '🌱 Vegan',
    instaLink: 'https://www.instagram.com/johnboursi/',
    color: 'red',
  },
  {
    id: 6,
    name: 'Chris Kostas',
    position: 'Co-owner',
    imageSrc: chris,
    slogan: 'Just like the previous set, but now stronger!',
    instaLink: 'https://www.instagram.com/kris_kostas/',
    color: 'red',
  },
  {
    id: 7,
    name: 'Socrates rizos',
    position: 'Co-owner',
    imageSrc: soc,
    slogan: 'Protein shake? Do you mean whiskey?',
    instaLink: 'https://www.instagram.com/iamsocratesrizos/',
    color: 'red',
  },
  {
    id: 3,
    name: 'Nikos Protogyros',
    position: 'Trainer',
    imageSrc: nikos,
    slogan: "If you're gonna be dumb, you gotta be tough",
    instaLink: 'https://instagram.com/redstachetrash',
    color: 'yellow',
  },
  {
    id: 4,
    name: 'Giannis Limperis',
    position: 'Trainer',
    imageSrc: limperis,
    slogan: "If you park outside my front door, i'm lifting your car",
    instaLink: 'https://www.instagram.com/giannis_limperis/',
    color: 'yellow',
  },
  {
    id: 8,
    name: 'Αναστασία Φωκά',
    position: 'Trainer',
    imageSrc: anastasia,
    slogan: 'Less drama, more yoga',
    color: 'yellow',
    grayscale: true,
  },
  {
    id: 9,
    name: 'Αλκμηνη Τορρενς',
    position: 'Trainer',
    imageSrc: alkmini,
    slogan: '..baby one more rep!',
    color: 'yellow',
    grayscale: true,
  },
  {
    id: 10,
    name: 'Θωμάς Χαραμαράς',
    position: 'Trainer',
    imageSrc: thomas,
    slogan: "Because carrying groceries in one trip wasn't challenging enough!",
    color: 'yellow',
    grayscale: true,
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
            grayscale={member.grayscale}
          />
        ))}
      </div>
    </section>
  );
};

export default Personnel;
