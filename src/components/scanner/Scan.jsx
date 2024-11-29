import React, { useState } from 'react';
import Section from '../shared/Section.jsx';
import { postConfig } from '../../services';
import BullishBearishBtn from '../shared/BullishBearishBtn.jsx';
import { setBullish } from '../../features/scannerSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Scan = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selected, setSelected] = useState('bullish');
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
  const setBullishScan = (bullish) => {
    if (bullish === 'bullish') {
      setSelected('bullish');
      dispatch(setBullish(true));
    } else {
      setSelected('bearish');
      dispatch(setBullish(false));
    }
  };

  return (
    <Section title="Scanner">
      <section>
        <BullishBearishBtn
          text="Bullish"
          bullish={true}
          active={selected === 'bullish'}
          onClick={() => setBullishScan('bullish')}
        />
        <BullishBearishBtn
          text="Bearish"
          active={selected === 'bearish'}
          onClick={() => setBullishScan('bearish')}
        />
      </section>
      <section>
        <label className="text-white">Min Price</label>
        <input
          className="w-full h-[4rem] bg-black-900 text-green appearance-none rounded-md border-0 py-1.5 pl-7 pr-20   ring-1 ring-inset ring-gray-300 placeholder:text-green focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm/6 text-2xl/9 font-bold "
          onChange={handleMinPriceChange}
        />

        <label className="text-white">Max Price</label>
        <input
          className="w-full h-[4rem] bg-black-900 text-green appearance-none rounded-md border-0 py-1.5 pl-7 pr-20   ring-1 ring-inset ring-gray-300 placeholder:text-green focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm/6 text-2xl/9 font-bold "
          onChange={handleMaxPriceChange}
        />
      </section>

      <section className="mt-[10rem]">
        <button
          className="w-full h-[3rem] bg-green text-black"
          onClick={handleSend}
        >
          Send
        </button>
      </section>
    </Section>
  );
};

export default Scan;
