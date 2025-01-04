import React from 'react';
import Quote from './Quote';

const StockData = ({ size }) => {
  return (
    <div
      className={`container flex justify-between font-golos-text bg-[#OAOAOA] ${
        size === 'sm' ? 'w-[5rem]' : ''
      }`}
    >
      <div className="column flex flex-col min-w-[10rem] w-[10rem] ml-2 ">
        <Quote size={size} />
      </div>
    </div>
  );
};

export default StockData;
