import React, { useEffect, useState } from 'react';
import X from '../../../public/assets/svgs/x.svg';
import axiosInstance from '../../../utils/http-client';
import styles from './ProgramDetails.module.scss';
import UiSpinner from '../../Ui/UiSpinner/UiSpinner';
import UiAvatar from '../../Ui/UiAvatar/UiAvatar';

export default function ProgramDetails({ setShowModal, modalDay }) {
  const [appForDay, setAppForDay] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointmentsForDay = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/appointments?slot.day=${modalDay}`
      );
      setAppForDay(perSlotConverter(response));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalDay) {
      fetchAppointmentsForDay();
    }
  }, [modalDay]);

  console.log(appForDay);

  // map users per time
  // ex. { '11:00 - 13:00': [user1, user2] } etc
  const perSlotConverter = (appForDay) => {
    const map = {};
    appForDay.forEach((app) => {
      if (!map[app.slot.time]) {
        map[app.slot.time] = [app.user];
      } else {
        map[app.slot.time] = [...map[app.slot.time], app.user];
      }
    });
    return map;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h3>{modalDay}</h3>
        <X onClick={() => setShowModal(false)} />
      </div>
      {loading ? (
        <UiSpinner />
      ) : Object.keys(appForDay).length === 0 ? (
        <div>No bookings</div>
      ) : (
        <div className={styles.slots}>
          {Object.entries(appForDay).map(([time, users]) => (
            <div key={`${time}${users.id}`} className={styles.slot}>
              <div>{time}</div>
              <hr />
              <div>
                {users.map((user) => (
                  <div className={styles.user} key={user.id}>
                    <UiAvatar imgUrl={user.imageUrl} />
                    <div>{user.username}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
