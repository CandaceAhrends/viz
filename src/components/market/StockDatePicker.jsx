import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDate } from '../../features/stocksSlice';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import './market.scss';

const StockDatePicker = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.stocks.date);
  const [selectedDate, setSelectedDate] = React.useState(null);

  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(dayjs(date)));
    }
  }, [date]);

  const updateMarketDate = (date) => {
    const dayjsDate = dayjs(date);
    dispatch(setDate(dayjsDate.format('YYYY-MM-DD')));
  };

  const handleDate = (date) => {
    setSelectedDate(date);
    updateMarketDate(date);
  };

  return (
    <div className="flex justify-center h-[30rem]">
      <div className="datepicker-container">
        <DatePicker
          selected={selectedDate}
          showIcon
          popperPlacement="top-end"
          inline
          onChange={(date) => handleDate(date)}
          filterDate={(date) =>
            date.getDay() !== 0 && date.getDay() !== 6 && date <= new Date()
          }
          calendarClassName="custom-calendar" // Custom calendar class
          dayClassName={(date) =>
            date.getDate() === new Date().getDate() ? 'current-day' : undefined
          }
        />
      </div>
    </div>
  );
};

export default StockDatePicker;
