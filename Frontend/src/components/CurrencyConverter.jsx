import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign, BarChart } from "lucide-react";

const API_KEY = "abbeb1df21a2f111fcb148e3";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);

  // Fetch rates whenever `from` currency changes
  useEffect(() => {
    fetch(`${BASE_URL}/${from}`)
      .then((res) => res.json())
      .then((data) => {
        setRates(data.conversion_rates);
        setCurrencies(Object.keys(data.conversion_rates));
      })
      .catch((err) => console.error("Error fetching rates:", err));
  }, [from]);

  // Update conversion result
  useEffect(() => {
    if (!amount || !to || !rates[to]) return;
    setResult((amount * rates[to]).toFixed(2));
  }, [amount, to, rates]);

  return (
    <div
      className=" mx-auto p-4 bg-white shadow-lg rounded-xl border-2 border-gray-200 sm:max-xl:px-2 max-sm:px-2"
      // style={{
      //   animation: "blink 1.5s infinite alternate",
      // }}
    >
      <h3 className="flex items-center font-semibold text-base mb-2 text-orange-600 sm:max-xl:text-xs max-sm:text-xs">
        <span className="scale-75 text-black mr-2 sm:max-xl:scale-50 max-sm:scale-50">
          <DollarSign />
        </span>{" "}
        Currency Converter
      </h3>

      <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-xl border border-gray-200">
        {/* Amount Input */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm font-medium mb-1 sm:max-xl:text-xs max-sm:text-xs">
            Amount
          </label>
          <input
            id="amount"
            type="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-sm border px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 sm:max-xl:text-[10px] max-sm:text-[10px]"
            placeholder="Enter amount"
          />
        </div>

        {/* From Currency */}
        <div className="flex flex-col">
          <label htmlFor="from" className="text-sm font-medium mb-1 sm:max-xl:text-xs max-sm:text-xs">
            Amount From
          </label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="text-sm border px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 sm:max-xl:text-[10px] max-sm:text-[10px]"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* To Currency */}
        <div className="flex flex-col">
          <label htmlFor="to" className="text-sm font-medium mb-1 sm:max-xl:text-xs max-sm:text-xs">
            Converted To
          </label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="text-sm border px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 sm:max-xl:text-[10px] max-sm:text-[10px]"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="mt-3 p-3 bg-orange-100 rounded-lg text-center font-semibold text-orange-700 shadow-sm sm:max-xl:p-1 sm:max-xl:text-xs max-sm:p-1 max-sm:text-xs">
          {amount} {from} = {result ? result : "..."} {to}
        </div>
      </div>
    </div>
  );
}
