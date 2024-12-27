import React from 'react';
import { Link } from 'react-router-dom';
import { selectMenu } from '../../features/navigationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './content.scss';

const Page = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="header">
        <h1>
          Stockmarket<span>viz</span>
        </h1>
      </div>

      <div className="cards-container">
        <div className="card text-green">comming soon</div>
        <div className="card text-slate-500">under development</div>
        <div className="card">c</div>
      </div>

      <div className="description">
        <h2>Market Scanner</h2>
        <p>Scan the market for the most active stocks.</p>
      </div>

      <div className="flex justify-center">
        <Link to="/news" onClick={() => dispatch(selectMenu('news'))}>
          <button className="m-auto w-[7rem] mr-5 mb-5 rounded h-[3rem] bg-[#07f8b5] text-black hover:bg-[#43907a]">
            News
          </button>
        </Link>

        <Link to="/scan" onClick={() => dispatch(selectMenu('scan'))}>
          <button className="m-auto w-[7rem] mr-5 mb-5 rounded h-[3rem] bg-[#07f8b5] text-black hover:bg-[#43907a]">
            Scanner
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
