import React, { useEffect, useState } from 'react';
import axiosInstance from '/utils/http-client';
import styles from './CircusClassicResults.module.scss';
import Gold from '/public/assets/svgs/Gold.svg';
import Silver from '/public/assets/svgs/Silver.svg';
import Bronze from '/public/assets/svgs/Bronze.svg';
import UiAvatar from '../../../UiAvatar/UiAvatar';
import UiTag from '../../../UiTag/UiTag';

const categories = {
  a: '< 65 kg',
  b: '< 80 kg',
  c: '< 100 kg',
  d: '> 100 kg',
};

const CircusClassicResults = () => {
  const [records, setRecords] = useState([]);
  const [category, setCategory] = useState('total');
  const recordsApi = `${process.env.NEXT_PUBLIC_BACKEND}/circus-classics?_sort=score:DESC,category:ASC`;

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

  const fetchRecords = async () => {
    try {
      const response =
        category === 'total'
          ? await axiosInstance.get(`${recordsApi}`)
          : await axiosInstance.get(`${recordsApi}&category=${category}`);
      setRecords(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [category]);

  const getCategoryDisplayValue = (category) => {
    return categories[category];
  };

  // empty state
  if (records.length === 0 && category === 'total') {
    return (
      <>
        <h4>RESULTS</h4>
        <div className={styles.empty}>
          Live score will be updated during the event
        </div>
      </>
    );
  }

  return (
    <>
      <h4>RESULTS</h4>
      <p className={styles.category}>Categories</p>
      <div className={styles.tags}>
        <UiTag
          key={'f'}
          onClick={() => setCategory('total')}
          selected={category === 'total'}
        >
          total
        </UiTag>
        {Object.entries(categories).map(([key, value]) => (
          <UiTag
            key={key}
            onClick={() => setCategory(key)}
            selected={category === key}
          >
            {value}
          </UiTag>
        ))}
      </div>
      <table className={styles.table}>
        <tr className={styles.head}>
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
          <th className={styles.mobileHide}>Category</th>
        </tr>
        {records.length > 0 &&
          records.map((record, index) => (
            <tr key={record.id} className={`${styles.body}`}>
              <td className={styles.rank}>{getRank(index + 1)}</td>
              {
                <td className={styles.user}>
                  <UiAvatar imgUrl={record.user?.imageUrl} />
                  {record.user ? record.user.username : record.name}
                </td>
              }
              <td className={styles.score}>{record.score} </td>
              <td className={styles.mobileHide}>
                {getCategoryDisplayValue(record.category)}
              </td>
            </tr>
          ))}
      </table>
      {records.length === 0 && (
        <div className={styles.emptyTable}>Nothing here (yet)</div>
      )}
    </>
  );
};

export default CircusClassicResults;
