import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import styles from './UserData.module.scss';
import UserContext from '../../../contexts/UserContext';
import { useContext } from 'react';
import UiSelect from '../../Ui/UiSelect/UiSelect';

const UserData = ({ records, events, event, setEvent }) => {
  const { user } = useContext(UserContext);

  const onEventChange = (e) => {
    setEvent(findEvent(e.target.value));
  };

  const findEvent = (eventTitle) => {
    const e = events.find((option) => option.title === eventTitle);
    return e ? e : null;
  };

  const latestRecords = Array.from(
    records
      .reduce((map, obj) => {
        const userId = obj.user.id;
        const existingObj = map.get(userId);

        // Compare and keep the latest `created_at`
        if (
          !existingObj ||
          new Date(obj.created_at) > new Date(existingObj.created_at)
        ) {
          map.set(userId, obj);
        }

        return map;
      }, new Map())
      .values()
  ).map((record) => ({
    // map to a data format
    user: record.user.username,
    score: record.score,
    fill: record.user.username === user?.username ? '#dd5828' : '#888888',
  }));

  return (
    <>
      {event && (
        <UiSelect
          className={styles.filter}
          name={'event'}
          options={events}
          value={event.title}
          onChange={onEventChange}
        />
      )}
      <ResponsiveContainer width={700} height={500}>
        <CartesianGrid strokeDasharray="3 3" />

        <BarChart width={730} height={250} data={latestRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: '#2f2f2f', color: 'white' }}
          />
          <Bar dataKey="score" fill="fill" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserData;
