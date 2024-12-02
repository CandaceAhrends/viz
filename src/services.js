import axios from 'axios';
import {
  POLY_SERVICES_URI,
  CONFIG_SCANNER_URI,
  POLY_TICKER_URI,
} from './consts';

export const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(`${POLY_SERVICES_URI}/agg/${symbol}`);
    return response.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchNews = async (symbol) => {
  try {
    const response = await axios.get(`${POLY_SERVICES_URI}/news/${symbol}`);
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
