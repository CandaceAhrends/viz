import React from 'react';
import Header from './Header.jsx';
import Grid from './Grid.jsx';

const ContentContainer = () => {
  return (
    <div className="flex flex-col text-white flex-grow w-full">
      <Header />
      <Grid />
    </div>
  );
};

export default ContentContainer;
