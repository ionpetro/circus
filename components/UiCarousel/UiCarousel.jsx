import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import styles from './UiCarousel.module.scss';
import Image from 'next/image';
import Arrow from '../../public/assets/svgs/arrow.svg';

const imageData = [
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/altas-balls_rcr7ls.jpg',
    name: 'Atlas Balls',
    description: 'Very very heavy',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/weights_rzyv15.jpg',
    name: 'Weights',
    description: 'Super douper heavy',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/deck_podm5y.jpg',
    name: 'Deck',
    description: 'Ultra supra heavy',
  },
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/altas-balls_rcr7ls.jpg',
    name: 'Atlas Balls',
    description: 'Very very heavy',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/weights_rzyv15.jpg',
    name: 'Weights',
    description: 'Super douper heavy',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/deck_podm5y.jpg',
    name: 'Deck',
    description: 'Ultra supra heavy',
  },
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/altas-balls_rcr7ls.jpg',
    name: 'Atlas Balls',
    description: 'Very very heavy',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/weights_rzyv15.jpg',
    name: 'Weights',
    description: 'Super douper heavy',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/deck_podm5y.jpg',
    name: 'Deck',
    description: 'Ultra supra heavy',
  },
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/altas-balls_rcr7ls.jpg',
    name: 'Atlas Balls',
    description: 'Very very heavy',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/weights_rzyv15.jpg',
    name: 'Weights',
    description: 'Super douper heavy',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/deck_podm5y.jpg',
    name: 'Deck',
    description: 'Ultra supra heavy',
  },
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/altas-balls_rcr7ls.jpg',
    name: 'Atlas Balls',
    description: 'Very very heavy',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/weights_rzyv15.jpg',
    name: 'Weights',
    description: 'Super douper heavy',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/deck_podm5y.jpg',
    name: 'Deck',
    description: 'Ultra supra heavy',
  },
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/altas-balls_rcr7ls.jpg',
    name: 'Atlas Balls',
    description: 'Very very heavy',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/weights_rzyv15.jpg',
    name: 'Weights',
    description: 'Super douper heavy',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/ionpetro/image/upload/v1627654326/deck_podm5y.jpg',
    name: 'Deck',
    description: 'Ultra supra heavy',
  },
];

const UiCarousel = () => {
  const images = () => {
    return imageData.map((image) => (
      <div key={image.id}>
        <img src={image.imageUrl} alt={image.name} />
        <div className={`legend ${styles.description}`}>
          <h3>{image.name}</h3>
          <p>{image.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <Carousel
      className={styles.carousel}
      infiniteLoop
      dynamicHeight={true}
      swipeable={true}
      autoPlay={true}
      showStatus={false}
      showIndicators={false}
      interval={3000}
      thumbWidth={100}
      renderArrowPrev={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`${styles.arrow} ${styles.left}`}
          >
            <Arrow />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`${styles.arrow} ${styles.right}`}
          >
            <Arrow />
          </button>
        )
      }
    >
      {images()}
    </Carousel>
  );
};

export default UiCarousel;
