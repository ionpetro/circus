import React, { useContext, useEffect, useState } from 'react';
import UiAvatar from '../../Ui/UiAvatar/UiAvatar';
import axiosInstance from '../../../utils/http-client';
import UserContext from '../../../contexts/UserContext';

import styles from './ProgramSlot.module.scss';

const ProgramSlot = ({
  slot,
  appointments,
  setAppointments,
  setError,
  activeAppId,
  planLockEnabled,
  disabled,
}) => {
  const [bookings, setBookings] = useState([]);
  const [substitutions, setSubstitutions] = useState([]);
  const { user } = useContext(UserContext);
  // basic plan check
  const planLocked = planLockEnabled && !activeAppId;
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const apps = appointments
      .filter((appointment) => appointment.slot.id === slot.id)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setBookings(apps.slice(0, slot.availability));
    if (apps.length > slot.availability) {
      setSubstitutions(apps.slice(slot.availability));
    } else {
      setSubstitutions([]);
    }
  }, [appointments, slot.id]);

  const deleteSlot = async (id) => {
    let response;
    try {
      response = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BACKEND}/appointments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(response);
      setError('');
    } catch (e) {
      setError(e.response?.data?.message);
    }
  };

  const bookSlot = async () => {
    let response;
    try {
      response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/appointments`,
        {
          user: user.id,
          slot: slot.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(response);
      setError('');
    } catch (e) {
      setError(e.response?.data?.message);
    }
  };

  // exclude monday from disable checking
  const validForAction = () => {
    if (slot.day === 'Monday') {
      return true;
    } else return !(disabled || planLocked);
  };

  const handleSlotClick = () => {
    // booked another slot this day
    // or can not book due to basic plan
    if (!validForAction()) {
      return;
    }

    // only vip users can book for vip slots
    if (!user.vip && slot.vip) {
      setError('Oups! Not a vip member');
      return;
    }

    // the slot is active, so proceed with cancel
    if (activeAppId) {
      deleteSlot(activeAppId);
      // the slot is free, so boot the slot
    } else {
      bookSlot();
    }
  };

  return (
    <div
      className={`${styles.compWrap} ${activeAppId && styles.activeOption} ${!validForAction() && styles.disabledOption
        } ${slot.vip && styles.vip}`}
      role={'button'}
      tabIndex={0}
      onClick={handleSlotClick}
    >
      <div>
        <div className={styles.header}>
          <h5 className={`${slot.vip && styles.vipText}`}>{slot.type}</h5>
          <span className={`${styles.time} ${slot.vip && styles.vipText}`}>
            {slot.time}
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.bookings}>
              {bookings.map((booking) => (
                <div key={booking.id}>
                  {booking.user && (
                    <div title={booking.user.username}>
                      <UiAvatar
                        imgUrl={booking.user.imageUrl}
                        size={'small'}
                        isHero={booking.user.vip}
                      />
                    </div>)}
                </div>))}
            </div>
          </div>
          <div className={styles.subs}>
            {substitutions.length > 0 ? (
              <div className={styles.subText}>Substitutions:</div>
            ) : null}
            <div className={styles.substitutions}>
              {substitutions.map((substitution) => (
                <div title={substitution.user.username} key={substitution.id}>
                  <UiAvatar
                    imgUrl={substitution.user.imageUrl}
                    size={'small'}
                    isHero={substitution.user.vip}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.subText} ${styles.availableSlots} ${slot.vip && styles.vipText
          }`}
      >
        Available: {slot.availability - bookings.length} slots
      </div>
    </div >
  );
};

export default ProgramSlot;
