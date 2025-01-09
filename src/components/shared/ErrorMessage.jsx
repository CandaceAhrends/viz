import React from 'react';
import './shared.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center">
      <div className="error-message w-full ml-5 mr-5 sm:w-[25rem] md:w-[30rem]">
        <span className="icon">!</span>
        <span className="text">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
