import React, { useEffect, useState } from 'react';
import UserData from './UserData/UserData';
import styles from './User.module.scss';
import axiosInstance from '/utils/http-client';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import UiAvatar from '../Ui/UiAvatar/UiAvatar';
import Image from 'next/image';

const User = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const [event, setEvent] = useState('');

  const date = new Date(user.created_at);

  const recordsApi = `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?_limit=-1&_sort=score:ASC,user.category:ASC&accepted=true`;

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
      const response = await axiosInstance.get(
        `${recordsApi}&game=${event.id}`
      );

      setRecords(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [event]);

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
          <div className={styles.body}>
            <UserData
              records={records}
              events={events}
              event={event}
              setEvent={setEvent}
            />
          </div>
        </div>
      </div>
      <Footer simple={true} />
    </div>
  );
};

export default User;
