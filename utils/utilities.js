const transformDate = (date) => {
  if (date) {
    const dateArray = date.split('-');
    let d = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  }
};

export const isThreeDaysAgo = (d) => {
  const date = new Date(d).getTime();
  const threeDaysAgo = new Date().getTime() - 3 * (1000 * 60 * 60 * 24);
  return date < threeDaysAgo;
};

export default transformDate;
