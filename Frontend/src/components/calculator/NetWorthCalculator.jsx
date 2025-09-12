import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const NetWorthCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [assets, setAssets] = useState([{ label: '', value: '' }]);
  const [liabilities, setLiabilities] = useState([{ label: '', value: '' }]);
  const [netWorth, setNetWorth] = useState(null);

  const handleChange = (list, setList, index, key, val) => {
    const updated = [...list];
    updated[index][key] = val;
    setList(updated);
  };

  const addField = (list, setList) => {
    setList([...list, { label: '', value: '' }]);
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

  const containerStyle = `p-6 rounded-xl shadow-xl max-w-2xl w-full mx-auto mt-10 ${
    isDarkMode ? 'bg-black' : 'bg-white'
  }`;

  const inputStyle = `p-2 rounded-md border w-full focus:outline-none ${
    isDarkMode
      ? 'bg-black text-white border-amber-600'
      : 'bg-white text-black border-black'
  }`;

  const sectionTitle = `text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`;

  return (
    <div className={containerStyle}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-amber-600' : 'text-black'}`}>
        Net Worth Calculator
      </h2>

      {/* Assets */}
      <div className="mb-6">
        <h3 className={sectionTitle}>Assets</h3>
        {assets.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Label (e.g. Bank)"
              value={item.label}
              onChange={(e) => handleChange(assets, setAssets, i, 'label', e.target.value)}
              className={inputStyle}
            />
            <input
              type="number"
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleChange(assets, setAssets, i, 'value', e.target.value)}
              className={inputStyle}
            />
          </div>
        ))}
        <button
          onClick={() => addField(assets, setAssets)}
          className="text-amber-600 underline mb-4"
        >
          + Add Asset
        </button>
      </div>

      {/* Liabilities */}
      <div className="mb-6">
        <h3 className={sectionTitle}>Liabilities</h3>
        {liabilities.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Label (e.g. Loan)"
              value={item.label}
              onChange={(e) => handleChange(liabilities, setLiabilities, i, 'label', e.target.value)}
              className={inputStyle}
            />
            <input
              type="number"
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleChange(liabilities, setLiabilities, i, 'value', e.target.value)}
              className={inputStyle}
            />
          </div>
        ))}
        <button
          onClick={() => addField(liabilities, setLiabilities)}
          className="text-amber-600 underline mb-4"
        >
          + Add Liability
        </button>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateNetWorth}
        className="w-full bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
      >
        Calculate Net Worth
      </button>

      {/* Results */}
      {netWorth && (
        <div className={`mt-6 text-${isDarkMode ? 'white' : 'black'} text-center space-y-2`}>
          <p><strong>Total Assets:</strong> ₹{netWorth.assets}</p>
          <p><strong>Total Liabilities:</strong> ₹{netWorth.liabilities}</p>
          <p className={`text-xl font-bold ${netWorth.net >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Net Worth: ₹{netWorth.net}
          </p>
        </div>
      )}
    </div>
  );
};

export default NetWorthCalculator;
