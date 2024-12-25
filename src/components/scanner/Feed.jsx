import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FeedList from './FeedList';

const Feed = () => {
  const stocks = useAppSelector((state) => state.scanner.topVolume);

  return (
    <div>
      <FeedList stocks={stocks}></FeedList>
    </div>
  );
};

export default Feed;
