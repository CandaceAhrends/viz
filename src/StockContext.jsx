import React, { useState } from 'react';
import { createContext } from 'react';

export const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [selectedStock, setSelectedStock] = useState('UPST');

  return (
    <StockContext.Provider value={{ selectedStock, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
