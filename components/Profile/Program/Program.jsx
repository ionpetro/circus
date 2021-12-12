import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../../utils/http-client';
import ProgramSlot from '../ProgramSlot/ProgramSlot';
import HandIcon from '../../../public/assets/svgs/hand.svg';
import UserContext from '../../../contexts/UserContext';
import styles from './Program.module.scss';
import UiSpinner from '../../Ui/UiSpinner/UiSpinner';
import ProgramDetails from '../ProgramDetails/ProgramDetails';
import ProgramNotice from '../ProgramNotice/ProgramNotice';
import ClawnIcon from '../../../public/assets/svgs/Clawn.svg';
import Link from 'next/link';
import { daysUntilDate } from '../../../utils/utilities';
import { useRouter } from 'next/router';

const Program = () => {
  const currentDay = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
  });
  const threshold = 10;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalDay, setModalDay] = useState(undefined);
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsForUser, setAppointmentsForUser] = useState([]);
  const [slotsPerDay, setSlotsPerDay] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { user } = useContext(UserContext);
  const planLock = user?.plan === 'basic' && appointmentsForUser.length === 2;

  const fetchSlots = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/slots`
      );
      setSlots(response);
    } catch (e) {}
  };

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/appointments?_limit=-1`
      );
      setAppointments(response);
    } catch (e) {}
  };

  const fetchAppointmentsForUser = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/appointments?user=${user.id}`
      );
      setAppointmentsForUser(response);
    } catch (e) {}
  };

  useEffect(() => {
    fetchSlots();
    fetchAppointments();
    setLoading(false);
  }, []);

  useEffect(() => {
    mapPerDay();
  }, [slots]);

  useEffect(() => {
    fetchAppointmentsForUser();
  }, [appointments, user]);

  // disable the slot if another slot is book
  // for that specific day
  const checkIfDisabled = (day, slot) => {
    let appointmentsForDay = appointmentsForUser.filter(
      (appointment) => appointment.slot.day === slot.day
    );
    return (
      appointmentsForDay.length === 1 &&
      appointmentsForDay[0].slot.id !== slot.id
    );
  };

  // map appointments per day
  // ex. { monday: [], tuesday: [] } etc
  const mapPerDay = () => {
    const map = {};
    slots.forEach((slot) => {
      if (!map[slot.day]) {
        map[slot.day] = [slot];
      } else {
        map[slot.day] = [...map[slot.day], slot];
      }
    });
    setSlotsPerDay(map);
  };

  // returns appointment id if found, else false
  const activeAppId = (slot) => {
    const appointmentFound = appointments.find(
      (appointment) =>
        appointment?.slot.id === slot.id && appointment?.user.id === user?.id
    );
    if (appointmentFound) {
      return appointmentFound.id;
    } else {
      return false;
    }
  };

  const detailsClicked = (day) => {
    setModalDay(day);
    setShowModal(true);
  };

  if (
    user?.payment_due &&
    daysUntilDate(user?.payment_due) < 0 &&
    daysUntilDate(user?.payment_due) < -threshold
  ) {
    return (
      <div className={styles.payDue}>
        <ClawnIcon />
        <p>
          You are more than 10 days late to your payment. Contact{' '}
          <a
            href={'https://www.instagram.com/johnboursi/'}
            target={'_blank'}
            rel={'noreferrer'}
          >
            John Boursi
          </a>{' '}
          to unlock the program or consider{' '}
          <a onClick={() => router.reload()}>refreshing</a> the page
        </p>
      </div>
    );
  }

  if (loading) {
    return <UiSpinner />;
  }

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}
      {user?.payment_due && <ProgramNotice paymentDue={user?.payment_due} />}
      {slotsPerDay &&
        Object.entries(slotsPerDay).map(([day, slots]) => (
          <div key={day} className={styles.dayWrapper}>
            <div className={styles.header}>
              <div className={styles.day}>
                <div className={styles.title}>{day}</div>
                {day === currentDay && <HandIcon />}
              </div>
              <div
                tabIndex={0}
                role={'button'}
                onClick={() => detailsClicked(day)}
              >
                <span className={styles.details}>Details</span>
              </div>
            </div>
            <div className={styles.slots}>
              {slots.map((slot) => (
                <ProgramSlot
                  key={slot.id}
                  slot={slot}
                  appointments={appointments}
                  setError={setError}
                  setAppointments={setAppointments}
                  activeAppId={activeAppId(slot)}
                  planLockEnabled={planLock}
                  disabled={checkIfDisabled(day, slot)}
                />
              ))}
            </div>
          </div>
        ))}
      {showModal && (
        <ProgramDetails setShowModal={setShowModal} modalDay={modalDay} />
      )}
    </div>
  );
};

export default Program;
