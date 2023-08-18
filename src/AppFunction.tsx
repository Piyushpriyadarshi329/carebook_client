export function showtime(timestamp?: number) {
  if (!timestamp) return '';
  let date = new Date(timestamp);

  let hour = date.getHours();
  let am_pm = 'AM';

  if (hour > 12) {
    hour = hour - 12;
    am_pm = 'PM';
  }

  let min = date.getMinutes();

  return ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ' ' + am_pm;
}

export function sendtime(timestamp?: number) {
  if (!timestamp) return '';
  let date = new Date(timestamp);

  let hour = date.getHours();

  let min = date.getMinutes();

  return ('0' + hour).slice(-2) + ('0' + min).slice(-2);
}
