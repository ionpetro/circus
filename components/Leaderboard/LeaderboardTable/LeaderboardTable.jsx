import React, { useContext } from 'react';
import styles from './LeaderboardTable.module.scss';
import UiAvatar from '../../Ui/UiAvatar/UiAvatar';
import { transformRecordDate } from '../../../utils/utilities';
import UserContext from '../../../contexts/UserContext';
import categories from '../../../utils/categories';
import Gold from '../../../public/assets/svgs/Gold.svg';
import Silver from '../../../public/assets/svgs/Silver.svg';
import Bronze from '../../../public/assets/svgs/Bronze.svg';

const LeaderboardTable = ({ records }) => {
  const { user } = useContext(UserContext);

  const getRank = (index) => {
    switch (index) {
      case 1:
        return <Gold />;
      case 2:
        return <Silver />;
      case 3:
        return <Bronze />;
      default:
        return index;
    }
  };

  const getCategoryDisplayValue = (category) => {
    return categories.find((cat) => cat.title === category).display;
  };

  return (
    <table className={styles.table}>
      <tr className={styles.head}>
        <th>#</th>
        <th>Name</th>
        <th>PR</th>
        <th className={styles.mobileHide}>Date</th>
        <th className={styles.mobileHide}>Category</th>
      </tr>
      {records.length > 0 &&
        records.map((record, index) => (
          <tr
            key={record.id}
            className={`${styles.body} ${
              record.user.id === user?.id && styles.active
            }`}
          >
            <td className={styles.rank}>{getRank(index + 1)}</td>
            <td className={styles.user}>
              <UiAvatar imgUrl={record.user?.imageUrl} />
              {record.user.username}
            </td>
            <td className={styles.score}>
              {record.score}{' '}
              <span className={styles.unit}>{record.game.unit}</span>
            </td>
            <td className={styles.mobileHide}>
              {transformRecordDate(record.updated_at)}
            </td>
            <td className={styles.mobileHide}>
              {getCategoryDisplayValue(record.user.category)}
            </td>
          </tr>
        ))}
    </table>
  );
};

export default LeaderboardTable;
