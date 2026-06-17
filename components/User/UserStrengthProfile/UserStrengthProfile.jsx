import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './UserStrengthProfile.module.scss';

const UserStrengthProfile = ({ data }) => {
  if (!data || data.length < 3) {
    return (
      <div className={styles.empty}>
        Compete in at least three events to unlock your strength profile.
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h4 className={styles.heading}>
        Strength profile <span className={styles.unit}>(% of gym best)</span>
      </h4>
      <ResponsiveContainer width={'100%'} height={320}>
        <RadarChart data={data} outerRadius={'70%'}>
          <PolarGrid stroke="#2f2f2f" />
          <PolarAngleAxis dataKey="event" stroke="#b7b7b7" fontSize={12} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2f2f2f',
              color: 'white',
              border: 'none',
            }}
            formatter={(value) => [`${value}%`, 'of gym best']}
          />
          <Radar
            name="You"
            dataKey="you"
            stroke="#dd5828"
            fill="#dd5828"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStrengthProfile;
