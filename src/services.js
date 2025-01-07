import axios from 'axios';
import { POLY_SERVICES_URI } from './consts';
import { getDateForChart } from './utils';
import dayjs from 'dayjs';

const LocalTesting = 'http://localhost:7007';

export const fetchTiingoNews = async ({ symbols }) => {
  try {
    const url = `${POLY_SERVICES_URI}/tiingonews/${symbols}`;
    const response = await axios.get(url);
    const news = response.data.reduce((acc, curr) => {
      if (acc.has(curr.title)) {
        return acc;
      }
      acc.set(curr.title, curr);
      return acc;
    }, new Map());
    return Array.from(news.values());
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, list: [], symbol: '' };
  }
};
export const fetchCurrentTiingoNews = async () => {
  try {
    const url = `${POLY_SERVICES_URI}/tiingonews`;
    const response = await axios.get(url);
    const news = response.data.reduce((acc, curr) => {
      if (acc.has(curr.title)) {
        return acc;
      }
      acc.set(curr.title, curr);
      return acc;
    }, new Map());
    return Array.from(news.values());
  } catch (error) {
    console.error('Error fetching current tiingo news:', error);
    return { error: true, list: [], symbol: '' };
  }
};
export const fetchStockDescription = async (symbol) => {
  try {
    const url = `${POLY_SERVICES_URI}/desc/${symbol}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true };
  }
};
export const fetchStockCandles = async ({ symbol, date }) => {
  try {
    const url = `${POLY_SERVICES_URI}/agg/${symbol}/${date}`;
    console.log(url);
    const response = await axios.get(url);
    const chartData = response.data?.results;

    return {
      data: chartData.map((d) => {
        const time = dayjs(d.t).format('HH:mm');
        const currentChartDate = getDateForChart(time);
        const { o, h, l, c } = d;
        return {
          x: currentChartDate,
          y: [o, h, l, c],
        };
      }),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true };
  }
};

export const fetchHistoricalData = async (date) => {
  try {
    const response = await axios.get(`${POLY_SERVICES_URI}/topVolume/${date}`);
    return response.data;
  } catch (error) {
    return { error: true, stocks: [], market: [] };
  }
};

export const fetchNews = async ({ symbol, date }) => {
  try {
    const response = await axios.get(
      `${POLY_SERVICES_URI}/news/${symbol}/${date}`
    );
    return { list: response.data?.results, symbol };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, list: [], symbol: '' };
  }
};

export const postConfig = async (config) => {
  try {
    const response = axios.post(`${POLY_SERVICES_URI}/pubconfig`, config);
    return response.data;
  } catch (error) {
    console.error('Error posting scanner config:', error);
    throw error;
  }
};

export const fetchPolyDetail = async (symbol) => {
  try {
    const response = await axios.get(`${POLY_SERVICES_URI}/detail/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPolyTicker = async (symbol) => {
  try {
    const response = await axios.get(`${POLY_SERVICES_URI}/ticker/${symbol}`);
    return response?.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
