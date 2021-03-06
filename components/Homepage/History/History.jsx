import React from 'react';
import styles from './History.module.scss';
import Banner from '../../../public/assets/svgs/banner.svg';
import HypeCard from '../HypeCard/HypeCard';
import Bicep from '../../../public/assets/svgs/Bicep.svg';
import Chains from '../../../public/assets/svgs/Chains.svg';
import Drums from '../../../public/assets/svgs/Drums.svg';
import image1 from '../../../public/assets/images/image1.png';
import image2 from '../../../public/assets/images/image2.png';
import image3 from '../../../public/assets/images/image3.png';
import marked from 'marked';

const History = ({ history }) => {
  const hypes = [
    {
      id: 1,
      icon: <Bicep />,
      p: 'come and see our',
      imgSrc: image1.src,
      hype: 'monsters',
      color: 'red',
    },
    {
      id: 2,
      icon: <Chains />,
      p: 'have a taste of',
      imgSrc: image2.src,
      hype: 'strongman',
      color: 'yellow',
    },
    {
      id: 3,
      icon: <Drums />,
      p: 'enjoy our marvelous',
      imgSrc: image3.src,
      hype: 'extravaganza',
      color: 'beige',
    },
  ];
  return (
    <div className={styles.compWrap} id={'history'}>
      <div className={styles.title}>
        <h2 className={styles.heading}>HISTORY</h2>
        <Banner />
      </div>
      <div
        className={styles.paragraph}
        dangerouslySetInnerHTML={{ __html: marked(history) }}
      />
      <h3 className={`uppercase ${styles.hype}`}>Become the next monster</h3>
      <div className={styles.hypes}>
        {hypes.map((hype) => (
          <HypeCard key={hype.id} hype={hype} />
        ))}
      </div>
    </div>
  );
};

export default History;
