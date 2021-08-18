import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import styles from './UiCarousel.module.scss';
// import Image from 'next/image';
import Arrow from '../../public/assets/svgs/arrow.svg';

const UiCarousel = ({ media }) => {
  const images = () => {
    return media.map((image) => (
      <div key={image.id}>
        <img
          src={image.image.url}
          alt={image.title}
          // width={image.image.width}
          // height={image.image.height}
        />
        <div className={'legend'}>
          <h3>{image.title}</h3>
          {image.description && <p>{image.description}</p>}
        </div>
      </div>
    ));
  };

  return (
    <Carousel
      className={styles.carousel}
      infiniteLoop
      swipeable={true}
      autoPlay={false}
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
