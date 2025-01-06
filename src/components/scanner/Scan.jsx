import React, { useEffect, useRef, useState } from 'react';
import { postConfig } from '../../services';
import RangeSlider from '../shared/RangeSlider.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setConfig } from '../../features/scannerSlice';
import { Input, IconButton, Typography } from '@material-tailwind/react';

const Scan = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.scanner.config);
  const [minPrice, setMinPrice] = useState(config.minPrice);
  const [maxPrice, setMaxPrice] = useState(config.maxPrice);
  const [minChange, setMinChange] = useState(config.minChange);
  const [maxChange, setMaxChange] = useState(config.maxChange);

  const onRangeChange = (range) => {
    const [min, max] = range;
    setMinChange(min);
    setMaxChange(max);
  };

  useEffect(() => {
    dispatch(setConfig({ minPrice, maxPrice, minChange, maxChange }));
  }, [minPrice, maxPrice, minChange, maxChange]);

  const handleSend = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    postConfig({ message: { min: minPrice, max: maxPrice } });
  };

  return (
    <div className="flex justify-around">
      <div className="w-[100%] pb-3">
        <div className="flex ml-[1.5rem]">
          <label className="mr-5">Price</label>

          <div className="relative w-[13rem]">
            <Input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              containerProps={{
                className: 'min-w-0',
              }}
            />
            <div className="absolute right-1 top-1 flex gap-0.5">
              <IconButton
                size="sm"
                className="rounded"
                onClick={() => setMinPrice((cur) => (cur === 0 ? 0 : cur - 1))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                </svg>
              </IconButton>
              <IconButton
                size="sm"
                className="rounded"
                onClick={() => setMinPrice((cur) => cur + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                </svg>
              </IconButton>
            </div>

            <div className="relative w-[13rem]">
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                containerProps={{
                  className: 'min-w-0',
                }}
              />
              <div className="absolute right-1 top-1 flex gap-0.5">
                <IconButton
                  size="sm"
                  className="rounded"
                  onClick={() =>
                    setMaxPrice((cur) => (cur === 0 ? 0 : cur - 1))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                  </svg>
                </IconButton>
                <IconButton
                  size="sm"
                  className="rounded"
                  onClick={() =>
                    setMaxPrice((cur) => (cur >= 3000 ? 3000 : cur + 1))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <RangeSlider
          title="% Change"
          onRangeChange={onRangeChange}
          min={-50}
          max={1000}
          initialMin={minChange}
          initialMax={maxChange}
        />
      </div>
    </div>
  );
};

export default Scan;
