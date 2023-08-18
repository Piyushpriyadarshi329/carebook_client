export const getTimeStringFromDBTime = (time?: string) => {
  if (!time) return '';
  let hour = time.slice(0, 2);
  let ampm = 'AM';
  if (Number(hour) > 12) {
    hour = ('0' + (Number(hour) - 12).toString()).slice(-2);
    ampm = 'PM';
  }
  return hour + ' : ' + time.slice(2) + ' ' + ampm;
};
