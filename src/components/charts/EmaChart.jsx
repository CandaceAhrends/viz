import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { StockContext } from '../../StockContext';

const EmaChart = () => {
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  const [chartUrl, setChartUrl] = useState('');

  useEffect(() => {
    if (selectedStock) {
      setChartUrl(`http://localhost:8778/chart/${selectedStock}`); // Update URL if hosted elsewhere
    }
  }, [selectedStock]);

  return (
    <div className="relative">
      <div className=" mx-auto overflow-hidden">
        <div style={{ clipPath: 'inset(1rem 0 0 0)' }}>
          <img
            className="h-full w-full transform scale-x-[1.34] scale-y-[1.28]"
            src={chartUrl}
            alt="Matplotlib Chart"
          />
        </div>
      </div>
    </div>
  );
};

export default EmaChart;
