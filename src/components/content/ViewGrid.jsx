import React from 'react';
import StockData from '../ticker/StockData.jsx';
import CandleDetail from '../ticker/CandleDetail.jsx';
import Section from '../shared/Section.jsx';
import Feed from '../news/Feed.jsx';

const ViewGrid = () => {
  return (
    <div className="grid md:h-auto md:grid-cols-2 md:grid-rows-3 md:gap-1 md:pt-1 z-10">
      <div className="md:col-span-2 ">
        <StockData />
        <CandleDetail />
      </div>

      <div className="md:col-span-2 row-span-2 pr-1">
        <Section title="News">
          <Feed />
        </Section>
      </div>
    </div>
  );
};

export default ViewGrid;
