// File: components/FinanceSection.jsx
import NewsImage from "../../assets/Money1.jpg";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redo2 } from "lucide-react";
import LoanCalculator from "../calculator/LoanCalculator";
import InsuranceCalculator from "../calculator/InsuranceCalculator";
import NetWorthCalculator from "../calculator/NetWorthCalculator";
import BudgetPlanner from "../calculator/BudgetPlanner";
import InvestmentCalculator from "../calculator/InvestmentCalculator";
import CreditScoreEstimator from "../calculator/CreditScoreEstimator";
import RevenueCalculator from "../calculator/RevenueCalculator";
import NewsLetter from "./NewsLetter";
import Commodities from "../Commodities";
import CurrencyConverter from "../CurrencyConverter";
import toast, { Toaster } from "react-hot-toast";
import {
  BellDot,
  Newspaper,
  Megaphone,
  Sparkles,
  Flame,
  Sparkle,
  Circle,
} from "lucide-react";
import { Link } from "react-router";
import Insight from "../common/Insight";

const FinanceSection = ({
  articles,
  loadingArticles,
  accent = "#ff8800",
  cardBg,
  border,
  text,
  data,
}) => {
  
  const recent = (articles ?? []).filter((article) => {
    const uploadedDate = new Date(article.createdAt);
    return uploadedDate <= new Date(); // just check it's a valid date
  });

  const recommended = (articles ?? [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .reduce((acc, article) => {
      if (!acc.some((a) => a.category === article.category)) {
        acc.push(article);
      }
      return acc;
    }, [])
    .slice(0, 4);

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
  const commodities = [
    {
      id: "diamond",
      icon: "💎",
      name: "Diamond",
      price: "₹80,000 / carat",
      profitPercent: "+5%",
      lossPercent: "-2%",
      updatedDate: "2025-08-20",
    },
    {
      id: "gold",
      icon: "🪙",
      name: "Gold (24K)",
      price: "₹6,120 / gram",
      profitPercent: "+3%",
      lossPercent: "-1%",
      updatedDate: "2025-08-21",
    },
    {
      id: "silver",
      icon: "🥈",
      name: "Silver",
      price: "₹72,500 / kg",
      profitPercent: "+1%",
      lossPercent: "-0.5%",
      updatedDate: "2025-08-18",
    },
  ];

  const calculatorMap = {
    LoanCalculator,
    InsuranceCalculator,
    NetWorthCalculator,
    BudgetPlanner,
    InvestmentCalculator,
    CreditScoreEstimator,
    RevenueCalculator,
  };
  const CalculatorComponent =
    calculatorMap[`${data}Calculator`] || LoanCalculator;

  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [fuelType, setFuelType] = useState("petrol");
  const [selected, setSelected] = useState("Diamond");
  const selectedCommodity = commodities.find((c) => c.name === selected);

  const API = `${import.meta.env.VITE_BACKEND_URL}`;

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
      className="p-3 rounded-lg border transition-colors duration-300 space-y-6 max-sm:w-[100%]"
      style={{
        backgroundColor: cardBg || (isDarkMode ? "#111827" : "#f9fafb"),
        borderColor: border || (isDarkMode ? "#374151" : "#d1d5db"),
        color: text || (isDarkMode ? "#f8fafc" : "#111827"),
      }}
    >
      {/* Recent News Headlines */}
      <div id="latestUpdates" className="grid grid-cols-1 py-2">
        <h2 className="text-xl font-semibold mb-4 sm:max-xl:text-sm sm:max-xl:mb-1 max-sm:text-sm max-sm:mb-1">
          {" "}
          Live Update
        </h2>
        {recent.slice(0, 4).map((article, i) => (
          <Link to={`/blog/${article._id}`}>
            <div
              key={i}
              className=""
              style={{
                backgroundColor: isDarkMode ? "#1e2532" : "#fff",
                borderColor: isDarkMode ? "#32344a" : "#e5e7eb",
                color: isDarkMode ? "#f8fafc" : "#1f2937",
              }}
            >
              <div className="flex items-center space-x-2 py-1 sm:max-xl:space-x-0 max-sm:space-x-0">
                <Circle className="scale-50 text-[#f77331] fill-current sm:max-xl:scale-25 max-sm:scale-25" />
                <h1 className="font-medium text-[#666666] text-xs sm:max-xl:text-[11px] max-sm:text-[11px]">
                  LIVE UPDATE
                </h1>
              </div>
              <h1 className="font-medium text-lg mb-2 sm:max-xl:text-[12px] max-sm:text-[12px]">
                {article.title}{" "}
              </h1>
              <p className="text-sm sm:max-xl:text-[11px] max-sm:text-[11px]">
                {article.sections[0].description.length > 150
                  ? article.sections[0].description.slice(0, 150) + " ..."
                  : article.sections[0].description}
              </p>
              <div className="flex text-[11px] space-x-4 text-[#666666] mt-1 items-center sm:max-xl:mt-0 sm:max-md:space-x-1 sm:max-md:mt-1 max-sm:mt-1 max-sm:space-x-1">
                <span>4 MIN READ</span>
                <span>
                  <Circle className="w-1 fill-current" />
                </span>
                <span>
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <hr className="text-gray-300 mt-2" />
            </div>
          </Link>
        ))}
      </div>

      {/* Finance Academy  */}
      <div className="max-w-3xl w-full bg-white rounded-2xl border border-gray-200 overflow-hidden transition-colors mx-auto my-8 sm:max-xl:m-0 max-sm:m-0">
        {/* Top Accent Bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #ffbb66)` }}
        />

        {/* Header */}
        <div className="px-6 py-6 sm:max-xl:px-1 text-center max-sm:px-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 md:max-xl:text-sm sm:max-md:text-[12px] max-sm:text-[12px]">
            🎓 Finance Academy
          </h2>
          <p className="text-gray-700 text-sm text-left sm:max-xl:text-[10px] max-sm:text-[10px]">
            Empower yourself with the latest financial knowledge, practical
            skills, and strategies to grow your wealth. Our Finance Academy
            offers curated lessons for beginners and professionals alike.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="px-6 pb-6 flex flex-col gap-4 text-center sm:max-xl:px-2 max-sm:px-2">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900 sm:max-xl:text-xs max-sm:text-xs">
              📈 Learn Investments
            </h3>
            <p className="text-gray-600 text-sm mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
              From stocks to mutual funds, understand how to grow your wealth
              strategically.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900 sm:max-xl:text-xs max-sm:text-xs">
              💡 Smart Strategies
            </h3>
            <p className="text-gray-600 text-sm mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
              Discover proven techniques for budgeting, saving, and long-term
              financial planning.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900 sm:max-xl:text-xs max-sm:text-xs">
              🎯 Expert Guidance
            </h3>
            <p className="text-gray-600 text-sm mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
              Learn from experienced professionals and practical case studies
              for real-world finance.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mb-3">
          <button
            onClick={() => {
              toast(`${name} — Coming Soon!`, {
                icon: "📢",
              });
            }}
            className="font-bold bg-[#f77331] px-2 py-1 rounded-lg border text-white sm:max-xl:text-xs max-sm:text-xs"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Recommended */}
      <div className="grid grid-cols-1 py-2">
        <h2 className="text-2xl font-semibold mb-4 sm:max-xl:text-sm max-sm:text-xs">
          Recommended For You
        </h2>
        {recommended.map((article, i) => (
          <Link to={`/blog/${article._id}`}>
            <div
              key={i}
              className=""
              style={{
                backgroundColor: isDarkMode ? "#1e2532" : "#fff",
                borderColor: isDarkMode ? "#32344a" : "#e5e7eb",
                color: isDarkMode ? "#f8fafc" : "#1f2937",
              }}
            >
              <div className="flex items-center space-x-1 py-1">
                <Sparkles className="scale-50 text-[#f77331] fill-current sm:max-xl:scale-35 max-sm:scale-35" />
                <h1 className="font-medium text-[#666666] text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                  RECOMMENDED ARTICLE
                </h1>
              </div>
              <h1 className="font-medium text-lg mb-2 sm:max-xl:text-sm max-sm:text-sm">
                {article.title}{" "}
              </h1>
              <p className="text-sm sm:max-xl:text-[10px] max-sm:text-[10px]">
                {article.sections[0].description.length > 150
                  ? article.sections[0].description.slice(0, 150) + " ..."
                  : article.sections[0].description}
              </p>
              <div className="flex text-[11px] space-x-4 text-[#666666] mt-1 items-center sm:max-md:space-x-1 max-sm:space-x-1">
                <span>4 MIN READ</span>
                <span>
                  <Circle className="w-1 fill-current" />
                </span>
                <span>
                  {new Date(article.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <hr className="text-gray-300 mt-2" />
            </div>
          </Link>
        ))}
      </div>

      {/* Fuel Dashboard  */}
      <div id="fuelDashboard" className="w-full rounded-2xl border border-gray-200 overflow-hidden transition-colors bg-white">
        {/* Top Accent */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #ffbb66)` }}
        />

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between sm:max-xl:px-1 sm:max-md:flex-col max-sm:px-1">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 sm:max-xl:text-[11px] sm:max-xl:gap-1 max-sm:text-[11px] max-sm:gap-1">
            Fuel Prices
            <span className="bg-orange-700 text-white text-xs font-semibold px-2 py-0.5 rounded-full sm:max-xl:text-[10px] max-sm:text-[10px]">
              Live
            </span>
          </h3>
          <span className="text-sm text-gray-400 sm:max-xl:text-[10px] max-sm:text-[10px]">
            {selectedCity}
          </span>
        </div>

        <hr className="border-gray-200" />

        {/* City Selector */}
        <div className="px-5 py-3">
          <label
            htmlFor="stateSelect"
            className="block text-sm font-medium text-gray-700 mb-2 sm:max-xl:text-[11px] max-sm:text-[11px]"
          >
            Select State / City
          </label>
          <select
            id="stateSelect"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition sm:max-xl:p-1 sm:max-xl:text-xs max-sm:p-1 max-sm:text-xs"
          >
            {Object.keys(fuelData).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type Tabs */}
        <div className="px-5 py-3 flex gap-4">
          {["petrol", "diesel","CNG","LPG"].map((type) => (
            <button
              key={type}
              onClick={() => setFuelType(type)}
              className={`flex-1 text-center py-2 rounded-lg font-semibold transition sm:max-xl:text-xs max-sm:text-xs ${
                fuelType === type
                  ? "bg-[#f77331] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-50"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Price & Details Display */}
        <div className="px-5 py-6">
          {/* Current Price */}
          <p className="text-3xl font-extrabold text-gray-900 max-sm:text-lg sm:max-xl:text-lg">
            ₹{fuelData[selectedCity][fuelType]}
          </p>
          <div className="mt-1 flex items-center justify-center gap-2 text-sm font-medium sm:max-xl:text-[10px] max-sm:text-[10px]">
            <span className="text-green-500">{`+145.28`}</span>
            <span className="text-green-500">(+8.9%)</span>
          </div>

          {/* Detailed Info Cards */}
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm md:max-xl:gap-1 md:max-xl:text-[10px] sm:max-md:text-[8px] max-sm:text-[8px]">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <p className="font-semibold text-gray-700">Daily Avg</p>
              <p className="mt-1 text-gray-900 font-bold">
                ₹{fuelData[selectedCity][fuelType] - 5}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <p className="font-semibold text-gray-700">Monthly Avg</p>
              <p className="mt-1 text-gray-900 font-bold">
                ₹{fuelData[selectedCity][fuelType] - 12}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 col-span-2 sm:max-xl:text-sm max-sm:text-sm">
              <p className="font-semibold text-gray-700">Consumption Tip</p>
              <p className="mt-1 text-gray-900 text-xs max-sm:text-[10px] sm:max-xl:text-[10px]">
                Avoid peak hours to save fuel and reduce cost. Check local fuel
                alerts daily.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Commodities  */}

      <div id="goldRates" className="space-y-5 text-sm">
        <Commodities />
      </div>

      {/* Currency Converter  */}

      <div id="currencyConverter" className="space-y-5 text-sm">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default FinanceSection;
