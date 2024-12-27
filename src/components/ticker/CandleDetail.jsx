import React, { useContext } from 'react';
import { useGetRelatedQuery } from '../../features/relatedCompaniesSlice';
import { StockContext } from '../../StockContext';

const CandleDetail = () => {
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  const { data = [], error, isLoading } = useGetRelatedQuery(selectedStock);

  return (
    <ul className="flex grid-cols-5 bg-green-500 ml-5 m-1">
      {!error &&
        data &&
        Array.isArray(data) &&
        data.slice(0, 5).map((stock) => (
          <li
            key={stock?.ticker}
            onClick={() => setSelectedStock(stock?.ticker)}
            className="flex justify-between p-1 hover:bg-[#333] cursor-pointer"
          >
            <span className="text-yellow-100 w-50 text-sm">
              {stock?.ticker}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default CandleDetail;
