import React, { useEffect, useState, useRef } from 'react';
import StockData from '../ticker/StockData.jsx';
import CandleDetail from '../ticker/CandleDetail.jsx';
import Section from '../shared/Section.jsx';
import Feed from '../news/Feed.jsx';

const NewsGrid = () => {
  const [size, setSize] = useState('lg');
  const scrollableRef = useRef(null);
  const prevTouchRef = useRef(null);

  useEffect(() => {
    const container = scrollableRef.current;

    const handleScroll = (e) => {
      console.log('handle scroll');
      if (prevTouchRef.current) return;
      const up = e.deltaY > 0;
      setSize(up ? 'sm' : 'lg');
    };

    const handleTouchMove = (e) => {
      console.log('handle touch move');
      const currentTouchY = e.touches[0].clientY;
      const up = currentTouchY < prevTouchRef.current;
      setSize(up ? 'sm' : `lg`);
    };

    const handleTouchStart = (e) => {
      console.log('handle touch start');
      prevTouchRef.current = e.touches[0].clientY;
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: true });
      container.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      container.addEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
        container.removeEventListener('touchmove', handleScroll);
        container.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, []);

  return (
    <div className="grid md:h-auto md:grid-cols-2 md:grid-rows-3 md:gap-1 md:pt-1 z-10">
      <div className="md:col-span-2 ">
        <StockData size={size} />
        {size === 'lg' && <CandleDetail />}
      </div>

      <div className="md:col-span-2 row-span-2 pr-1">
        <Section title="News">
          <Feed containerRef={scrollableRef} size={size} />
        </Section>
      </div>
    </div>
  );
};

export default NewsGrid;
