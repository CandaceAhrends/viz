import React, { useState, useEffect } from 'react';
import SelectedChart from '../charts/SelectedChart';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectNextSymbol,
  selectPrevSymbol,
} from '../../features/historicalDataSlice';
import TimeFrame from './TimeFrame';
import Carousel from '../shared/Carousel';

// prevent TimeFrame from re-rendering on every state change - have it outside of the SelectedChart component
const ChartWrapper = () => {
  const dispatch = useAppDispatch();
  const [timeFrame, setTimeFrame] = useState('1m');
  return (
    <Carousel
      enabled={true}
      onNext={() => dispatch(selectNextSymbol())}
      onPrev={() => dispatch(selectPrevSymbol())}
    >
      <div className="relative">
        <SelectedChart timeFrame={timeFrame} />
        <div className="flex justify-center absolute top-10 left-3 items-center">
          <TimeFrame activeTime={timeFrame} setActiveTime={setTimeFrame} />
        </div>
      </div>
    </Carousel>
  );
};

export default ChartWrapper;
