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

export default transformDate;
