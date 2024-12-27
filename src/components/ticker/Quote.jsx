import React from 'react';
import { StockContext } from '../../StockContext';

const Quote = ({ size }) => {
  const { selectedQuote } = React.useContext(StockContext);

  return (
    <div className="flex text-green">
      <div
        className={`transition-all ${
          size === 'lg' ? 'text-xxl' : 'text-lg'
        } font-semibold pl-3.5`}
      >
        {selectedQuote?.prevDay?.c}
      </div>
      {size === 'lg' && (
        <div className="flex flex-col pt-[.35rem] pl-3">
          <span className="text-xs font-thin">
            {Number(selectedQuote?.todaysChange).toFixed(2)}
          </span>
          <span className="text-xs font-thin">
            {Number(selectedQuote?.todaysChangePerc).toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default Quote;
