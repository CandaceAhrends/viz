import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './shared.scss';

const RangeSlider = ({ label = 'price' }) => {
  const [range, setRange] = useState([10, 250]); // Initial values

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
        min={0}
        max={1000}
        step={10} // Slider increments
        onChange={(values) => setRange(values)}
        ariaLabel={['Lower thumb', 'Upper thumb']}
      />
    </div>
  );
};

export default RangeSlider;
