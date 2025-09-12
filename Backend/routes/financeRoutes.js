const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.ALPHA_VANTAGE_KEY; 



// Route 1: BTC to EUR
router.get('/btc-eur', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch BTC to EUR data' });
  }
});

// Route 2: ETH to INR
router.get('/eth-inr', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=ETH&to_currency=INR&apikey=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ETH to INR data' });
  }
});


// Example usage: GET /api/stock/intraday?symbol=IBM
router.get('/intraday', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'Stock symbol is required (e.g., ?symbol=IBM)' });
  }

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data['Error Message']) {
      return res.status(404).json({ error: 'Invalid stock symbol or data not found.' });
    }

    res.json(data);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch intraday stock data', message: err.message });

  }
});



module.exports = router;
