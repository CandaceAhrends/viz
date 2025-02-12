import React, { useEffect, useState, useRef } from 'react';
import StockData from '../ticker/StockData.jsx';
import Section from '../shared/Section.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import {
  selectNextSymbol,
  selectPrevSymbol,
} from '../../features/historicalDataSlice.ts';
import { setSelectedChart } from '../../features/stocksSlice.ts';
import { selectMenu } from '../../features/navigationSlice.ts';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowSvg from '../images/ArrowSvg.jsx';
import Feed from '../news/Feed.jsx';
import ErrorState from '../shared/ErrorState.jsx';
import useShrinkOnScroll from '../hooks/useShrinkOnScroll.jsx';
import './content.scss';

const News = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scrollableRef = useRef(null);
  const shrink = useShrinkOnScroll(scrollableRef);
  const [isDisabled, setIsDisabled] = useState({ prev: true, next: false });
  const hasError = useAppSelector((state) => state.historicalData.hasError);

  const filteredStocks = useAppSelector(
    (state) => state.historicalData.filteredStocks
  );
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const date = useAppSelector((state) => state.stocks.date);

  useEffect(() => {
    const nextBtnDisabled = filteredStocks.length <= 1;
    const prevBtnDisabled = filteredStocks.length <= 1;
    setIsDisabled({ prev: prevBtnDisabled, next: nextBtnDisabled });
  }, [filteredStocks]);

  const selectNextStock = () => {
    if (isDisabled.next) return;
    dispatch(selectNextSymbol());
  };
  const selectPrevStock = () => {
    if (isDisabled.prev) return;
    dispatch(selectPrevSymbol());
  };
  const loadSelectedChart = () => {
    dispatch(setSelectedChart({ stock: selectedStock, date }));
    navigate('/charts');
    dispatch(selectMenu('charts'));
  };

  return (
    <>
      {hasError ? (
        <ErrorState />
      ) : (
        <div className="grid md:h-auto md:grid-cols-2 md:grid-rows-3 md:gap-1 md:pt-1 z-10">
          <div className="md:col-span-2 ">
            <div className="flex">
              <div
                className={`${shrink === 'sm' ? 'flex' : ''}`}
                onClick={loadSelectedChart}
              >
                <StockData shrink={shrink} />
                {shrink === 'sm' && (
                  <div className="p-1  z-[999999]">
                    <Link to={'/charts'}>
                      <ArrowSvg />
                    </Link>
                  </div>
                )}
                <div className="flex mt-1">
                  {shrink === 'lg' && (
                    <span className="lg-icon pl-3">
                      <Link to={'/charts'}>
                        <ArrowSvg />
                      </Link>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex button-group hover:pointer">
                <button
                  className={`button prev ${isDisabled.prev ? 'disabled' : ''}`}
                  onClick={selectPrevStock}
                >
                  <span className="icon">◀</span>
                  <span className="text">PREV</span>
                </button>
                <button
                  className={`button next ${isDisabled.next ? 'disabled' : ''}`}
                  onClick={selectNextStock}
                >
                  <span className="text">NEXT</span>
                  <span className="icon">▶</span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 row-span-2 pr-1">
            <Section title="News">
              <Feed containerRef={scrollableRef} shrink={shrink} />
            </Section>
          </div>
        </div>
      )}
    </>
  );
};

export default News;
