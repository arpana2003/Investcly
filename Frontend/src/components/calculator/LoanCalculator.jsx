import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const LoanCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateLoan = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100 / 12;
    const N = parseFloat(tenure) * 12;

    if (!P || !R || !N) return;

    const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPay = EMI * N;
    const interest = totalPay - P;

    setEmi(EMI.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
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
        Loan Calculator
      </h2>
      <div className="flex flex-col gap-4">
        <label className={labelStyle}>
          Principal Amount (₹)
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 500000"
          />
        </label>
        <label className={labelStyle}>
          Annual Interest Rate (%)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 8.5"
          />
        </label>
        <label className={labelStyle}>
          Loan Tenure (Years)
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 5"
          />
        </label>
        <button
          onClick={calculateLoan}
          className="bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
        >
          Calculate
        </button>

        {emi && (
          <div className={`mt-4 text-${isDarkMode ? 'white' : 'black'} space-y-2`}>
            <p><strong>Monthly EMI:</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
            <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
