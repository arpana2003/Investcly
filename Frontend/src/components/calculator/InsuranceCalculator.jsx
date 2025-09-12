import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const InsuranceCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [baseAmount, setBaseAmount] = useState('');
  const [age, setAge] = useState('');
  const [tenure, setTenure] = useState('');
  const [type, setType] = useState('life');
  const [premium, setPremium] = useState(null);
  const [total, setTotal] = useState(null);

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

  const inputStyle = `p-2 rounded-md border focus:outline-none ${
    isDarkMode
      ? 'bg-black text-white border-amber-600'
      : 'bg-white text-black border-black'
  }`;

  const labelStyle = isDarkMode ? 'text-white' : 'text-black';
  const containerStyle = `p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 ${
    isDarkMode ? 'bg-black' : 'bg-white'
  }`;

  return (
    <div className={containerStyle}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-amber-600' : 'text-black'}`}>
        Insurance Premium Calculator
      </h2>

      <div className="flex flex-col gap-4">
        <label className={labelStyle}>
          Base Amount (₹)
          <input
            type="number"
            value={baseAmount}
            onChange={(e) => setBaseAmount(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 100000"
          />
        </label>

        <label className={labelStyle}>
          Age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 25"
          />
        </label>

        <label className={labelStyle}>
          Tenure (Years)
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 5"
          />
        </label>

        <label className={labelStyle}>
          Type of Insurance
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputStyle}
          >
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="vehicle">Vehicle Insurance</option>
          </select>
        </label>

        <button
          onClick={calculatePremium}
          className="bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
        >
          Calculate Premium
        </button>

        {premium && (
          <div className={`mt-4 text-${isDarkMode ? 'white' : 'black'} space-y-2`}>
            <p><strong>Monthly Premium:</strong> ₹{premium}</p>
            <p><strong>Total over {tenure} years:</strong> ₹{total}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceCalculator;
