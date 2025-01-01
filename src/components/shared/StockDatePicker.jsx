import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './shared.scss';

const StockDatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="datepicker-container">
      <DatePicker
        selected={selectedDate}
        showIcon
        popperPlacement="top-end"
        inline
        onChange={(date) => setSelectedDate(date)}
        filterDate={(date) =>
          date.getDay() !== 0 && date.getDay() !== 6 && date <= new Date()
        }
        calendarClassName="custom-calendar" // Custom calendar class
        dayClassName={(date) =>
          date.getDate() === new Date().getDate() ? 'current-day' : undefined
        }
      />
    </div>
  );
};

export default StockDatePicker;
