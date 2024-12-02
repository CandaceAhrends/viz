import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import { CHART_OPTIONS } from '../../consts';
import dayjs from 'dayjs';

const StockChart = ({ data, symbol }) => {
  const [options, setOptions] = useState({
    options: {
      ...CHART_OPTIONS,
      title: {
        text: symbol,
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    try {
      // fetch data
      const chartData = data.map((item) => ({
        x: item.t,
        y: [item.o, item.h, item.l, item.c],
      }));
      setOptions({
        options: {
          ...CHART_OPTIONS,
        },
        series: [
          {
            data: chartData,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  }, [data]);

  return (
    <Chart
      className="text-black mr-3"
      options={options.options}
      series={options.series}
      type="candlestick"
      height={350}
    />
  );
};

export default StockChart;
