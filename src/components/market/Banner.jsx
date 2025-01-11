import React from 'react';
import { useAppSelector } from '../../hooks';
import dayjs from 'dayjs';

const Banner = ({ selectedDate }) => {
  const animate = useAppSelector((state) => state.stocks.animate);

  return (
    <div className="banner flex items-center align-center text-brand-blue">
      <div className="mr-1 ">
        <p className={`${animate ? 'scanner-date' : ''}`}>
          {dayjs(selectedDate).format('MMMM DD, YYYY')} News
        </p>
      </div>
      <svg
        className="h-4 w-4 text-sky-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />{' '}
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </div>
  );
};

export default Banner;
