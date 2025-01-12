import React from 'react';
import Swipeable from 'react-easy-swipe';
import './shared.scss';

const Carousel = ({ onPrev, onNext, enabled, children }) => {
  return (
    <Swipeable onSwipeLeft={onPrev} onSwipeRight={onNext}>
      <div className="carousel">
        {children}

        {/* <div
          className="left absolute top-0 w-40 h-full hover:cursor-pointer"
          onClick={onPrev}
        ></div>
        <div
          className="right absolute top-0 right-0 w-40 h-full hover:cursor-pointer"
          onClick={onNext}
        ></div> */}

        <div className={`carousel-nav ${enabled ? '' : 'hidden'}`}>
          <button
            className={`hover:text-brand-blue`}
            onClick={onPrev}
            aria-label={`Go to the previous slice`}
          >
            ◀
          </button>
          <button
            className={`hover:text-brand-blue`}
            onClick={onNext}
            aria-label={`Go to the next slide`}
          >
            ▶
          </button>
        </div>
      </div>
    </Swipeable>
  );
};

export default Carousel;
