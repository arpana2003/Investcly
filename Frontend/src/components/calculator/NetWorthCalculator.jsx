import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const NetWorthCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [assets, setAssets] = useState([{ label: "Bank", value: "50000" }]);
  const [liabilities, setLiabilities] = useState([{ label: "Loan", value: "20000" }]);
  const [netWorth, setNetWorth] = useState({ assets: 0, liabilities: 0, net: 0 });

  const handleChange = (list, setList, index, key, val) => {
    const updated = [...list];
    updated[index][key] = val;
    setList(updated);
  };

  const addField = (list, setList) => {
    setList([...list, { label: "", value: "0" }]);
  };

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
    setNetWorth({
      assets: totalAssets.toFixed(2),
      liabilities: totalLiabilities.toFixed(2),
      net: (totalAssets - totalLiabilities).toFixed(2),
    });
  };

  useEffect(() => {
    calculateNetWorth();
  }, [assets, liabilities]);

  const inputStyle = `p-2 rounded-md border focus:outline-none accent-orange-400 ${
    isDarkMode
      ? "bg-black text-white border-amber-600"
      : "bg-white text-black border-black"
  }`;

  const labelStyle = isDarkMode
    ? "text-white font-bold"
    : "text-black font-bold";

  const containerStyle = `p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 ${
    isDarkMode ? "bg-black" : "bg-white"
  }`;

  return (
    <div className="px-4 py-6 bg-gray-100">
      <div className="w-full bg-white rounded-sm p-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-amber-600" : "text-black"
          }`}
        >
          Net Worth Calculator
        </h2>
        <p>
          This tool helps you calculate your financial net worth by subtracting
          your liabilities from your assets.
        </p>
      </div>

      <div className="flex max-sm:flex-col">
        {/* Left Section - Inputs */}
        <div className={containerStyle}>
          {/* Assets */}
          <div className="flex justify-between">
          <h3 className={`text-lg mb-3 ${labelStyle}`}>Assets</h3>
          <button
            onClick={() => addField(assets, setAssets)}
            className="text-amber-600 underline mb-6"
          >
            + Add Asset
          </button>
          </div>
          {assets.map((item, i) => (
            <div key={i} className="mb-4">
              <div>
                <label className={`flex justify-between ${labelStyle}`}>
                  Value (₹): <span className="underline">{item.value}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="500"
                  value={item.value}
                  onChange={(e) => handleChange(assets, setAssets, i, "value", e.target.value)}
                  className={`${inputStyle} w-full`}
                />
              </div>
            </div>
          ))}

          {/* Liabilities */}
          <div className="flex justify-between">
          <h3 className={`text-lg mb-3 ${labelStyle}`}>Liabilities</h3>
          <button
            onClick={() => addField(liabilities, setLiabilities)}
            className="text-amber-600 underline"
          >
            + Add Liability
          </button>
          </div>
          {liabilities.map((item, i) => (
            <div key={i} className="mb-4">
              <div>
                <label className={`flex justify-between ${labelStyle}`}>
                  Value (₹): <span className="underline">{item.value}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="500"
                  value={item.value}
                  onChange={(e) => handleChange(liabilities, setLiabilities, i, "value", e.target.value)}
                  className={`${inputStyle} w-full`}
                />
              </div>
            </div>
          ))}

        </div>

        {/* Right Section - Results */}
        <div className="p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 bg-orange-400 text-white max-sm:px-0">
          <div className="h-[12vh] flex justify-center items-center">
            <h1>
              <strong className="text-3xl">Net Worth</strong>
            </h1>
          </div>
          <hr />
          <div className="space-y-8 pt-11 grid grid-cols-2 px-6">
            <p>
              <h2 className="text-lg font-bold">₹ {netWorth.assets}</h2>
              <span className="text-sm">Total Assets</span>
            </p>
            <p>
              <h2 className="text-lg font-bold">₹ {netWorth.liabilities}</h2>
              <span className="text-sm">Total Liabilities</span>
            </p>
            <p>
              <h2
                className={`text-lg font-bold ${
                  netWorth.net >= 0 ? "text-green-300" : "text-red-300"
                }`}
              >
                ₹ {netWorth.net}
              </h2>
              <span className="text-sm">Net Worth</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator;
