import axios from 'axios';
import {
  STOCK_SCANNER_URI,
  STOCK_API_URI,
  NEWS_API_URI,
  CONFIG_SCANNER_URI,
  POLY_DETAIL_URI,
  POLY_TICKER_URI,
} from './consts';

export const fetchScanResults = async () => {
  try {
    const response = await axios.get(`${STOCK_SCANNER_URI}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(`${STOCK_API_URI}/${symbol}`);
    return response.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchNews = async (symbol) => {
  try {
    const response = await axios.get(`${NEWS_API_URI}/${symbol}`);
    return response.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postConfig = async (config) => {
  try {
    const response = axios.post(`${CONFIG_SCANNER_URI}`, config);
    return response.data;
  } catch (error) {
    console.error('Error posting scanner config:', error);
    throw error;
  }
};

export const fetchPolyDetail = async (symbol) => {
  try {
    const response = await axios.get(`${POLY_DETAIL_URI}/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPolyTicker = async (symbol) => {
  try {
    const response = await axios.get(`${POLY_TICKER_URI}/${symbol}`);
    return response?.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
