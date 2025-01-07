import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import './shared.scss';

const RangeSlider = ({
  onRangeChange,
  min,
  max,
  initialMin,
  initialMax,
  title,
}) => {
  const [range, setRange] = useState([initialMin, initialMax]);

  useEffect(() => {
    onRangeChange(range);
  }, [range]);
  return (
    <>
      <div className="slider-container">
        <label className="text-white flex">{title}</label>
        <div className="range-labels">
          <span>{range[0]}</span>
          <span>{range[1]}</span>
        </div>

        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          value={range}
          min={min}
          max={max}
          step={5}
          onChange={(values) => setRange(values)}
          ariaLabel={['Lower thumb', 'Upper thumb']}
        />
      </div>
    </>
  );
};

export default RangeSlider;
