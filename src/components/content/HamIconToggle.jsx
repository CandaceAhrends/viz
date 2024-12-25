import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOpen } from '../../features/scannerSlice';
const HAM_CLASSES = 'w-8 h-[.2rem] rounded-full bg-white';

const HamIconToggle = ({ Menu }) => {
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);
  const dispatch = useAppDispatch();
  const setSideMenuOpen = () => dispatch(setOpen(!isScannerOpen));
  return (
    <div className="mr-[1rem]">
      <ul
        className={`group ${
          isScannerOpen ? 'is-open' : ''
        } flex flex-col items-center gap-1.5 cursor-pointer h-[2rem]`}
        onClick={() => setSideMenuOpen(!isScannerOpen)}
      >
        <li
          className={`${HAM_CLASSES} transition group-[.is-open]:rotate-45 group-[.is-open]:translate-y-[.79rem]`}
        ></li>
        <li
          className={`${HAM_CLASSES} group-[.is-open]:scale-x-0 transition`}
        ></li>
        <li
          className={`${HAM_CLASSES} group-[.is-open]:-rotate-45 group-[.is-open]:-translate-y-[.35rem]`}
        ></li>
      </ul>
      <Menu />
    </div>
  );
};

export default HamIconToggle;
