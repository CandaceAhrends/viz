import React, { useRef } from 'react';

import Section from '../shared/Section.jsx';
import { useAppSelector } from '../../hooks.ts';
import Feed from '../news/Feed.jsx';
import ErrorState from '../shared/ErrorState.jsx';
import useShrinkOnScroll from '../hooks/useShrinkOnScroll.jsx';
import ChartLinks from '../news/ChartLinks.jsx';
import './content.scss';

const News = () => {
  const scrollableRef = useRef(null);
  const shrink = useShrinkOnScroll(scrollableRef);
  const hasError = useAppSelector((state) => state.historicalData.hasError);

  return (
    <>
      {hasError ? (
        <ErrorState />
      ) : (
        <div className="grid md:h-auto md:grid-cols-2 md:grid-rows-3 md:gap-1 md:pt-1 z-10">
          <div className="md:col-span-2 ">
            <ChartLinks shrink={shrink} />
          </div>
          <div className="md:col-span-2 row-span-2 pr-1">
            <Section title="News">
              <Feed containerRef={scrollableRef} shrink={shrink} />
            </Section>
          </div>
        </div>
      )}
    </>
  );
};

export default News;
