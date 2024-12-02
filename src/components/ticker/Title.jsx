import React, { useContext } from 'react';
import { StockContext } from '../../StockContext';

const Title = () => {
  const { selectedStock } = useContext(StockContext);
  return (
    <div className="flex pl-4 ">
      <div className="text-xm font-normal">{selectedStock}</div>
      {/* <div className="text-xs p-1 pl-2 font-normal tracking-wide">
        Microsoft Corp NASDAQ
      </div> */}
    </div>
  );
};

export default Title;
