import React, { useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react"; // 💡 make sure `lucide-react` is installed

// Lazy load calculators
const LoanCalculator = lazy(() => import("./calculator/LoanCalculator"));
const InsuranceCalculator = lazy(() =>
  import("./calculator/InsuranceCalculator")
);
const NetWorthCalculator = lazy(() =>
  import("./calculator/NetWorthCalculator")
);
const BudgetPlanner = lazy(() => import("./calculator/BudgetPlanner"));
const InvestmentCalculator = lazy(() =>
  import("./calculator/InvestmentCalculator")
);
const CreditScoreEstimator = lazy(() =>
  import("./calculator/CreditScoreEstimator")
);
const RevenueCalculator = lazy(() => import("./calculator/RevenueCalculator"));

const calculators = [
  { id: "loan", label: "Loan" },
  { id: "insurance", label: "Insurance" },
  { id: "networth", label: "Net Worth" },
  { id: "budget", label: "Budget Planner" },
  { id: "investment", label: "Investment" },
  { id: "credit", label: "Credit Score" },
  { id: "revenue", label: "Revenue" },
];

// Loader UI component
const LoaderBox = () => (
  <div className="flex items-center justify-center pt-40 w-full">
    <Loader className="animate-spin text-amber-600" size={36} />
  </div>
);

const CalculatorSection = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [activeCalc, setActiveCalc] = useState("loan");

  const getButtonStyle = (id) =>
    `w-full text-left px-4 py-2 rounded-md font-medium transition-all ${
      activeCalc === id
        ? "bg-amber-600 text-white"
        : isDarkMode
        ? "text-white hover:bg-amber-600/20"
        : "text-black hover:bg-amber-600/10"
    }`;

  const containerStyle = `flex flex-col lg:flex-row gap-6 p-6 rounded-xl shadow-xl w-full ${
    isDarkMode ? "bg-black" : "bg-white"
  }`;

  const renderActiveCalculator = () => {
    switch (activeCalc) {
      case "loan":
        return <LoanCalculator />;
      case "insurance":
        return <InsuranceCalculator />;
      case "networth":
        return <NetWorthCalculator />;
      case "budget":
        return <BudgetPlanner />;
      case "investment":
        return <InvestmentCalculator />;
      case "credit":
        return <CreditScoreEstimator />;
      case "revenue":
        return <RevenueCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className={`${
          isDarkMode ? "bg-[#111827]" : "bg-gray-100"
        } px-4 sm:px-6 md:px-10 py-10`}
      >
        {/* <div>
          <h2
            className={`text-3xl font-bold mb-6 text-center ${
              isDarkMode ? "text-amber-600" : "text-black"
            }`}
          >
            Finance Calculators
          </h2>
        </div> */}

        {/* <div className={containerStyle}> */}
          {/* Sidebar Nav */}
          {/* <div className="lg:w-1/4 w-full">
            <div className="space-y-2">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalc(calc.id)}
                  className={getButtonStyle(calc.id)}
                >
                  {calc.label} Calculator
                </button>
              ))}
            </div>
          </div> */}

          {/* Calculator Content */}
          <div className="flex-1">
            <Suspense fallback={<LoaderBox />}>
              {renderActiveCalculator()}
            </Suspense>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CalculatorSection;
