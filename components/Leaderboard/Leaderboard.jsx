import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/http-client';
import styles from './Leaderboard.module.scss';
import Navbar from '../Shared/Navbar/Navbar';
import UiSelect from '../Ui/UiSelect/UiSelect';
import Footer from '../Shared/Footer/Footer';
import UiToggle from '../Ui/UiToggle/UiToggle';
import LeaderboardTable from './LeaderboardTable/LeaderboardTable';
import categories from '../../utils/categories';

const Leaderboard = () => {
  const [records, setRecords] = useState([]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState('');
  const [freeze, setFreeze] = useState(true);
  const [category, setCategory] = useState('total');
  const delay = 10; //seconds

  const recordsApi = `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?_sort=score:DESC,user.category:ASC&accepted=true`;

  // initial load
  useEffect(() => {
    fetchEvents();
    if (events) {
      fetchRecords();
    }
  }, []);

  // filter apply
  useEffect(() => {
    fetchRecords();
  }, [event, category]);

  // freeze functionality
  useEffect(() => {
    if (!freeze) {
      const interval = setInterval(() => {
        setEvent((event) => events[event.id % events.length]);
      }, delay * 1000);
      return () => clearInterval(interval);
    }
  }, [freeze, events]);

  const findEvent = (eventTitle) => {
    const e = events.find((option) => option.title === eventTitle);
    return e ? e : null;
  };

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
      const response =
        category === 'total'
          ? await axiosInstance.get(`${recordsApi}&game=${event.id}`)
          : await axiosInstance.get(
              `${recordsApi}&game=${event.id}&user.category=${category}&_limit=-1`
            );
      setRecords(response);
    } catch (e) {
      console.log(e);
    }
  };

  const freezeTable = (e) => {
    setEvent(events[0]);
    setFreeze(e.target.checked);
  };

  return (
    <div className={styles.compWrap}>
      <div>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{event.title}</h2>
            <div className={styles.toggle}>
              <span>freeze</span>
              <UiToggle
                name={'freeze'}
                label={true}
                checked={freeze}
                type={'checkbox'}
                onChange={(e) => freezeTable(e)}
              />
            </div>
          </div>
          {events.length > 0 && (
            <div className={styles.filters}>
              <UiSelect
                className={styles.filter}
                name={'event'}
                options={events}
                value={event.title}
                onChange={(e) => setEvent(findEvent(e.target.value))}
              />
              <UiSelect
                className={styles.filter}
                name={'body category'}
                options={categories}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          )}
          <LeaderboardTable records={records} />
          {records.length === 0 && (
            <span className={styles.empty}>Where is everybody?</span>
          )}
          {records.length > 0 && (
            <div className={styles.notice}>
              The records shown above 👆 have been approved by the{' '}
              <a
                href={'https://j.gifs.com/rRkznp.gif'}
                target={'_blank'}
                rel={'noreferrer'}
              >
                circus committee
              </a>
              <br />
              In case of error, please contact{' '}
              <a
                href={'https://www.instagram.com/johnboursi/'}
                target={'_blank'}
                rel={'noreferrer'}
              >
                @boursi
              </a>{' '}
              or{' '}
              <a
                href={'https://www.instagram.com/ionpetro/'}
                target={'_blank'}
                rel={'noreferrer'}
              >
                @admin
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer simple />
    </div>
  );
};

export default Leaderboard;
