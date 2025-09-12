import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InsuranceCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Default values
  const [baseAmount, setBaseAmount] = useState("200000");
  const [age, setAge] = useState("25");
  const [tenure, setTenure] = useState("10");
  const [type, setType] = useState("life");

  // Results
  const [premium, setPremium] = useState(null);
  const [total, setTotal] = useState(null);

  // Calculation function
  const calculatePremium = () => {
    const base = parseFloat(baseAmount);
    const ageFactor = age < 30 ? 1.05 : age < 50 ? 1.2 : 1.5;
    const typeMultiplier = {
      life: 1.1,
      health: 1.3,
      vehicle: 1.2,
    };

    if (!base || !age || !tenure) return;

    const monthly = (base * ageFactor * typeMultiplier[type]) / 100;
    const totalPayment = monthly * 12 * parseInt(tenure);

    setPremium(monthly.toFixed(2));
    setTotal(totalPayment.toFixed(2));
  };

  // Auto recalc on input change
  useEffect(() => {
    calculatePremium();
  }, [baseAmount, age, tenure, type]);

  // Styles
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
          Insurance Calculator
        </h2>
        <p>
          A loan calculator is a financial tool (either online, in a banking
          app, or as a program) that helps you figure out the key details of a
          loan before or after you borrow money.
        </p>
      </div>
      <div className="flex max-sm:flex-col">
        {/* Input Section */}
        <div className={`${containerStyle} space-y-2`}>
          {/* Base Amount */}
          <div onChange={calculatePremium}>
            <label
              for="amount"
              className={`flex justify-between ${labelStyle}`}
            >
              Base Amount (₹):{" "}
              <span className="font-semibold text-sm underline">
                {baseAmount}
              </span>
            </label>
            <input
              id="amount"
              type="range"
              min="10000"
              max="1000000"
              step="1000"
              value={baseAmount}
              onChange={(e) => setBaseAmount(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Age */}
          <div onChange={calculatePremium}>
            <label for="age" className={`flex justify-between ${labelStyle}`}>
              Age:{" "}
              <span className="font-semibold text-sm underline">{age}</span>
            </label>
            <input
              id="age"
              type="range"
              min="18"
              max="100"
              step="1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Tenure */}
          <div onChange={calculatePremium}>
            <label
              for="tenure"
              className={`flex justify-between ${labelStyle}`}
            >
              Tenure (Years):{" "}
              <span className="font-semibold text-sm underline">{tenure}</span>
            </label>
            <input
              id="tenure"
              type="range"
              min="1"
              max="40"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Type */}
          <div onChange={calculatePremium}>
            <label className={labelStyle}>Type of Insurance:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`${inputStyle} w-full mt-2`}
            >
              <option value="life">Life Insurance</option>
              <option value="health">Health Insurance</option>
              <option value="vehicle">Vehicle Insurance</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div
          className={`bg-orange-400 p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10`}
        >
          <div className="h-[12vh] flex justify-center items-center">
            <h1>
              <strong className="text-3xl">Premium Summary:</strong>
            </h1>
          </div>
          <hr />
          <div className="space-y-8 pt-11 grid grid-cols-2 px-10">
            <p>
              <h2 className="text-lg font-bold">₹ {premium}</h2>
              <span className="text-sm">Monthly Premium</span>
            </p>
            <p>
              <h2 className="text-lg font-bold">₹ {total}</h2>
              <span className="text-sm">Total over {tenure} years</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCalculator;
