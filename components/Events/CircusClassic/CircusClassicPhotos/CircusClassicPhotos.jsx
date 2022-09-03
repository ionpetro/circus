import UiCarousel from '../../../Ui/UiCarousel/UiCarousel';
import styles from './CircusClassicPhotos.module.scss';

const CircusClassicPhotos = () => {
  const media = [
    {
      id: 1,
      image: { url: '/assets/images/event-1/293A0094.jpg' },
    },
    {
      id: 3,
      image: { url: '/assets/images/event-1/293A0541.jpg' },
    },
    {
      id: 4,
      image: { url: '/assets/images/event-1/293A0952.jpg' },
    },
    {
      id: 5,
      image: { url: '/assets/images/event-1/293A1759.jpg' },
    },
    {
      id: 6,
      image: { url: '/assets/images/event-1/293A3128.jpg' },
    },
    {
      id: 2,
      image: { url: '/assets/images/event-1/293A0096.jpg' },
    },
    {
      id: 7,
      image: { url: '/assets/images/event-1/293A2646.jpg' },
    },
  ];
  return (
    <>
      <h4 className={styles.title}>PHOTO GALLERY</h4>
      <UiCarousel media={media} />
    </>
  );
};

export default CircusClassicPhotos;
