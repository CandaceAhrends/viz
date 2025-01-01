import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';

const Quote = ({ size }) => {
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const [isPositive, setIsPositive] = React.useState(false);
  const [todaysChangePerc, setTodaysChangePerc] = React.useState(0);
  const [todaysChange, setTodaysChange] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  useEffect(() => {
    if (selectedStock) {
      const change = selectedStock.close - selectedStock.open;
      setTodaysChange(change);
      setIsPositive(change > 0);
      setTodaysChangePerc((change / selectedStock.open) * 100);
      setPrice(selectedStock.vw);
    }
  }, [selectedStock]);

  return (
    <div className={`flex ${isPositive ? 'text-green' : 'text-[#ff4d4d]'}`}>
      <div
        className={`transition-all ${
          size === 'lg' ? 'text-xxl' : 'text-lg'
        } font-semibold pl-3.5`}
      >
        {price.toFixed(2)}
      </div>
      {size === 'lg' && (
        <div className="flex flex-col pt-[.35rem] pl-3">
          <span className="text-xs font-thin">
            {Number(todaysChange).toFixed(2)}
          </span>
          <span className="text-xs font-thin">
            {Number(todaysChangePerc).toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default Quote;
