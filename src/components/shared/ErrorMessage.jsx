import React from 'react';
import './shared.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center">
      <div className="error-message md:w-[50%]">
        <span className="icon">!</span>
        <span className="text">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
