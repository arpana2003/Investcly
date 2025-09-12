import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BudgetPlanner = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [incomeList, setIncomeList] = useState([{ label: '', value: '' }]);
  const [expenseList, setExpenseList] = useState([{ label: '', value: '' }]);
  const [result, setResult] = useState(null);

  const handleChange = (list, setList, index, key, value) => {
    const updated = [...list];
    updated[index][key] = value;
    setList(updated);
  };

  const addField = (list, setList) => {
    setList([...list, { label: '', value: '' }]);
  };

  const calculateBudget = () => {
    const totalIncome = incomeList.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
    const totalExpense = expenseList.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
    const savings = totalIncome - totalExpense;

    setResult({
      income: totalIncome.toFixed(2),
      expenses: totalExpense.toFixed(2),
      savings: savings.toFixed(2),
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

  const labelStyle = `text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`;

  return (
    <div className={containerStyle}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-amber-600' : 'text-black'}`}>
        Budget Planner
      </h2>

      {/* Incomes */}
      <div className="mb-6">
        <h3 className={labelStyle}>Income Sources</h3>
        {incomeList.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Source (e.g. Salary)"
              value={item.label}
              onChange={(e) => handleChange(incomeList, setIncomeList, i, 'label', e.target.value)}
              className={inputStyle}
            />
            <input
              type="number"
              placeholder="Amount"
              value={item.value}
              onChange={(e) => handleChange(incomeList, setIncomeList, i, 'value', e.target.value)}
              className={inputStyle}
            />
          </div>
        ))}
        <button
          onClick={() => addField(incomeList, setIncomeList)}
          className="text-amber-600 underline mb-4"
        >
          + Add Income
        </button>
      </div>

      {/* Expenses */}
      <div className="mb-6">
        <h3 className={labelStyle}>Expenses</h3>
        {expenseList.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Type (e.g. Rent)"
              value={item.label}
              onChange={(e) => handleChange(expenseList, setExpenseList, i, 'label', e.target.value)}
              className={inputStyle}
            />
            <input
              type="number"
              placeholder="Amount"
              value={item.value}
              onChange={(e) => handleChange(expenseList, setExpenseList, i, 'value', e.target.value)}
              className={inputStyle}
            />
          </div>
        ))}
        <button
          onClick={() => addField(expenseList, setExpenseList)}
          className="text-amber-600 underline mb-4"
        >
          + Add Expense
        </button>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateBudget}
        className="w-full bg-amber-600 text-white py-2 rounded-md hover:opacity-90 transition-all"
      >
        Calculate Budget
      </button>

      {/* Results */}
      {result && (
        <div className={`mt-6 text-${isDarkMode ? 'white' : 'black'} text-center space-y-2`}>
          <p><strong>Total Income:</strong> ₹{result.income}</p>
          <p><strong>Total Expenses:</strong> ₹{result.expenses}</p>
          <p className={`text-xl font-bold ${result.savings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Savings: ₹{result.savings}
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;
