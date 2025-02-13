import React from 'react';
import Quote from './Quote';

const StockData = ({ shrink }) => {
  return (
    <div
      className={`container flex justify-between font-golos-text bg-[#OAOAOA] ${
        shrink === 'sm' ? 'w-[5rem]' : ''
      }`}
    >
      <div className="column flex flex-col min-w-[10rem] w-[10rem] ml-2 ">
        <Quote shrink={shrink} />
      </div>
    </div>
  );
};

export default StockData;
