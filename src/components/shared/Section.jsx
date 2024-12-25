import React from 'react';

const Section = ({ title, children }) => {
  return (
    <div className="flex">
      <header className="group w-full text-white m-1 "></header>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default Section;
