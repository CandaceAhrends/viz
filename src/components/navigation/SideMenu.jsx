import React from 'react';
import { useAppSelector } from '../../hooks';
import SideList from '../scanner/SideList.jsx';
import './navigation.scss';

const SideMenu = () => {
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);
  const stocks = useAppSelector((state) => state.historicalData.filteredStocks);
  return (
    <div className="sidebar-container z-[999999]">
      <div
        className={`sidebar bg-gray-800 text-white h-full overflow-scroll ${
          isScannerOpen ? 'open' : 'closed'
        } transition-all duration-500`}
      >
        <SideList stocks={stocks} />
      </div>
    </div>
  );
};

export default SideMenu;
