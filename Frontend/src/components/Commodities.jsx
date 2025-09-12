import React, { useEffect, useState } from "react";
import { TrendingUp, DollarSign, BarChart } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_KEY = "19c48a3bbc29aa031eceb513ee213715";
const CURRENCY = "USD";
const SYMBOL_MAP = { XAU: "USDXAU", XAG: "USDXAG", XPT: "USDXPT" };

export default function Commodities() {
  const [commodity, setCommodity] = useState("XAU");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPastDates = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates.reverse();
  };

  useEffect(() => {
    async function fetchData(symbol) {
      setLoading(true);
      try {
        const dates = getPastDates(7);
        const responses = await Promise.all(
          dates.map((date) =>
            fetch(
              `https://api.metalpriceapi.com/v1/${date}?api_key=${API_KEY}&base=${CURRENCY}&currencies=${symbol}`
            ).then((res) => res.json())
          )
        );

        const chartData = responses.map((response, index) => ({
          date: dates[index],
          price: response.rates?.[SYMBOL_MAP[symbol]] ?? null,
        }));

        setData(chartData.filter((d) => d.price !== null));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData(commodity);
  }, [commodity]);

  return (
    <div
      className=" h-[40vh] w-[20vw] border-2 border-gray-200 rounded-lg overflow-hidden space-y-2 py-2 sm:max-md:h-[35vh] max-sm:h-auto max-sm:w-full"
    >
      <h3 className="flex font-semibold text-base mb-2 text-orange-600 sm:max-xl:text-xs max-sm:text-xs">
        <span className="scale-75 sm:max-xl:scale-50 max-sm:scale-50 text-amber-300 mr-2"><BarChart/></span> Commodities Price
      </h3>

      {/* Dropdown */}
      <div className="mb-2 flex justify-center">
        <select
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="border px-2 rounded text-sm w-[80%] mb-4 sm:max-xl:text-[10px] max-sm:text-[10px]"
        >
          <option value="XAU">Gold (XAU)</option>
          <option value="XAG">Silver (XAG)</option>
          <option value="XPT">Platinum (XPT)</option>
        </select>
      </div>

      {/* Graph */}
      {loading ? (
        <p className="text-center mt-4 text-sm">Loading...</p>
      ) : (
        <div className="mb-4 relative">
          <ResponsiveContainer width="100%" height={160} className=" relative -left-5 sm:max-xl:-left-10 max-sm:-left-10">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis domain={["auto", "auto"]} fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke={
                  commodity === "XAU"
                    ? "#FFD700"
                    : "#FFD700"
                }
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

