import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InvestmentCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [initial, setInitial] = useState("50000");
  const [monthly, setMonthly] = useState("2000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState(null);

  const calculateInvestment = () => {
    const P = parseFloat(initial);
    const PMT = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12; // monthly rate
    const n = parseFloat(years) * 12; // total months

    if (!P || !PMT || !r || !n) return;

    const futureValue =
      P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const totalInvested = P + PMT * n;
    const gain = futureValue - totalInvested;

    setResult({
      futureValue: futureValue.toFixed(2),
      invested: totalInvested.toFixed(2),
      gain: gain.toFixed(2),
    });
  };

  useEffect(() => {
    calculateInvestment();
  }, [initial, monthly, rate, years]);

  const containerStyle = `p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 ${
    isDarkMode ? "bg-black" : "bg-white"
  }`;

  const inputStyle = `p-2 rounded-md border focus:outline-none accent-orange-400 ${
    isDarkMode
      ? "bg-black text-white border-amber-600"
      : "bg-white text-black border-black"
  }`;

  const labelStyle = isDarkMode
    ? "text-white font-bold"
    : "text-black font-bold";

  return (
    <div className="py-6 px-4 bg-gray-100">
      {/* Header */}
      <div className="w-full border-2 border-gray-100 bg-white rounded-sm p-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-amber-600" : "text-black"
          }`}
        >
          Investment Calculator
        </h2>
        <p>
          An investment calculator helps estimate how your money grows over
          time, considering compounding, contributions, and interest rate.
        </p>
      </div>

      {/* Calculator Section */}
      <div className="flex max-sm:flex-col">
        {/* Left - Input Sliders */}
        <div className={containerStyle}>
          <div className="flex flex-col space-y-5 py-5">
            {/* Initial Investment */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Initial Investment (₹):
                <span className="font-semibold text-sm underline">
                  {initial}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Monthly Contribution (₹):
                <span className="font-semibold text-sm underline">
                  {monthly}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="500"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Annual Interest Rate (%):
                <span className="font-semibold text-sm underline">{rate}</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>

            {/* Years */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Investment Duration (Years):
                <span className="font-semibold text-sm underline">{years}</span>
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>
          </div>
        </div>

        {/* Right - Results */}
        <div className="p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 bg-amber-600 text-white">
          <div className="h-[12vh] flex justify-center items-center">
            <h1>
              <strong className="text-3xl">Future Value:</strong>
              <span className="ml-4 font-semibold">
                ₹{result ? result.futureValue : 0}
              </span>
            </h1>
          </div>
          <hr />
          <div className="space-y-8 pt-11 grid grid-cols-2 px-10">
            <p>
              <h2 className="text-lg font-bold">
                ₹ {result ? result.invested : 0}
              </h2>
              <span className="text-sm">Total Invested</span>
            </p>
            <p>
              <h2 className="text-lg font-bold">
                ₹ {result ? result.gain : 0}
              </h2>
              <span className="text-sm">Estimated Gain</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
