import React, { useState } from 'react';
import PopoutPage from '../scanner/PopoutPage.jsx';
import { useAppSelector } from '../../hooks';
import './navigation.scss';

const SideMenu = () => {
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);

  return (
    <div className="sidebar-container z-[999999]">
      <div
        className={`sidebar bg-gray-800 text-white h-full overflow-hidden ${
          isScannerOpen ? 'open' : 'closed'
        } transition-all duration-500`}
      >
        <PopoutPage />
      </div>
    </div>
  );
};

export default SideMenu;
