import {
  getTime,
  format,
  formatDistanceToNow,
  isFuture,
  addSeconds
} from 'date-fns';

export const methods = {
  getCurrentTime() {
    return getTime(new Date());
  },
  addTime(date, seconds) {
    return getTime(addSeconds(date, seconds));
  },
  formatDate(date, str) {
    return format(date, str);
  },
  waitTime(client) {
    if (client.status === 'done') return null; // if status is done return null
    const data = {};
    const endTime = addSeconds(client.expTime, client.sessionTime);
    if (isFuture(client.expTime)) {
      data.left = formatDistanceToNow(client.expTime, { includeSeconds: true });
      data.status = 'pending';
    } else if (isFuture(endTime)) {
      data.left = '-';
      data.status = 'ongoing';
    } else {
      data.left = '';
      data.status = 'done';
    }
    return data;
  }
};

export default {
  methods
};
