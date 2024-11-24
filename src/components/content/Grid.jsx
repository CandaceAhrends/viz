import React from 'react';
import StockData from '../ticker/StockData.jsx';
import CandleDetail from '../ticker/CandleDetail.jsx';
import StockChart from '../ticker/StockChart.jsx';
import Section from '../shared/Section.jsx';

const Grid = () => {
  return (
    <div className="grid md:h-auto md:grid-cols-4 md:grid-rows-2 md:gap-1 md:pt-1">
      <div className="md:col-span-3 ">
        <StockData />
        <CandleDetail />
        <StockChart />
      </div>
      <div className="mr-2 p-4">
        <Section />
      </div>
      <div className="hidden md:block md:col-span-3 p-4">
        <Section />
      </div>
      <div className="hidden md:block p-4">
        <Section />
      </div>
    </div>
  );
};

export default Grid;
