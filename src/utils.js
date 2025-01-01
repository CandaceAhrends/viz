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

export const getPreviousMarketDate = (date) => {
  let previousDate = dayjs(date).subtract(1, 'day');
  if (previousDate.day() === 0) {
    // If the previous date is a Sunday, subtract 2 more days to skip the weekend
    previousDate = previousDate.subtract(2, 'day');
  } else if (previousDate.day() === 6) {
    // If the previous date is a Saturday, subtract 1 more day to skip the weekend
    previousDate = previousDate.subtract(1, 'day');
  }
  return previousDate.format('YYYY-MM-DD');
};
