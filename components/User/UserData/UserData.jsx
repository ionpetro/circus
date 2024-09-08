import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { transformDateShort } from '../../../utils/utilities';

const UserData = ({ records, events }) => {
  console.log(events);
  const formatedRecords = records.map((event) => ({
    date: transformDateShort(event.created_at),
    score: event.score,
  }));

  console.log(formatedRecords);
  return (
    <ResponsiveContainer width={700} height={500}>
      <LineChart
        width={730}
        height={250}
        data={formatedRecords}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserData;
