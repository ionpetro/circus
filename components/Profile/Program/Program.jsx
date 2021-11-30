import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../../utils/http-client';
import ProgramSlot from '../ProgramSlot/ProgramSlot';
import HandIcon from '../../../public/assets/svgs/hand.svg';
import UserContext from '../../../contexts/UserContext';
import styles from './Program.module.scss';
import ProgramInfo from '../ProgramInfo/ProgramInfo';
import UiSpinner from '../../Ui/UiSpinner/UiSpinner';

const Program = () => {
  const currentDay = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
  });
  const [loading, setLoading] = useState(false);
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
        `${process.env.NEXT_PUBLIC_BACKEND}/appointments`
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
    setLoading(true);
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

  if (loading) {
    return <UiSpinner />;
  }

  // returns appointment id if found, else false
  const activeAppId = (slot) => {
    const appointmentFound = appointments.find(
      (appointment) =>
        appointment.slot.id === slot.id && appointment.user.id === user?.id
    );
    if (appointmentFound) {
      return appointmentFound.id;
    } else {
      return false;
    }
  };

  return (
    <div>
      {error && <div className={styles.error}>{error}</div>}
      {/*<ProgramInfo bookings={appointmentsForUser.length} />*/}
      {slotsPerDay &&
        Object.entries(slotsPerDay).map(([day, slots]) => (
          <div key={day} className={styles.dayWrapper}>
            <div className={styles.day}>
              <div className={styles.title}>{day}</div>
              {day === currentDay && <HandIcon />}
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
    </div>
  );
};

export default Program;
