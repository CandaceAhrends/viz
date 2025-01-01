import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import './shared.scss';

const RangeSlider = ({ onRangeChange, min, max }) => {
  const [range, setRange] = useState([min, max]); // Initial values

  useEffect(() => {
    onRangeChange(range);
  }, [range]);
  return (
    <div className="slider-container">
      {/* Range labels */}
      <div className="range-labels">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>

      {/* Range slider */}
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={range}
        min={min}
        max={max}
        step={5} // Slider increments
        onChange={(values) => setRange(values)}
        ariaLabel={['Lower thumb', 'Upper thumb']}
      />
    </div>
  );
};

export default RangeSlider;
