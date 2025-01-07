import React from 'react';
import ErrorMessage from './ErrorMessage';
import StockDatePicker from '../market/StockDatePicker';
import { STOCK_SELECT_ERROR_MSG } from '../../consts';

const ErrorState = () => {
  return (
    <div className="error-state">
      <ErrorMessage message={STOCK_SELECT_ERROR_MSG} />
      <StockDatePicker />
    </div>
  );
};

export default ErrorState;
