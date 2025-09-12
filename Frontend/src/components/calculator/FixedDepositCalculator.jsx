import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FixedDepositCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("6.5");
  const [tenure, setTenure] = useState("5"); // in years
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const N = parseFloat(tenure);

    if (!P || !R || !N) return;

    const M = P * Math.pow(1 + R, N);
    setMaturityAmount(M.toFixed(2));
    setTotalInterest((M - P).toFixed(2));
  };

  useEffect(() => calculateFD(), [principal, rate, tenure]);

  const inputStyle = `p-2 rounded-md border focus:outline-none accent-orange-400  ${
    isDarkMode ? "bg-black text-white border-amber-600" : "bg-white text-black border-black"
  }`;
  const labelStyle = isDarkMode ? "text-white font-bold" : "text-black font-bold";
  const containerStyle = `p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 ${
    isDarkMode ? "bg-black" : "bg-white"
  }`;

  const getFutureMonth = (yearsToAdd) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + Number(yearsToAdd));
    const options = { month: "long", year: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="py-6 px-4 bg-gray-100">
      <div className="w-full border-2 border-gray-100 bg-white rounded-sm p-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-amber-600" : "text-black"}`}>
          Fixed Deposit Calculator
        </h2>
        <p>
          Calculate your maturity amount for a fixed deposit with annual compounding.
          Adjust the principal, interest rate, and tenure to see your returns.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className={containerStyle}>
          <div className="flex flex-col space-y-5 py-5">
            <div onChange={calculateFD}>
              <label className={`flex justify-between ${labelStyle}`}>
                Principal Amount (₹): <span className="font-semibold text-sm underline">{principal}</span>
              </label>
              <input type="range" min="10000" max="5000000" step="10000" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={`${inputStyle} w-full`} />
            </div>

            <div onChange={calculateFD}>
              <label className={`flex justify-between ${labelStyle}`}>
                Annual Interest Rate (%): <span className="font-semibold text-sm underline">{rate}</span>
              </label>
              <input type="range" min="1" max="15" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className={`${inputStyle} w-full`} />
            </div>

            <div onChange={calculateFD}>
              <label className={`flex justify-between ${labelStyle}`}>
                Tenure (Years): <span className="font-semibold text-sm underline">{tenure}</span>
              </label>
              <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(e.target.value)} className={`${inputStyle} w-full`} />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 bg-orange-400 text-white">
          <div className=" h-[12vh] flex justify-center items-center">
            <h1>
              <strong className="text-3xl">Total Interest:</strong>
              <span className="ml-4 font-semibold">₹{totalInterest}</span>
            </h1>
          </div>
          <hr />
          <div className="space-y-8 pt-11 grid grid-cols-2 px-10">
            <p>
              <h2 className="text-lg font-bold">₹ {maturityAmount}</h2>
              <span className="text-sm">Maturity Amount</span>
            </p>
            <p>
              <h2 className="text-lg font-bold">{getFutureMonth(tenure)}</h2>
              <span className="text-sm">Maturity By</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDepositCalculator;
