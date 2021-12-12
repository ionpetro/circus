const transformDate = (date) => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  if (date) {
    return new Date(date)
      .toLocaleTimeString('en-us', options)
      .split(',')
      .join('');
  }
  return null;
};

export const transformRecordDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
  });
};

export const isThreeDaysAgo = (d) => {
  const date = new Date(d).getTime();
  const threeDaysAgo = new Date().getTime() - 3 * (1000 * 60 * 60 * 24);
  return date < threeDaysAgo;
};

export const calculateCountdown = (date) => {
  const now = new Date().getTime();
  const festivalDate = new Date(date);
  const distance = festivalDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    return { expired: true };
  }

  return { days, hours, minutes, seconds };
};

/**
 * Return days until a date is reached
 * Return positive if date is after today
 * Return 0 if today is the date
 * Return negative if date is before today (expired state)
 * @param date
 * @returns days passed {number}
 */
export const daysUntilDate = (date) => {
  const givenDate = new Date(date).getTime();
  const today = new Date().getTime();
  const daysToExpiration = givenDate - today;

  return Math.floor(daysToExpiration / (1000 * 3600 * 24));
};

export default transformDate;
