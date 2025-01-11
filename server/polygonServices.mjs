import axios from 'axios';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  EXCLUDED,
  TIINGO_NEWS_URL,
  TIINGO_SYMBOLS_NEWS_URL,
  TIINGO_NEWS_DETAIL_URL,
} from './consts.mjs';
import {
  fetchPreviousTradingAgg,
  fetchTradingAgg,
  checkPolyResults,
  normalizeData,
  getSpyQqq,
  getTopVolume,
} from './polygonUtils.mjs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.json({ agg: 'ok' });
});

app.get('/related/:symbol', async (req, res) => {
  const url = RELATED_COMPANIES_URL(req.params.symbol);
  console.log(url);
  const {
    data: { results },
  } = await axios.get(url);
  console.log('=====> related', results);
  res.json(results);
});

app.get('/agg/:symbol/:date', async (req, res) => {
  try {
    const reqData = {
      symbol: req.params.symbol,
      date: req.params.date,
    };
    const url = getAggApi(reqData);
    console.log(url);
    const response = await axios.get(url);

    if (response.status === 404) {
      res.status(404).json({ error: 'Not Found' });
    } else {
      const {
        data: { results },
      } = response;
      res.json({ results });
    }
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.get('/tiingonews/:symbols', async (req, res) => {
  const url = TIINGO_SYMBOLS_NEWS_URL(req.params.symbols);
  console.log(url);
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.get('/tiingonews', async (req, res) => {
  const url = TIINGO_NEWS_URL();
  console.log(url);
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.get('/news/:symbol/:date', async (req, res) => {
  const url = `${POLYGON_NEWS_URL}?ticker=${req.params.symbol}&published_utc.lt=${req.params.date}&order=desc&limit=20&apiKey=${process.env.POLYGON_APIKEY}`;
  console.log(url);
  const {
    data: { results },
  } = await axios.get(url);
  res.json({ results });
});
app.get('/detail/:symbol', async (req, res) => {
  const url = `${POLYGON_DETAIL_URL}/${req.params.symbol}?apiKey=${process.env.POLYGON_APIKEY}`;
  console.log(url);
  const { data } = await axios.get(url);
  res.json({ ticker: data?.ticker });
});

app.get('/ticker/:symbol', async (req, res) => {
  const url = `${POLYGON_TICKER_URL}&ticker=${req.params.symbol}&apiKey=${process.env.POLYGON_APIKEY}`;
  console.log(url);
  const { data } = await axios.get(url);
  res.json(data);
});

app.get('/topVolume/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const previousVolume = checkPolyResults(
      await fetchPreviousTradingAgg(date)
    );
    const currentVolume = checkPolyResults(await fetchTradingAgg(date));
    if (!previousVolume.length || !currentVolume.length) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }
    const market = getSpyQqq(previousVolume, currentVolume);

    const currTopVolume = normalizeData(
      currentVolume
        .sort((a, b) => b.v - a.v)
        .filter((stock) => !EXCLUDED.includes(stock.T))
        .slice(0, 50)
    );

    const stocks = getTopVolume(previousVolume, currTopVolume);
    console.log('---------> top volume ===========');
    res.json({ stocks, market });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/desc/:symbol', async (req, res) => {
  try {
    const url = TIINGO_NEWS_DETAIL_URL(req.params.symbol);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.listen(7007, () => {
  console.log('Server is running on port 7007');
});
