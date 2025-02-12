import { useState, useEffect, useRef } from 'react';
import { debounce } from '../../utils.js';

const useShrinkOnScroll = (scrollableRef) => {
  const [shrink, setSkrink] = useState(false);
  const prevTouchRef = useRef(null);

  useEffect(() => {
    const container = scrollableRef.current;

    const handleScroll = debounce((e) => {
      if (prevTouchRef.current) return;
      setSkrink(e.deltaY > 0 ? 'sm' : 'lg');
    });

    const handleTouchMove = (e) => {
      const currentTouchY = e.touches[0].clientY;
      setSkrink(currentTouchY < prevTouchRef.current ? 'sm' : `lg`);
    };

    const handleTouchStart = (e) => {
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

  return shrink;
};

export default useShrinkOnScroll;
