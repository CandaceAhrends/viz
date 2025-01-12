import React from 'react';
import './charts.scss';

const TIMES = ['1m', '5m', '15m', '30m'];

const TimeFrame = ({ activeTime, setActiveTime }) => {
  return (
    <div className="time-frame-selector">
      <span>Time frame:</span>
      {TIMES.map((time) => (
        <button
          key={time}
          className={`time-frame-option ${activeTime === time ? 'active' : ''}`}
          onClick={() => setActiveTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeFrame;
