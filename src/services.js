import axios from 'axios';
import { POLY_SERVICES_URI } from './consts';

const LocalTesting = 'http://localhost:7007';
export const fetchStockCandles = async ({ symbol, date }) => {
  try {
    const url = `${POLY_SERVICES_URI}/agg/${symbol}/${date}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (date) => {
  try {
    const response = await axios.get(`${POLY_SERVICES_URI}/topVolume/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchNews = async ({ symbol, date }) => {
  try {
    const response = await axios.get(
      `${POLY_SERVICES_URI}/news/${symbol}/${date}`
    );
    return response.data?.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
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
