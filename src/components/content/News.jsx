import React, { useEffect, useState, useRef } from 'react';
import StockData from '../ticker/StockData.jsx';
import Section from '../shared/Section.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNextSymbol, getPrevSymbol } from '../../utils';
import { setSelectedStock } from '../../features/historicalDataSlice';
import { setSelectedChart } from '../../features/stocksSlice';
import { selectMenu } from '../../features/navigationSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowSvg from '../images/ArrowSvg';
import Feed from '../news/Feed.jsx';
import './content.scss';

const News = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState({ prev: true, next: false });

  const filteredStocks = useAppSelector(
    (state) => state.historicalData.filteredStocks
  );
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const date = useAppSelector((state) => state.stocks.date);
  const [size, setSize] = useState('lg');
  const scrollableRef = useRef(null);
  const prevTouchRef = useRef(null);

  useEffect(() => {
    const nextBtnDisabled = filteredStocks.length <= 1;
    const prevBtnDisabled = filteredStocks.length <= 1;
    setIsDisabled({ prev: prevBtnDisabled, next: nextBtnDisabled });
  }, [filteredStocks]);

  useEffect(() => {
    const container = scrollableRef.current;

    const handleScroll = (e) => {
      if (prevTouchRef.current) return;
      const up = e.deltaY > 0;
      setSize(up ? 'sm' : 'lg');
    };

    const handleTouchMove = (e) => {
      const currentTouchY = e.touches[0].clientY;
      const up = currentTouchY < prevTouchRef.current;
      setSize(up ? 'sm' : `lg`);
    };

    const handleTouchStart = (e) => {
      prevTouchRef.current = e.touches[0].clientY;
    };

    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: true });
      container.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      container.addEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
        container.removeEventListener('touchmove', handleScroll);
        container.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, []);

  const selectNextStock = () => {
    const nextStock = getNextSymbol({ selectedStock, filteredStocks });
    dispatch(setSelectedStock(nextStock));
  };
  const selectPrevStock = () => {
    const prevStock = getPrevSymbol({ selectedStock, filteredStocks });
    dispatch(setSelectedStock(prevStock));
  };
  const loadSelectedChart = () => {
    dispatch(setSelectedChart({ stock: selectedStock, date }));
    navigate('/charts');
    dispatch(selectMenu('charts'));
  };

  return (
    <div className="grid md:h-auto md:grid-cols-2 md:grid-rows-3 md:gap-1 md:pt-1 z-10">
      <div className="md:col-span-2 ">
        <div className="flex">
          <div
            className={`${size === 'sm' ? 'flex' : ''}`}
            onClick={loadSelectedChart}
          >
            <StockData size={size} />
            {size === 'sm' && (
              <div className="p-1  z-[999999]">
                <Link to={'/charts'}>
                  <ArrowSvg />
                </Link>
              </div>
            )}
            <div className="flex mt-1">
              {size === 'lg' && (
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
              onClick={!isDisabled.prev && selectPrevStock}
            >
              <span className="icon">◀</span>
              <span className="text">PREV</span>
            </button>
            <button
              className={`button next ${isDisabled.next ? 'disabled' : ''}`}
              onClick={!isDisabled.next && selectNextStock}
            >
              <span className="text">NEXT</span>
              <span className="icon">▶</span>
            </button>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 row-span-2 pr-1">
        <Section title="News">
          <Feed containerRef={scrollableRef} size={size} />
        </Section>
      </div>
    </div>
  );
};

export default News;
