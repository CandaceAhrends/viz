import React from 'react';
import './shared.scss';

const GradientSection = ({ children }) => {
  return (
    <div className="gradient border-b border-green  h-[11rem] w-[100%]  ">
      {children}
    </div>
  );
};

export default GradientSection;
