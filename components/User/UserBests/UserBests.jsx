import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './UserBests.module.scss';

const UserBests = ({ data, possessive = 'Your' }) => {
  if (!data || !data.length) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <h4 className={styles.heading}>{possessive} best vs gym best</h4>
      <ResponsiveContainer width={'100%'} height={Math.max(200, data.length * 56)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, bottom: 0, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" horizontal={false} />
          <XAxis type="number" stroke="#888888" fontSize={12} />
          <YAxis
            type="category"
            dataKey="event"
            stroke="#b7b7b7"
            fontSize={12}
            width={90}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.06)' }}
            contentStyle={{
              backgroundColor: '#2f2f2f',
              color: 'white',
              border: 'none',
            }}
          />
          <Legend />
          <Bar dataKey="you" name="You" fill="#dd5828" />
          <Bar dataKey="gym" name="Gym best" fill="#888888" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserBests;
