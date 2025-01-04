import React from 'react';
import './shared.scss';

const SuccessMessage = ({ children }) => {
  return (
    <div className="flex justify-center ">
      <div class="success-message md:w-[50%]">
        <span class="icon">!</span>
        {children}
      </div>
    </div>
  );
};

export default SuccessMessage;
