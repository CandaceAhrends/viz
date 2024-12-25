import dayjs from 'dayjs';

export const formatDate = (date) => {
  return dayjs(date).format('ddd, MMM DD HH:mm A');
};
