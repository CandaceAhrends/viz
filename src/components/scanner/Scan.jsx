import React, { useState } from 'react';
import Section from '../shared/Section.jsx';
import { postConfig } from '../../services';
import BullishBearishBtn from '../shared/BullishBearishBtn.jsx';
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
    <Section title="Scanner">
      <RangeSlider />

      <section className="flex justify-center mt-[1rem] mb-1">
        {/* <button
          className="w-1/2  rounded-full h-[3rem] bg-green text-black"
          onClick={handleSend}
        >
          Send
        </button> */}
        <BullishBearishBtn
          text="Scan"
          bullish={true}
          active={'bullish'}
          onClick={handleSend}
        />
      </section>
    </Section>
  );
};

export default Scan;
