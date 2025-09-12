import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CreditScoreEstimator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Default values
  const [utilization, setUtilization] = useState("30");
  const [paymentHistory, setPaymentHistory] = useState("90");
  const [creditAge, setCreditAge] = useState("5");
  const [accounts, setAccounts] = useState("6");
  const [inquiries, setInquiries] = useState("2");
  const [score, setScore] = useState(null);

  // Score calculation
  const calculateScore = () => {
    let baseScore = 300;
    const utilizationFactor = Math.max(0, 100 - utilization) * 0.25;
    const paymentFactor = (paymentHistory / 100) * 225;
    const ageFactor = Math.min(creditAge, 10) * 10;
    const accountFactor = Math.min(accounts, 10) * 5;
    const inquiryFactor = Math.max(0, 5 - inquiries) * 10;

    const total =
      baseScore +
      utilizationFactor +
      paymentFactor +
      ageFactor +
      accountFactor +
      inquiryFactor;

    const finalScore = Math.min(900, Math.round(total));
    setScore(finalScore);
  };

  // Auto-update when inputs change
  useEffect(() => {
    calculateScore();
  }, [utilization, paymentHistory, creditAge, accounts, inquiries]);

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

  const getScoreLabel = () => {
    if (!score) return "";
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    if (score >= 600) return "Poor";
    return "Very Poor";
  };

  const getScoreExplanation = () => {
  if (!score) return "";
  if (score >= 750)
    return "You have an excellent credit score. Banks will consider you highly trustworthy for loans and credit cards.";
  if (score >= 700)
    return "You have a good credit score. You are likely to get approvals at competitive interest rates.";
  if (score >= 650)
    return "Your score is fair. Some lenders may approve, but interest rates could be higher.";
  if (score >= 600)
    return "Your score is poor. Loan approvals will be difficult, and terms may not be favorable.";
  return "Your score is very poor. Focus on improving payment history and reducing utilization before applying for new credit.";
};


  return (
    <div className="px-4 py-6 bg-gray-100">
      <div className="w-full border-2 border-gray-100 bg-white rounded-sm p-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-amber-600" : "text-black"
          }`}
        >
          Credit Score Estimator
        </h2>
        <p>
          A budget planner helps you track income and expenses to understand
          your savings better.
        </p>
      </div>
    <div className="flex max-sm:flex-col">
      {/* Left Section - Sliders */}
      <div className={containerStyle}>
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-amber-600" : "text-black"
          }`}
        >
          Credit Score Estimator
        </h2>

        <div className="flex flex-col space-y-5">
          {/* Utilization */}
          <div>
            <label className={`flex justify-between ${labelStyle}`}>
              Credit Utilization (%):
              <span className="font-semibold text-sm underline">
                {utilization}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={utilization}
              onChange={(e) => setUtilization(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Payment History */}
          <div>
            <label className={`flex justify-between ${labelStyle}`}>
              Payment History (%):
              <span className="font-semibold text-sm underline">
                {paymentHistory}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={paymentHistory}
              onChange={(e) => setPaymentHistory(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Credit Age */}
          <div>
            <label className={`flex justify-between ${labelStyle}`}>
              Credit Age (Years):
              <span className="font-semibold text-sm underline">
                {creditAge}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={creditAge}
              onChange={(e) => setCreditAge(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Accounts */}
          <div>
            <label className={`flex justify-between ${labelStyle}`}>
              Total Credit Accounts:
              <span className="font-semibold text-sm underline">
                {accounts}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={accounts}
              onChange={(e) => setAccounts(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>

          {/* Inquiries */}
          <div>
            <label className={`flex justify-between ${labelStyle}`}>
              Hard Inquiries (12m):
              <span className="font-semibold text-sm underline">
                {inquiries}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={inquiries}
              onChange={(e) => setInquiries(e.target.value)}
              className={`${inputStyle} w-full`}
            />
          </div>
        </div>
      </div>

      {/* Right Section - Results */}
      <div className={`p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 bg-orange-400 text-center space-y-6`}>
        {score && (
          <>
            <h1 className={`text-5xl font-bold mb-4 text-center text-white`}>
              {score}
            </h1>
            <p className="text-xl font-medium">Status: {getScoreLabel()}</p>
            <hr/>
            <p className="text-sm font-medium tracking-wider">Status:<br/> {getScoreExplanation()}</p>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default CreditScoreEstimator;
