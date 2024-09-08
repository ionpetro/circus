import React, { useEffect, useState } from 'react';
import styles from './User.module.scss';
import axiosInstance from '/utils/http-client';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import UiAvatar from '../Ui/UiAvatar/UiAvatar';
import Strongman from '../../public/assets/svgs/Error.svg';
import Image from 'next/image';

const User = ({ user }) => {
  const [events, setEvents] = useState([]);

  const [event, setEvent] = useState('');

  const date = new Date(user.created_at);

  const recordsApi = `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?_sort=score:DESC,user.category:ASC&accepted=true`;
  const eventId = 2;
  const category = 'total';

  const fetchEvents = async () => {
    try {
      const eventsResponse = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/games`
      );
      setEvents(eventsResponse);
      setEvent(eventsResponse[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axiosInstance.get(`${recordsApi}&game=${eventId}`);

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRecords();
  }, []);

  return (
    <div className={styles.compWrap}>
      <div>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.header}>
          {' '}
          <Image
            unoptimized
            alt={'navbar background overlay'}
            src={'/assets/svgs/userBack.svg'}
            layout={'fill'}
            objectFit={'cover'}
            objectPosition={'center'}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <UiAvatar
              imgUrl={user.imageUrl}
              size={'xlarge'}
              isHero={user.vip}
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.fullName}>
              {user.firstname && user.lastname
                ? `${user.firstname} ${user.lastname}`
                : 'Strongman wannabe'}
            </div>
            <div className={styles.info}>
              @{user.username} • Joined{' '}
              {`${date.toLocaleString('default', {
                month: 'long',
              })} ${date.getFullYear()}`}
            </div>
          </div>
          <div className={styles.body}>test</div>
        </div>
      </div>
      <Footer simple={true} />
    </div>
  );
};

export default User;
