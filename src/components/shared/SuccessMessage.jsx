import React from 'react';
import './shared.scss';

const SuccessMessage = ({ children }) => {
  return (
    <div className="flex justify-center ">
      <div className="success-message md:w-[50%]">
        <span className="icon">!</span>
        {children}
      </div>
    </div>
  );
};

export default SuccessMessage;
