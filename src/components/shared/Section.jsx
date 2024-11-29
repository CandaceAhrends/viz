import React from 'react';

const Section = ({ title, children }) => {
  return (
    <div className="w-full">
      <header className="group  flex w-full border-0 bg-black-900 text-white px-5 py-4 text-left">
        {title}
      </header>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default Section;
