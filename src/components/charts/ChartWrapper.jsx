import React, { useState, useEffect } from 'react';
import SelectedChart from '../charts/SelectedChart';
import TimeFrame from './TimeFrame';

// prevent TimeFrame from re-rendering on every state change - have it outside of the SelectedChart component
const ChartWrapper = () => {
  const [timeFrame, setTimeFrame] = useState('1m');
  return (
    <div className="relative">
      <SelectedChart timeFrame={timeFrame} />
      <div className="flex justify-center absolute top-10 left-3 items-center">
        <TimeFrame activeTime={timeFrame} setActiveTime={setTimeFrame} />
      </div>
    </div>
  );
};

export default ChartWrapper;
