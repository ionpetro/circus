import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './UserProgress.module.scss';

const UserProgress = ({ data, title, unit }) => {
  if (!data || data.length < 2) {
    return (
      <div className={styles.empty}>
        Log at least two {title ? `${title} ` : ''}records to see your progress
        over time.
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h4 className={styles.heading}>
        Your progress{title ? ` — ${title}` : ''}
        {unit && <span className={styles.unit}> ({unit})</span>}
      </h4>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 0, left: -16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
          <XAxis dataKey="date" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} domain={['dataMin', 'dataMax']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2f2f2f',
              color: 'white',
              border: 'none',
            }}
            labelStyle={{ color: '#b7b7b7' }}
            formatter={(value) => [`${value}${unit ? ` ${unit}` : ''}`, 'Score']}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#dd5828"
            strokeWidth={2}
            dot={{ fill: '#dd5828', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProgress;
