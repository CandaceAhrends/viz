import React, { useState } from 'react';
import Section from '../shared/Section.jsx';
import { postConfig } from '../../services';
import RangeSlider from '../shared/RangeSlider.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Scan = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const dispatch = useAppDispatch();

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSend = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    postConfig({ message: { min: minPrice, max: maxPrice } });
  };

  return (
    <div className="flex justify-left">
      <div className="w-[70%] pb-3">
        <RangeSlider />
      </div>

      <button
        className="m-auto w-[7rem] mr-5 mb-5 rounded-full h-[3rem] bg-green text-black"
        onClick={handleSend}
      >
        Update
      </button>
    </div>
  );
};

export default Scan;
