import React from 'react';
import './shared.scss';

const SuccessMessage = ({ children }) => {
  return (
    <div className="flex justify-center w-full  ">
      <div className="success-message md:w-[25rem]">
        <span className="icon">!</span>
        {children}
      </div>
    </div>
  );
};

export default SuccessMessage;
