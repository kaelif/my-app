'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Stocks() {
  const apiKey = 'PBAWZ4U633UA1JJJ';
  const [symbol, setSymbol] = useState('IBM'); // Default stock symbol
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        );

        const timeSeries = response.data['Time Series (5min)'];
        if (!timeSeries) {
          setError('Invalid stock symbol or API limit reached.');
          setStockData([]);
          setLoading(false);
          return;
        }

        // Format data for Recharts
        const formattedData = Object.keys(timeSeries).map((time) => ({
          time,
          price: parseFloat(timeSeries[time]['1. open']),
        }));

        setStockData(formattedData.reverse()); // Reverse to show data in order
      } catch (error) {
        setError('Failed to fetch stock data. Please try again.');
        console.error("Stocks API Error:", error);
      }
      setLoading(false);
    };

    fetchStocks();
  }, [symbol]); // Re-fetch when the stock symbol changes

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Stocks</h1>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
          />
        </div>

        {loading && <p className="text-center text-gray-600">Loading stock data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && stockData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
