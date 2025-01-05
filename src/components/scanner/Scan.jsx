import React, { useEffect, useRef, useState } from 'react';
import { postConfig } from '../../services';
import RangeSlider from '../shared/RangeSlider.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setConfig } from '../../features/scannerSlice';

const Scan = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.scanner.config);
  const { min, max } = useRef(config);
  const onRangeChange = (range) => {
    dispatch(setConfig({ min: range[0], max: range[1] }));
  };

  const handleSend = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    postConfig({ message: { min: minPrice, max: maxPrice } });
  };

  return (
    <div className="flex justify-left">
      <div className="w-[100%] pb-3">
        <RangeSlider
          onRangeChange={onRangeChange}
          min={min}
          max={max}
          initialMin={config.min}
          initialMax={config.max}
        />
      </div>
    </div>
  );
};

export default Scan;
