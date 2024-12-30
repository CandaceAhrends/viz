import axios from 'axios';
import { POLY_SERVICES_URI } from './consts';

const LocalTesting = 'http://localhost:7007';
export const fetchStockData = async (symbol) => {
  try {
    const tdate = '2024-12-30';
    const url = `${POLY_SERVICES_URI}/agg/${symbol}/${tdate}`;
    console.log(url);
    const response = await axios.get(url);
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
