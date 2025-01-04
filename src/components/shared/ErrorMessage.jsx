import React from 'react';
import './shared.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center">
      <div class="error-message">
        <span class="icon">!</span>
        <span class="text">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
