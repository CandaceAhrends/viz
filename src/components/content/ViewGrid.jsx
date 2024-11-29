import React from 'react';
import StockData from '../ticker/StockData.jsx';
import CandleDetail from '../ticker/CandleDetail.jsx';
import Section from '../shared/Section.jsx';
import Scan from '../scanner/Scan.jsx';
import Feed from '../news/Feed.jsx';
import Earnings from '../news/Earnings.jsx';
import ScanResults from '../scanner/ScanResults.jsx';
import SectionTabs from '../shared/SectionTabs.jsx';

import EmaChart from '../charts/EmaChart.jsx';

const tabs = [
  {
    tabTitle: 'Stocks',
    component: <ScanResults />,
  },
  { tabTitle: 'Earnings', component: <Earnings /> },
];

const ViewGrid = () => {
  return (
    <div className="grid md:h-auto md:grid-cols-4 md:grid-rows-1 md:gap-1 md:pt-1 ">
      <div className="md:col-span-3 ">
        <StockData />
        <CandleDetail />
        <EmaChart />
      </div>
      <div className="hidden md:block h-full mr-2">
        <Scan />
      </div>
      <div className="md:col-span-3 pr-1">
        <Section title="News">
          <Feed />
        </Section>
      </div>
      <div className="hidden md:block  ">
        <SectionTabs tabs={tabs} />
      </div>
    </div>
  );
};

export default ViewGrid;
