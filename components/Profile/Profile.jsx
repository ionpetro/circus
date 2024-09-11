import React, { useContext, useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import UserContext from '../../contexts/UserContext';
import Records from './Records/Records';
import Overview from './Overview/Overview';
import EditProfile from './EditProfile/EditProfile';
import Navbar from '../Shared/Navbar/Navbar';
import pages from '../../utils/profile-pages';
import Program from './Program/Program';
import UserInfo from './UserInfo/UserInfo';
import { Calendar, Medal, LayoutDashboard } from 'lucide-react';
import styles from './Profile.module.scss';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(pages.PROGRAM);

  return (
    <div className={styles.compWrap}>
      <Navbar />

      <div className={styles.center}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <h1>PROFILE</h1>
            <UserInfo page={page} setPage={setPage} />
          </div>
          <div className={styles.page}>
            {page !== pages.USER && (
              <div className={styles.tabs}>
                <h3
                  className={`${styles.tab} ${
                    page === pages.OVERVIEW && styles.activeTab
                  }`}
                  onClick={() => {
                    setPage(pages.OVERVIEW);
                  }}
                >
                  <LayoutDashboard className={styles.icon} />
                  <span>Overview</span>
                </h3>
                <h3
                  className={`${styles.tab} ${
                    page === pages.PROGRAM && styles.activeTab
                  }`}
                  onClick={() => {
                    setPage(pages.PROGRAM);
                  }}
                >
                  <Calendar className={styles.icon} />
                  <span>Program</span>
                </h3>
                <h3
                  className={`${styles.tab} ${
                    page === pages.RECORDS && styles.activeTab
                  }`}
                  onClick={() => {
                    setPage(pages.RECORDS);
                  }}
                >
                  <Medal className={styles.icon} />
                  <span>Records</span>
                </h3>
              </div>
            )}
            {page === pages.OVERVIEW && <Overview user={user} />}
            {page === pages.RECORDS && <Records userId={user?.id} />}
            {page === pages.PROGRAM && <Program />}
            {page === pages.USER && <EditProfile setPage={setPage} />}
          </div>
        </div>
      </div>
      <Footer simple />
    </div>
  );
};

export default Profile;
