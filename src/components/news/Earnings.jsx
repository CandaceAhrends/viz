import React from 'react';
import { useGetEarningsQuery } from '../../features/earningsSlice';
import { formatDate } from '../../utils';
import { useContext } from 'react';
import { StockContext } from '../../StockContext';

const Earnings = () => {
  const { data = [], status, error } = useGetEarningsQuery();
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  const getColorClass = (index) => {
    const colors = [
      'bg-blue-200',
      'bg-orange-200',
      'bg-yellow-200',
      'bg-pink-200',
      'bg-purple-200',
    ];
    return colors[index % colors.length];
  };

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index} className={getColorClass(index)}>
          <div
            className="flex justify-between p-4"
            onClick={() => setSelectedStock(item.symbol)}
          >
            <span className="text-black w-50">{item.symbol}</span>
            <span className="text-neutral-600">
              {formatDate(item.reportDate)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Earnings;
