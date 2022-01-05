import React, { useEffect, useState } from 'react';
import DateIcon from '../../../public/assets/svgs/date.svg';
import HandIcon from '../../../public/assets/svgs/hand.svg';
import styles from './ProgramInfo.module.scss';
import { instaUrl } from '../../../utils/links';
import UiAvatar from '../../Ui/UiAvatar/UiAvatar';
import X from '../../../public/assets/svgs/x.svg';

const ProgramInfo = ({ slots }) => {
  const currentDay = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
  });
  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({});

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('hide-scroll');
    } else {
      document.body.classList.remove('hide-scroll');
    }
  }, [showModal]);

  // map appointments per day
  // ex. { monday: [], tuesday: [] } etc
  const mapPerDay = (slots) => {
    const map = {};
    slots.forEach((slot) => {
      if (!map[slot.day]) {
        map[slot.day] = [slot];
      } else {
        map[slot.day] = [...map[slot.day], slot];
      }
    });
    return map;
  };

  const SlotModal = () => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>
            {currentSlot.type}{' '}
            {<span className={styles.modalTime}>({currentSlot.time})</span>}
          </h3>
          <X onClick={() => setShowModal(false)} />
        </div>
        {currentSlot.trainers.length !== 0 && (
          <>
            <div>
              <h4>Trainers:</h4>
              <div className={styles.trainers}>
                {currentSlot.trainers.map((trainer) => (
                  <div key={trainer.id} className={styles.trainerName}>
                    <UiAvatar imgUrl={trainer.imageUrl} />{' '}
                    <h5>
                      {trainer.firstname} {trainer.lastname}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <hr />
            <br />
          </>
        )}
        <div>
          <h4>Description:</h4>
          <p>{currentSlot.description}</p>
        </div>
      </div>
    );
  };

  const openSlot = (slot) => {
    setShowModal(true);
    setCurrentSlot(slot);
  };

  const Slot = ({ slot }) => {
    return (
      <div className={styles.slot} onClick={() => openSlot(slot)}>
        <div className={styles.slotHead}>
          <h5>{slot.type}</h5>
          <div className={styles.time}>{slot.time}</div>
        </div>
        {slot.trainers && slot.trainers.length !== 0 && (
          <div className={styles.trainer}>
            <span>Trainer{slot.trainers.length > 1 && 's'}: </span>
            <div>
              {slot.trainers.map((trainer) => (
                <div key={trainer.id} className={styles.trainerName}>
                  <UiAvatar size={'small'} imgUrl={trainer.imageUrl} />{' '}
                  <span>
                    {trainer.firstname} {trainer.lastname}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <section className={styles.compWrap} id={'program'}>
        <div className={styles.heading}>
          <DateIcon />
          <h2>PROGRAM</h2>
          <p>
            Contact{' '}
            <a href={instaUrl} target={'_blank'} rel={'noreferrer'}>
              CIRCUS
            </a>{' '}
            to book a slot, and try the strongman experience
          </p>
        </div>
        <div className={styles.days}>
          {slots &&
            Object.entries(mapPerDay(slots)).map(([day, slots]) => (
              <div key={day} className={styles.dayWrapper}>
                <div className={styles.header}>
                  <div className={styles.day}>
                    <div className={styles.title}>{day}</div>
                    {day === currentDay && <HandIcon />}
                  </div>
                </div>
                <div className={styles.slots}>
                  {slots.map((slot) => (
                    <Slot key={slot.id} slot={slot} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
      {showModal && <SlotModal />}
    </div>
  );
};

export default ProgramInfo;
