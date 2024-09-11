import React, { useState, useEffect } from 'react';
import axiosInstance from '/utils/http-client';

import UserData from '../../User/UserData/UserData';
import styles from './Overview.module.scss';

const Overview = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const [event, setEvent] = useState('');

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
    <div>
      <UserData
        records={records}
        events={events}
        event={event}
        setEvent={setEvent}
      />
    </div>
  );
};

export default Overview;
