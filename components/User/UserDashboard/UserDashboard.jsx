import React, { useState, useEffect } from 'react';
import axiosInstance from '/utils/http-client';

import UserData from '../UserData/UserData';
import UserProgress from '../UserProgress/UserProgress';
import UserStrengthProfile from '../UserStrengthProfile/UserStrengthProfile';
import UserBests from '../UserBests/UserBests';
import UiSpinner from '../../Ui/UiSpinner/UiSpinner';
import { transformRecordDate } from '../../../utils/utilities';
import styles from './UserDashboard.module.scss';

const UserDashboard = ({ user, possessive = 'Your' }) => {
  const [events, setEvents] = useState([]);
  const [records, setRecords] = useState([]);
  const [event, setEvent] = useState('');
  const [subjectRecords, setSubjectRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const recordsApi = `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?_limit=-1&_sort=score:ASC,user.category:ASC&accepted=true`;

  const fetchEvents = async () => {
    try {
      const eventsResponse = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/games`
      );
      setEvents(eventsResponse);
      if (eventsResponse && eventsResponse.length) {
        setEvent(eventsResponse[0]);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axiosInstance.get(`${recordsApi}&game=${event.id}`);
      setRecords(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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

  // every record (any status) belonging to the profile's owner
  const fetchSubjectRecords = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/pivot-games-users?_limit=-1&user=${user.id}`
      );
      setSubjectRecords(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchAllRecords();
  }, []);

  useEffect(() => {
    if (event?.id) {
      fetchRecords();
    }
  }, [event]);

  useEffect(() => {
    if (user?.id) {
      fetchSubjectRecords();
    }
  }, [user?.id]);

  // ---- derived stats about the subject ----
  const validRecords = subjectRecords.filter((r) => r.game);
  const accepted = validRecords.filter((r) => r.accepted === true);

  const latestBy = (list) =>
    list.reduce(
      (latest, r) =>
        !latest || new Date(r.created_at) > new Date(latest.created_at)
          ? r
          : latest,
      null
    );

  const eventsCompeted = new Set(accepted.map((r) => r.game.id)).size;
  const recordsLogged = validRecords.length;
  const latestPr = latestBy(accepted);

  // competitive context for the currently selected event leaderboard
  const competitors = new Set(
    records.filter((r) => r.user).map((r) => r.user.id)
  ).size;
  const eventRecord = latestBy(
    records.filter((r) => r.user && r.user.id === user?.id)
  );

  // ---- chart data ----
  // progression: the subject's accepted scores for the selected event over time
  const progression = accepted
    .filter((r) => r.game.id === event?.id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((r) => ({
      date: transformRecordDate(r.created_at),
      score: Number(r.score),
    }));

  // per-event gym best vs the subject's best (assumes higher score = better)
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
  const subjectGames = Object.values(byGame).filter((g) => g.mine > 0);

  const radarData = subjectGames.map((g) => ({
    event: g.title,
    you: g.gymBest ? Math.round((g.mine / g.gymBest) * 100) : 0,
  }));

  const bestsData = subjectGames.map((g) => ({
    event: g.title,
    you: g.mine,
    gym: g.gymBest,
  }));

  if (loading) {
    return (
      <div className={styles.loading}>
        <UiSpinner />
      </div>
    );
  }

  return (
    <div>
      <UserData
        records={records}
        events={events}
        event={event}
        setEvent={setEvent}
      />

      {eventRecord && event?.title && (
        <p className={styles.highlight}>
          {possessive} best in {event.title}:{' '}
          <span>
            {eventRecord.score} {eventRecord.game?.unit}
          </span>
        </p>
      )}

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

      <UserProgress
        data={progression}
        title={event?.title}
        unit={event?.unit}
        possessive={possessive}
      />

      <UserStrengthProfile data={radarData} />

      <UserBests data={bestsData} possessive={possessive} />
    </div>
  );
};

export default UserDashboard;
