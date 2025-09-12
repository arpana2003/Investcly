import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const InvestmentCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculateInvestment = () => {
    const P = parseFloat(initial);
    const PMT = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12; // monthly interest
    const n = parseFloat(years) * 12; // total months

    if (!P || !PMT || !r || !n) return;

    // Compound interest formula with regular contributions
    const futureValue =
      P * Math.pow(1 + r, n) +
      PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const totalInvested = P + PMT * n;
    const gain = futureValue - totalInvested;

    setResult({
      futureValue: futureValue.toFixed(2),
      invested: totalInvested.toFixed(2),
      gain: gain.toFixed(2),
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

  return (
    <div className={containerStyle}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-amber-600' : 'text-black'}`}>
        Investment Calculator
      </h2>

      <div className="flex flex-col gap-4">
        <label className={labelStyle}>
          Initial Investment (₹)
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 50000"
          />
        </label>

        <label className={labelStyle}>
          Monthly Contribution (₹)
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 2000"
          />
        </label>

        <label className={labelStyle}>
          Annual Interest Rate (%)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 12"
          />
        </label>

        <label className={labelStyle}>
          Investment Duration (Years)
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 10"
          />
        </label>

        <button
          onClick={calculateInvestment}
          className="bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
        >
          Calculate
        </button>

        {result && (
          <div className={`mt-6 text-${isDarkMode ? 'white' : 'black'} text-center space-y-2`}>
            <p><strong>Total Future Value:</strong> ₹{result.futureValue}</p>
            <p><strong>Total Invested:</strong> ₹{result.invested}</p>
            <p className="text-green-500 font-bold text-lg">
              Estimated Gain: ₹{result.gain}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentCalculator;
