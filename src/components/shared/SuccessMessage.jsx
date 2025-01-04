import React from 'react';
import './shared.scss';

const SuccessMessage = ({ message }) => {
  return (
    <div className="flex justify-center ">
      <div class="success-message md:w-[50%]">
        <span class="icon">!</span>
        <span class="text">{message}</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
