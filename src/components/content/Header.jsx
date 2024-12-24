import React from 'react';
import SideMenu from '../navigation/SideMenu';
import HamIconToggle from './HamIconToggle';

const Header = () => {
  return (
    <header className="text-white h-[40px]  mt-0  border-b border-neutral-900 ">
      <div className="flex justify-end w-full  ml-3 mt-2">
        <HamIconToggle Menu={SideMenu} />
      </div>
    </header>
  );
};

export default Header;
