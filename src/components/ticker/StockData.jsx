import React from 'react';
import Quote from './Quote';

const StockData = ({ size }) => {
  return (
    <div className="container flex w-full justify-between font-golos-text bg-[#OAOAOA]">
      <div className="column flex flex-col min-w-96 ml-2 ">
        <Quote size={size} />
      </div>
    </div>
  );
};

export default StockData;
