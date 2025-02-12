import React, { useCallback } from 'react';
import Swipeable from 'react-easy-swipe';
import LeftSvg from '../images/LeftSvg';
import RightSvg from '../images/RightSvg';
import './shared.scss';

const Carousel = ({ onPrev, onNext, enabled, children }) => {
  const handleOnPrev = useCallback(onPrev);
  const handleOnNext = useCallback(onNext);
  return (
    <Swipeable onSwipeLeft={onPrev} onSwipeRight={onNext}>
      <div className="carousel">
        <section>{children}</section>

        <aside key="carousel-button-nav" className="carousel-nav-lg">
          <section
            key="on-prev"
            onClick={handleOnPrev}
            aria-label={`Go to the previous slice`}
          >
            <LeftSvg />
          </section>
          <section
            key="on-next"
            onClick={handleOnNext}
            aria-label={`Go to the next slide`}
          >
            <RightSvg />
          </section>
        </aside>
      </div>
    </Swipeable>
  );
};

export default Carousel;
