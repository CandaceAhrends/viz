import React from 'react';
import { Link } from 'react-router-dom';
import './content.scss';

const Page = () => {
  return (
    <div>
      <div class="header">
        <h1>
          Stockmarket<span>viz</span>
        </h1>
      </div>

      <div class="cards-container">
        <div class="card text-green">comming soon</div>
        <div class="card text-slate-500">under development</div>
        <div class="card">c</div>
      </div>

      <div class="description">
        <h2>Market Scanner</h2>
        <p>Scan the market for the most active stocks.</p>
      </div>

      <div class="cta">
        <Link to="/news">
          <button>News</button>
        </Link>
      </div>
      <div class="cta">
        <Link to="/scanner">
          <button>Scanner</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
