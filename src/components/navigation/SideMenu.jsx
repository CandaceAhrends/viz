import React, { useState } from 'react';
import Scan from '../scanner/Scan.jsx';
import ScanResults from '../scanner/ScanResults.jsx';
import { useAppSelector } from '../../hooks';
import './navigation.scss';

const SideMenu = () => {
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);
  return (
    <div className="sidebar-container z-[999]">
      <div
        className={`sidebar bg-gray-800 text-white h-full overflow-hidden ${
          isScannerOpen ? 'open' : 'closed'
        } transition-all duration-500`}
      >
        <Scan />
        <ScanResults />,
      </div>
    </div>
  );
};

export default SideMenu;
