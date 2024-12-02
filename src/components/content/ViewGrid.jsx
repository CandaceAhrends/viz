import React from 'react';
import StockData from '../ticker/StockData.jsx';
import CandleDetail from '../ticker/CandleDetail.jsx';
import Section from '../shared/Section.jsx';
import Feed from '../news/Feed.jsx';

import EmaChart from '../charts/EmaChart.jsx';

const ViewGrid = () => {
  return (
    <div className="grid md:h-auto md:grid-cols-2 md:grid-rows-3 md:gap-1 md:pt-1 ">
      <div className="md:col-span-2 border ">
        <StockData />
        <div className="border">
          <CandleDetail />
        </div>
        <EmaChart />
      </div>

      <div className="md:col-span-2 pr-1">
        <Section title="News">
          <Feed />
        </Section>
      </div>
    </div>
  );
};

export default ViewGrid;
