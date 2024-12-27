import React, { useContext } from 'react';
import SideMenu from '../navigation/SideMenu';
import { StockContext } from '../../StockContext';
import HamIconToggle from './HamIconToggle';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Header = () => {
  const { selectedStock } = useContext(StockContext);
  const selectedMenu = useAppSelector((state) => state.navigation.selectedMenu);

  return (
    <header className="text-white h-[40px]  mt-1  border-b border-neutral-900 ">
      <p className="flex justify-center text-green ">
        {selectedMenu === 'charts' ? (
          <p>Active Charts</p>
        ) : (
          <p>{selectedStock}</p>
        )}
      </p>
      <div className="flex justify-end w-full p-1 mr-5 mt-[-1.2rem] z-[999999]">
        <HamIconToggle Menu={SideMenu} />
      </div>
    </header>
  );
};

export default Header;
