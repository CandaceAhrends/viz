import React, { useEffect } from 'react';
import { Input, IconButton } from '@material-tailwind/react';
import './shared.scss';

const NumericInput = ({ value, setValue, min, max }) => {
  useEffect(() => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  }, [value]);

  return (
    <div className="scan relative w-[10rem] mr-5">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="!border-t-blue-gray-200 text-white placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            setValue((cur) =>
              Number.parseInt(cur) < min ? 0 : Number.parseInt(cur) - 1
            )
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
            setValue((cur) =>
              Number.parseInt(cur) > max ? 0 : Number.parseInt(cur) + 1
            )
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
  );
};

export default NumericInput;
