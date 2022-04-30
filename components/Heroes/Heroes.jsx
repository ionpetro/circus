import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import axiosInstance from '../../utils/http-client';
import Flex from '../../public/assets/svgs/flex.svg';
import HeroesList from './HeroesList/HeroesList';
import styles from './Heroes.module.scss';

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);

  const fetchHeroes = async () => {
    try {
      const heroesResponse = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/users?vip=true`
      );
      setHeroes(heroesResponse);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <div className={styles.compWrap}>
      <div>
        <Navbar />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Flex />
            <h2 className={styles.title}>Heroes</h2>
            <Flex />
          </div>
          <div className={styles.subheader}>- The f*cking elite of circus</div>
        </div>
        <HeroesList heroes={heroes} />
      </div>
      <Footer simple />
    </div>
  );
};

export default Heroes;
