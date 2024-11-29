import React from 'react';
import './shared.scss';

const BullishBearishBtn = ({ text, bullish, active, onClick }) => {
  return (
    <button
      className={`${
        bullish
          ? `${
              active ? 'bullish-gradient-btn' : 'bg-slate-900 border-none'
            } text-green border-green hover:bg-black`
          : `${
              active ? 'bearish-gradient-btn' : 'bg-slate-900 border-none'
            } text-red border-red hover:bg-black`
      }  h-[4rem] w-1/2 border-b shadow-md`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BullishBearishBtn;
