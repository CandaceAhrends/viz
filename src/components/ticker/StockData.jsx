import React from 'react';
import Title from './Title';
import Quote from './Quote';
import CandleDetail from './CandleDetail';

const StockData = () => {
  return (
    <div className="container flex w-full justify-between font-golos-text bg-[#OAOAOA]">
      <div className="column flex flex-col min-w-96 ml-2 ">
        <Title />
        <Quote />
      </div>

      <div className="column grow">
        <div className="flex flex-col h-full">
          <div className="flex justify-between mr-5">
            <span>Open</span>
            <span>3</span>
          </div>
          <div className="flex justify-between  mr-5">
            <span>Open</span>
            <span>3</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col grow">
        <div className="flex justify-between  mr-5">
          <span>Open</span>
          <span>3</span>
        </div>
        <div className="flex justify-between  mr-5">
          <span>Open</span>
          <span>3</span>
        </div>
      </div>
    </div>
  );
};

export default StockData;
