import dayjs from 'dayjs';

export const formatDate = (date) => {
  return dayjs(date).format('ddd, MMM DD HH:mm A');
};

export const getDateForChart = (time) => {
  try {
    const [hour, minute] = time.split(':');
    const currentChartDate = dayjs()
      .set('hour', parseInt(hour))
      .set('minute', parseInt(minute))
      .set('second', 0);
    return currentChartDate;
  } catch (e) {
    throw new Error('Invalid time format');
  }
};
