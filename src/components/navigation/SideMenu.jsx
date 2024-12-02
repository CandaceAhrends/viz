import React, { useState } from 'react';
import Scan from '../scanner/Scan.jsx';
import SectionTabs from '../shared/SectionTabs.jsx';
import Earnings from '../news/Earnings.jsx';
import ScanResults from '../scanner/ScanResults.jsx';
import './navigation.scss';

const tabs = [
  {
    tabTitle: 'Stocks',
    component: <ScanResults />,
  },
  { tabTitle: 'Earnings', component: <Earnings /> },
];

const SideMenu = ({ isOpen }) => {
  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <Scan />
        <SectionTabs tabs={tabs} />
      </div>
    </div>
  );
};

export default SideMenu;
