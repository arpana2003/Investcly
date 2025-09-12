import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreditScoreEstimator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [utilization, setUtilization] = useState('');
  const [paymentHistory, setPaymentHistory] = useState('');
  const [creditAge, setCreditAge] = useState('');
  const [accounts, setAccounts] = useState('');
  const [inquiries, setInquiries] = useState('');
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    let baseScore = 300;

    // Weights based on common credit models
    const utilizationFactor = Math.max(0, 100 - utilization) * 0.25;
    const paymentFactor = (paymentHistory / 100) * 225;
    const ageFactor = Math.min(creditAge, 10) * 10;
    const accountFactor = Math.min(accounts, 10) * 5;
    const inquiryFactor = Math.max(0, 5 - inquiries) * 10;

    const total = baseScore + utilizationFactor + paymentFactor + ageFactor + accountFactor + inquiryFactor;

    const finalScore = Math.min(900, Math.round(total));
    setScore(finalScore);
  };

  const getScoreLabel = () => {
    if (!score) return '';
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
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

  const getScoreColor = () => {
    if (score >= 750) return 'text-green-500';
    if (score >= 700) return 'text-lime-400';
    if (score >= 650) return 'text-yellow-400';
    if (score >= 600) return 'text-orange-400';
    return 'text-red-500';
  };

  return (
    <div className={containerStyle}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-amber-600' : 'text-black'}`}>
        CIBIL / Credit Score Estimator
      </h2>

      <div className="flex flex-col gap-4">
        <label className={labelStyle}>
          Credit Utilization (%) — lower is better
          <input
            type="number"
            value={utilization}
            onChange={(e) => setUtilization(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 30"
          />
        </label>

        <label className={labelStyle}>
          Payment History (% on-time payments)
          <input
            type="number"
            value={paymentHistory}
            onChange={(e) => setPaymentHistory(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 95"
          />
        </label>

        <label className={labelStyle}>
          Credit Age (Years)
          <input
            type="number"
            value={creditAge}
            onChange={(e) => setCreditAge(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 4"
          />
        </label>

        <label className={labelStyle}>
          Total Credit Accounts
          <input
            type="number"
            value={accounts}
            onChange={(e) => setAccounts(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 6"
          />
        </label>

        <label className={labelStyle}>
          Hard Inquiries (Last 12 months)
          <input
            type="number"
            value={inquiries}
            onChange={(e) => setInquiries(e.target.value)}
            className={inputStyle}
            placeholder="e.g. 2"
          />
        </label>

        <button
          onClick={calculateScore}
          className="bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
        >
          Estimate Score
        </button>

        {score && (
          <div className={`mt-6 text-center space-y-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <p className={`text-4xl font-bold ${getScoreColor()}`}>
              Estimated Score: {score}
            </p>
            <p className="text-lg font-medium">Status: {getScoreLabel()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditScoreEstimator;
