// File: components/FinanceSection.jsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redo2 } from 'lucide-react';
import LoanCalculator from "../calculator/LoanCalculator";

const FinanceSection = ({ accent = "#ff8800", cardBg, border, text }) => {
  const [btcEur, setBtcEur] = useState(null);
  const [ethInr, setEthInr] = useState(null);
  const [intraday, setIntraday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const fuelData = {
    Mumbai: { petrol: 106.29, diesel: 94.25 },
    Delhi: { petrol: 96.72, diesel: 89.62 },
    Kolkata: { petrol: 106.03, diesel: 92.76 },
    Chennai: { petrol: 102.63, diesel: 94.24 },
    Bengaluru: { petrol: 101.94, diesel: 87.89 },
    Hyderabad: { petrol: 109.66, diesel: 97.82 },
  };

  const [selectedCity, setSelectedCity] = useState("Mumbai");


  const API = process.env.NODE_ENV === "production"
    ? "https://dynamicnewsbackend.vercel.app"
    : "http://localhost:5000";

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/finance/btc-eur`).then((res) => res.json()),
      fetch(`${API}/api/finance/eth-inr`).then((res) => res.json()),
      fetch(`${API}/api/finance/intraday?symbol=IBM`).then((res) => res.json()),
    ])
      .then(([btcData, ethData, intradayData]) => {
        setBtcEur(btcData["Realtime Currency Exchange Rate"]);
        setEthInr(ethData["Realtime Currency Exchange Rate"]);
        const series = intradayData["Time Series (5min)"];
        const firstEntry = series ? Object.entries(series)[0] : null;
        if (firstEntry) {
          const [timestamp, data] = firstEntry;
          setIntraday({ timestamp, ...data });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  const sectionBoxStyle = {
    backgroundColor: isDarkMode ? "#1f1f2e" : "#ffffff",
    borderColor: border || (isDarkMode ? "#374151" : "#d1d5db"),
    color: text || (isDarkMode ? "#f8fafc" : "#1f2937"),
  };

  return (
    <div
      className="p-4 rounded-lg shadow border transition-colors duration-300 space-y-6"
      style={{
        backgroundColor: cardBg || (isDarkMode ? "#111827" : "#f9fafb"),
        borderColor: border || (isDarkMode ? "#374151" : "#d1d5db"),
        color: text || (isDarkMode ? "#f8fafc" : "#111827"),
      }}
    >
      {/* Recent News Headlines */}
      <div className="grid grid-cols-1 gap-3">
        <h2 className="text-lg font-semibold mb-2" style={{ color: accent }}>
          📰 Recent News Headlines
        </h2>
        {["RBI holds repo rate at 6.5%", "Bitcoin surges past $70,000", "US markets up on inflation dip", "Gold spikes on geopolitical fears"].map((headline, i) => (
          <div
            key={i}
            className="p-3 rounded-full border shadow-sm font-medium text-[12px] cursor-pointer hover:shadow-lg transition-shadow duration-200 flex items-center gap-2 hover:border-amber-600"
            style={{
              backgroundColor: isDarkMode ? "#1e2532" : "#fff",
              borderColor: isDarkMode ? "#32344a" : "#e5e7eb",
              color: isDarkMode ? "#f8fafc" : "#1f2937",
            }}
          >
            <span>{isDarkMode ? <Redo2 color="#f8fafc" /> : <Redo2 color="#1f2937" />}</span><span>{headline} </span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
        <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>
          📰 Recently in Finance
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li><a href="#" className="hover:underline text-blue-500">Bitcoin crosses $70,000 amid ETF optimism</a></li>
          <li><a href="#" className="hover:underline text-blue-500">Gold prices surge due to geopolitical tensions</a></li>
          <li><a href="#" className="hover:underline text-blue-500">RBI holds repo rate steady at 6.5%</a></li>
          <li><a href="#" className="hover:underline text-blue-500">US markets rally as inflation eases</a></li>
          <li><a href="#" className="hover:underline text-blue-500">Oil dips below $80 per barrel</a></li>
        </ul>
        <p className="text-xs italic text-gray-400 mt-2">*These are sample headlines. You can fetch real data from a finance news API.</p>
      </div>

      <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
        <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>⛽ Fuel Prices Dashboard</h3>

        <div className="mb-3">
          <label htmlFor="stateSelect" className="block text-sm font-medium mb-1">Select State / City:</label>
          <select
            id="stateSelect"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 rounded border"
            style={{
              backgroundColor: isDarkMode ? "#1e2532" : "#fff",
              color: isDarkMode ? "#f8fafc" : "#1f2937",
              borderColor: isDarkMode ? "#32344a" : "#d1d5db",
            }}
          >
            {Object.keys(fuelData).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1 text-sm">
          <p><strong>Petrol:</strong> ₹{fuelData[selectedCity].petrol} / litre</p>
          <p><strong>Diesel:</strong> ₹{fuelData[selectedCity].diesel} / litre</p>
          <p className="text-xs italic text-gray-400 mt-1">*Prices may vary daily by government announcement.</p>
        </div>
      </div>
      <LoanCalculator />

      <h2 className="text-lg font-semibold mb-2" style={{ color: accent }}>💹 Finance & Markets</h2>

      {loading ? (
        <p className="text-sm italic text-gray-400">Loading exchange rates...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error: {error}</p>
      ) : (
        <div className="space-y-5 text-sm">
          {btcEur && (
            <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
              <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>₿ BTC → EUR</h3>
              <p><strong>Rate:</strong> {btcEur["5. Exchange Rate"]}</p>
              <p><strong>Updated:</strong> {btcEur["6. Last Refreshed"]}</p>
            </div>
          )}
          {ethInr && (
            <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
              <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>Ξ ETH → INR</h3>
              <p><strong>Rate:</strong> {ethInr["5. Exchange Rate"]}</p>
              <p><strong>Updated:</strong> {ethInr["6. Last Refreshed"]}</p>
            </div>
          )}
          {intraday && (
            <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
              <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>📈 IBM Stock Snapshot</h3>
              <p><strong>Time:</strong> {intraday.timestamp}</p>
              <p><strong>Open:</strong> {intraday["1. open"]}</p>
              <p><strong>High:</strong> {intraday["2. high"]}</p>
              <p><strong>Low:</strong> {intraday["3. low"]}</p>
              <p><strong>Close:</strong> {intraday["4. close"]}</p>
              <p><strong>Volume:</strong> {intraday["5. volume"]}</p>
            </div>
          )}
          <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
            <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>📊 Top Indices</h3>
            <p><strong>NIFTY 50:</strong> ₹22,350.25</p>
            <p><strong>SENSEX:</strong> ₹74,805.85</p>
            <p><strong>NASDAQ:</strong> $15,864.60</p>
            <p><strong>DOW JONES:</strong> $38,450.75</p>
          </div>
          <div className="p-3 rounded border shadow-sm" style={sectionBoxStyle}>
            <h3 className="font-semibold text-base mb-2" style={{ color: accent }}>🪙 Commodities</h3>
            <p><strong>Gold (24K):</strong> ₹6,120 / gram</p>
            <p><strong>Silver:</strong> ₹72,500 / kg</p>
            <p className="text-xs italic text-gray-400 mt-1">*Mock data, update from backend API if needed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceSection;
