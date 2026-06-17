import React, { useState, useEffect } from 'react';
import axiosInstance from '/utils/http-client';

import UserData from '../../User/UserData/UserData';
import UserProgress from '../../User/UserProgress/UserProgress';
import UserStrengthProfile from '../../User/UserStrengthProfile/UserStrengthProfile';
import UserBests from '../../User/UserBests/UserBests';
import { transformRecordDate } from '../../../utils/utilities';
import styles from './Overview.module.scss';

const Overview = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const [event, setEvent] = useState('');
  const [myRecords, setMyRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);

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

  // all accepted records across every event — powers the cross-event charts
  const fetchAllRecords = async () => {
    try {
      const response = await axiosInstance.get(recordsApi);
      setAllRecords(response);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMyRecords = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?_limit=-1&user=${user.id}`
      );
      setMyRecords(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchAllRecords();
  }, []);

  useEffect(() => {
    // guard against the initial empty event ('') which would send game=undefined
    if (event?.id) {
      fetchRecords();
    }
  }, [event]);

  useEffect(() => {
    if (user?.id) {
      fetchMyRecords();
    }
  }, [user?.id]);

  // ---- derived stats about the user ----
  const myValidRecords = myRecords.filter((r) => r.game);
  const myAccepted = myValidRecords.filter((r) => r.accepted === true);

  const latestBy = (list) =>
    list.reduce(
      (latest, r) =>
        !latest || new Date(r.created_at) > new Date(latest.created_at)
          ? r
          : latest,
      null
    );

  const eventsCompeted = new Set(myAccepted.map((r) => r.game.id)).size;
  const recordsLogged = myValidRecords.length;
  const latestPr = latestBy(myAccepted);

  // competitive context for the currently selected event leaderboard
  const competitors = new Set(
    records.filter((r) => r.user).map((r) => r.user.id)
  ).size;
  const myEventRecord = latestBy(
    records.filter((r) => r.user && r.user.id === user?.id)
  );

  // ---- chart data ----
  // 1) progression: the user's accepted scores for the selected event over time
  const progression = myAccepted
    .filter((r) => r.game.id === event?.id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((r) => ({
      date: transformRecordDate(r.created_at),
      score: Number(r.score),
    }));

  // 2) + 3) per-event gym best vs the user's best (assumes higher score = better)
  const byGame = {};
  allRecords
    .filter((r) => r.game && r.user)
    .forEach((r) => {
      const id = r.game.id;
      if (!byGame[id]) {
        byGame[id] = {
          title: r.game.title,
          unit: r.game.unit,
          gymBest: 0,
          mine: 0,
        };
      }
      const score = Number(r.score);
      if (score > byGame[id].gymBest) byGame[id].gymBest = score;
      if (r.user.id === user?.id && score > byGame[id].mine) {
        byGame[id].mine = score;
      }
    });
  const myGames = Object.values(byGame).filter((g) => g.mine > 0);

  const radarData = myGames.map((g) => ({
    event: g.title,
    you: g.gymBest ? Math.round((g.mine / g.gymBest) * 100) : 0,
  }));

  const bestsData = myGames.map((g) => ({
    event: g.title,
    you: g.mine,
    gym: g.gymBest,
  }));

  return (
    <div>
      <div className={styles.stats}>
        <div className={styles.card}>
          <div className={styles.label}>Events competed</div>
          <div className={styles.value}>{eventsCompeted}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.label}>Records logged</div>
          <div className={styles.value}>{recordsLogged}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.label}>Latest PR</div>
          {latestPr ? (
            <>
              <div className={styles.value}>
                {latestPr.score}
                {latestPr.game.unit && (
                  <span className={styles.unit}>{latestPr.game.unit}</span>
                )}
              </div>
              <div className={styles.sub}>
                {latestPr.game.title} ·{' '}
                {transformRecordDate(latestPr.created_at)}
              </div>
            </>
          ) : (
            <div className={styles.empty}>—</div>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.label}>
            {event?.title ? `Athletes in ${event.title}` : 'Athletes'}
          </div>
          <div className={styles.value}>{competitors}</div>
        </div>
      </div>

      {myEventRecord && event?.title && (
        <p className={styles.highlight}>
          Your best in {event.title}:{' '}
          <span>
            {myEventRecord.score} {myEventRecord.game?.unit}
          </span>
        </p>
      )}

      <UserProgress
        data={progression}
        title={event?.title}
        unit={event?.unit}
      />

      <UserStrengthProfile data={radarData} />

      <UserBests data={bestsData} />

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
