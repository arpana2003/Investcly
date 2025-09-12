import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RevenueCalculator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [unitsSold, setUnitsSold] = useState(100);
  const [pricePerUnit, setPricePerUnit] = useState(100);
  const [otherIncome, setOtherIncome] = useState(500);
  const [expenses, setExpenses] = useState(2000);
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

  useEffect(() => {
    calculateRevenue();
  }, [unitsSold, pricePerUnit, otherIncome, expenses]);

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

  const getProfitStatus = () => {
    if (!result) return "";

    const profit = parseFloat(result.netProfit);

    if (profit > 100000)
      return "Fantastic! Your business is generating a very high profit. Keep scaling and optimizing your operations for continued growth. 🎉💰";
    if (profit > 50000)
      return "Great! Your business is doing really well with a strong profit margin. Continue focusing on revenue streams and cost management. 🚀";
    if (profit > 0)
      return "Good! Your business is profitable. Even though the profit is moderate, it's a positive sign of stability. Keep monitoring expenses and sales. ✅";
    if (profit === 0)
      return "You are breaking even. Revenues and expenses are balanced, but consider strategies to increase sales or reduce costs to move into profit. ⚖️";
    if (profit > -50000)
      return "Caution! Your business has a minor loss. It's manageable but review your cost structure and sales strategies to prevent further decline. ⚠️";
    if (profit > -100000)
      return "Warning! Your business is experiencing significant losses. Immediate corrective measures are required to optimize operations and reduce expenses. ❌";

    return "Critical! Your business is running at a severe loss. Consider re-evaluating your business model, cutting unnecessary costs, and seeking expert advice to recover. 🚨";
  };

  return (
    <div className="px-4 py-6 bg-gray-100">
      <div className="w-full bg-white rounded-sm p-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-amber-600" : "text-black"
          }`}
        >
          Revenue & Profit Calculator
        </h2>
        <p>
          A Revenue & Profit Calculator is a business tool designed to help you
          understand the financial health of your business. By entering your
          sales volume, price per unit, additional income, and expenses, you can
          instantly see your total revenue, total expenses, and net profit. This
          tool helps you make informed decisions, plan budgets, optimize costs,
          and identify opportunities for growth, giving you a clear picture of
          how profitable your business truly is.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Sliders */}
        <div className={containerStyle}>
          <h2
            className={`text-2xl font-bold mb-6 ${
              isDarkMode ? "text-amber-600" : "text-black"
            }`}
          >
            Revenue & Profit Calculator
          </h2>

          <div className="flex flex-col space-y-5">
            {/* Units Sold */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Units Sold:
                <span className="font-semibold text-sm underline">
                  {unitsSold}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="1"
                value={unitsSold}
                onChange={(e) => setUnitsSold(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>

            {/* Price per Unit */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Price per Unit (₹):
                <span className="font-semibold text-sm underline">
                  {pricePerUnit}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="10"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>

            {/* Other Income */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Other Income (₹):
                <span className="font-semibold text-sm underline">
                  {otherIncome}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="500"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>

            {/* Expenses */}
            <div>
              <label className={`flex justify-between ${labelStyle}`}>
                Total Expenses (₹):
                <span className="font-semibold text-sm underline">
                  {expenses}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="500"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className={`${inputStyle} w-full`}
              />
            </div>
          </div>
        </div>

        {/* Right Section - Results */}
        <div className="p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 bg-orange-400 text-white max-sm:px-0">
          {result && (
            <>
              <div className="h-[12vh] flex justify-center items-center">
                <h1>
                  <strong className="text-3xl">Net Profit:</strong>
                  <span className="ml-4 font-semibold">
                    ₹ {result.netProfit}
                  </span>
                </h1>
              </div>

              <hr />

              <div className="space-y-8 pt-11 grid grid-cols-2 px-10">
                <p>
                  <h2 className="text-lg font-bold">₹ {result.totalRevenue}</h2>
                  <span className="text-sm">Total Revenue</span>
                </p>
                <p>
                  <h2 className="text-lg font-bold">
                    ₹ {result.totalExpenses}
                  </h2>
                  <span className="text-sm">Total Expenses</span>
                </p>
                <p className="col-span-2 text-center">
                  <h2 className="text-lg font-bold">Bussiness Status</h2>
                  <span className="text-sm">{getProfitStatus()}</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueCalculator;
