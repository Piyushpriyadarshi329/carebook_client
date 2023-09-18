import moment from 'moment';

export function sendtime(timestamp?: number) {
  if (!timestamp) return '';
  let date = new Date(timestamp);

  let hour = date.getHours();

  let min = date.getMinutes();

  return ('0' + hour).slice(-2) + ('0' + min).slice(-2);
}

export const getTimeStringFromDBTime = (time?: string) => {
  if (!time) return '';
  let hour = time.slice(0, 2);
  let ampm = 'AM';
  if (Number(hour) === 12) {
    ampm = 'PM';
  }
  if (Number(hour) > 12) {
    hour = ('0' + (Number(hour) - 12).toString()).slice(-2);
    ampm = 'PM';
  }
  return hour + ' : ' + time.slice(2) + ' ' + ampm;
};

export const showDate = (date: Date) => {
  return moment(date).day;
};
