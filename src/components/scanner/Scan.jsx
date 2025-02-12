import React, { useEffect, useRef, useState } from 'react';
import RangeSlider from '../shared/RangeSlider.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setConfig } from '../../features/scannerSlice';
import NumericInput from '../shared/NumericInput.jsx';
import './scanner.scss';

const Scan = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.scanner.config);
  const [minPrice, setMinPrice] = useState(config.minPrice);
  const [maxPrice, setMaxPrice] = useState(config.maxPrice);
  const [minChange, setMinChange] = useState(config.minChange);
  const [maxChange, setMaxChange] = useState(config.maxChange);

  const onRangeChange = (range) => {
    const [min, max] = range;
    setMinChange(min);
    setMaxChange(max);
  };

  useEffect(() => {
    dispatch(setConfig({ minPrice, maxPrice, minChange, maxChange }));
  }, [minPrice, maxPrice, minChange, maxChange]);

  return (
    <div className="flex">
      <div className="w-[100%] pb-3">
        <h5 className="ml-5 mt-1">Historical Scanner</h5>
        <div className="flex m-[1.5rem] ">
          <label className="mr-5  w-[2.5rem] text-xs">Price</label>
          <NumericInput
            value={minPrice}
            setValue={setMinPrice}
            min={0}
            max={2999}
          />
          <NumericInput
            value={maxPrice}
            setValue={setMaxPrice}
            min={1}
            max={3000}
          />
        </div>
        <div className="flex m-[1.5rem]">
          <label className="mr-5 w-[2.5rem] text-xs">Change</label>

          <RangeSlider
            title=""
            onRangeChange={onRangeChange}
            min={-50}
            max={1000}
            initialMin={minChange}
            initialMax={maxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Scan;
