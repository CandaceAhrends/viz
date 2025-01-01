import React, { useEffect, useState } from 'react';
import { postConfig } from '../../services';
import RangeSlider from '../shared/RangeSlider.jsx';

const MIN = 0;
const MAX = 3000;

const Scan = ({ setScanConfig }) => {
  const onRangeChange = (range) => {
    setScanConfig({ min: range[0], max: range[1] });
  };

  useEffect(() => {
    setScanConfig({ min: MIN, max: MAX });
  }, []);

  const handleSend = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    postConfig({ message: { min: minPrice, max: maxPrice } });
  };

  return (
    <div className="flex justify-left">
      <div className="w-[100%] pb-3">
        <RangeSlider onRangeChange={onRangeChange} min={MIN} max={MAX} />
      </div>
    </div>
  );
};

export default Scan;
