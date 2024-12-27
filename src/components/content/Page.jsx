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

      <div className="cta">
        <Link to="/news" onClick={() => dispatch(selectMenu('news'))}>
          <button>News</button>
        </Link>
      </div>
      <div className="cta">
        <Link to="/scan" onClick={() => dispatch(selectMenu('scan'))}>
          <button>Scanner</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
