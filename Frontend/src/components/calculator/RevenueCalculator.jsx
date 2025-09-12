import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const RevenueCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [unitsSold, setUnitsSold] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [result, setResult] = useState(null);

  const calculateRevenue = () => {
    const units = parseFloat(unitsSold) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    const income = parseFloat(otherIncome) || 0;
    const cost = parseFloat(expenses) || 0;

    const totalRevenue = units * price + income;
    const netProfit = totalRevenue - cost;

    setResult({
      totalRevenue: totalRevenue.toFixed(2),
      totalExpenses: cost.toFixed(2),
      netProfit: netProfit.toFixed(2),
    });
  };

  const containerStyle = `p-6 rounded-xl shadow-xl max-w-xl w-full mx-auto mt-10 ${
    isDarkMode ? 'bg-black' : 'bg-white'
  }`;

  const inputStyle = `p-2 rounded-md border w-full focus:outline-none ${
    isDarkMode
      ? 'bg-black text-white border-amber-600'
      : 'bg-white text-black border-black'
  }`;

  const labelStyle = `text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`;

  const getProfitColor = () => {
    if (!result) return '';
    return parseFloat(result.netProfit) >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className={containerStyle}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-amber-600' : 'text-black'}`}>
        Revenue & Profit Calculator
      </h2>

      <div className="flex flex-col gap-4">
        <label className={labelStyle}>
          Units Sold
          <input
            type="number"
            value={unitsSold}
            onChange={(e) => setUnitsSold(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 100"
          />
        </label>

        <label className={labelStyle}>
          Price per Unit (₹)
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 150"
          />
        </label>

        <label className={labelStyle}>
          Other Income (₹)
          <input
            type="number"
            value={otherIncome}
            onChange={(e) => setOtherIncome(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 5000"
          />
        </label>

        <label className={labelStyle}>
          Total Expenses / Cost of Goods Sold (₹)
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 8000"
          />
        </label>

        <button
          onClick={calculateRevenue}
          className="bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
        >
          Calculate
        </button>

        {result && (
          <div className={`mt-6 text-center space-y-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <p><strong>Total Revenue:</strong> ₹{result.totalRevenue}</p>
            <p><strong>Total Expenses:</strong> ₹{result.totalExpenses}</p>
            <p className={`text-xl font-bold ${getProfitColor()}`}>
              Net Profit: ₹{result.netProfit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueCalculator;
