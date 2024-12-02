import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetRelatedQuery } from '../../features/relatedCompaniesSlice';
import { StockContext } from '../../StockContext';

const CandleDetail = () => {
  const { selectedStock } = React.useContext(StockContext);
  const { data = [], error, isLoading } = useGetRelatedQuery(selectedStock);

  return (
    <ul className="flex grid-cols-7 bg-green-500 ml-6 m-4">
      {data.map((stock) => (
        <li
          key={stock}
          className="flex justify-between p-2 hover:bg-[#333] cursor-pointer"
        >
          <span className="text-yellow-100 w-50">{stock?.ticker}</span>
        </li>
      ))}
    </ul>
  );
};

export default CandleDetail;
