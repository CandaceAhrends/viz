import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

const CandleDetail = () => {
  const { stocks } = useAppSelector((state) => state.stocks);

  return (
    <ul className="flex grid-cols-7 bg-green-500 ml-6 m-4">
      {stocks.map((stock) => (
        <li
          key={stock}
          className="flex justify-between p-2 hover:bg-[#333] cursor-pointer"
        >
          {stock}
        </li>
      ))}
    </ul>
  );
};

export default CandleDetail;
