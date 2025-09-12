import React, { useState } from "react";
import { useSelector } from "react-redux";

const BudgetPlanner = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // ✅ Correct: Use arrays with objects (so we can map)
  const [income, setIncome] = useState([{ label: "Income Source", value: "5000" }]);
  const [expenses, setExpenses] = useState([{ label: "Expense Source", value: "2000" }]);
  const [result, setResult] = useState({ income: 5000, expenses: 2000, savings: 3000 });

  const handleChange = (list, setList, index, key, value) => {
    const updated = [...list];
    updated[index][key] = value;
    setList(updated);
    calculateBudget(
      list === income ? updated : income,
      list === expenses ? updated : expenses
    );
  };

  const addField = (list, setList) => {
    setList([...list, { label: "", value: "0" }]);
  };

  const calculateBudget = (incomes = income, expenseList = expenses) => {
    const totalIncome = incomes.reduce(
      (sum, item) => sum + parseFloat(item.value || 0),
      0
    );
    const totalExpense = expenseList.reduce(
      (sum, item) => sum + parseFloat(item.value || 0),
      0
    );
    const savings = totalIncome - totalExpense;

    setResult({
      income: totalIncome.toFixed(2),
      expenses: totalExpense.toFixed(2),
      savings: savings.toFixed(2),
    });
  };

  const containerStyle = `p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 ${
    isDarkMode ? "bg-black" : "bg-white"
  }`;

  const inputStyle = `p-2 rounded-md border focus:outline-none accent-orange-400 ${
    isDarkMode
      ? "bg-black text-white border-amber-600"
      : "bg-white text-black border-black"
  }`;

  const labelStyle = isDarkMode
    ? "text-white font-bold"
    : "text-black font-bold";

  return (
    <div className="py-6 px-4 bg-gray-100">
      {/* Header */}
      <div className="w-full border-2 border-gray-100 bg-white rounded-sm p-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-amber-600" : "text-black"
          }`}
        >
          Budget Planner
        </h2>
        <p>
          A budget planner helps you track income and expenses to understand
          your savings better.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Inputs */}
        <div className={containerStyle}>
          {/* Incomes */}
          <div className="mb-6">
            <div className="flex justify-between">
              <h3 className={labelStyle}>Income</h3>
              <button
                onClick={() => addField(income, setIncome)}
                className="text-amber-600 underline"
              >
                + Add Income
              </button>
            </div>
            {income.map((item, i) => (
              <div key={i} className="mb-4">
                <label className="flex justify-between mt-2">
                  <span>{item.label || "Source"}</span>
                  <span className="font-semibold">₹{item.value}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={item.value}
                  onChange={(e) =>
                    handleChange(income, setIncome, i, "value", e.target.value)
                  }
                  className="w-full accent-amber-600"
                />
              </div>
            ))}
          </div>

          {/* Expenses */}
          <div className="mb-6">
            <div className="flex justify-between">
              <h3 className={labelStyle}>Expenses</h3>
              <button
                onClick={() => addField(expenses, setExpenses)}
                className="text-amber-600 underline"
              >
                + Add Expense
              </button>
            </div>
            {expenses.map((item, i) => (
              <div key={i} className="mb-4">
                <label className="flex justify-between mt-2">
                  <span>{item.label || "Type"}</span>
                  <span className="font-semibold">₹{item.value}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={item.value}
                  onChange={(e) =>
                    handleChange(expenses, setExpenses, i, "value", e.target.value)
                  }
                  className="w-full accent-amber-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Results */}
        <div className="p-6 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-10 bg-orange-400 text-white">
          <h1 className="text-3xl font-bold text-center mb-6">
            Budget Summary
          </h1>
          <hr />
          <div className="space-y-8 pt-11 grid grid-cols-2 px-10">
            <p>
              <h2 className="text-lg font-bold">₹ {result.income}</h2>
              <span className="text-sm">Total Income</span>
            </p>
            <p>
              <h2 className="text-lg font-bold">₹ {result.expenses}</h2>
              <span className="text-sm">Total Expenses</span>
            </p>
            <p>
              <h2 className="text-lg font-bold">₹ {result.savings}</h2>
              <span className="text-sm">Saving</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
