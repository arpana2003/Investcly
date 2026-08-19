import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/admin/Dashboard";
import Home from "./components/Home";
import AdminForm from "./components/admin/AdminForm";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import BlogDetail from "./components/BlogDetail";
import CalculatorSection from "./components/CalculatorSection";
import ForgotPassword from "./components/admin/ForgotPassword";
import VerifyCode from "./components/admin/VerifyCode";
import ResetPassword from "./components/admin/ResetPassword";
import About from "./components/About";
import Contact from "./components/home/Contact";
import Privacy from "./components/Privacy";
import TermsOfService from "./components/TermsOfService";
import LoanCalculator from "./components/calculator/LoanCalculator";
import InvestmentCalculator from "./components/calculator/InvestmentCalculator";
import BudgetPlanner from "./components/calculator/BudgetPlanner";
import CreditScoreEstimator from "./components/calculator/CreditScoreEstimator";
import InsuranceCalculator from "./components/calculator/InsuranceCalculator";
import NetWorthCalculator from "./components/calculator/NetWorthCalculator";
import RevenueCalculator from "./components/calculator/RevenueCalculator";
import NewsLetter from "./components/home/NewsLetter";
import Commodities from "./components/Commodities";
import FinanceAcademy from "./components/home/FinanceAcademy.jsx";
import HomeLoanCalculator from "./components/calculator/HomeLoanCalculator.jsx";
import CarLoanCalculator from "./components/calculator/CarLoanCalculator.jsx";
import FixedDepositCalculator from "./components/calculator/FixedDepositCalculator.jsx";
import AuthSuccess from "./components/AuthSuccess.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [articles, setArticles] = useState([]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

    const API = `${import.meta.env.VITE_BACKEND_URL}/admin/upload`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

  setIsLoggedIn(!!token);

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

    fetch(API)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
const [user, setUser] = useState(null);
console.log("APP",user);

  return (
    <>
      <div className="max-w-7xl mx-auto px-10 sm:px-12 lg:px-16 max-sm:px-0">
        <Navbar scrollToSection={scrollToSection} user={user} onSearch={setSearchQuery} articles={articles} />
        <Routes>
          <Route
            path="/"
            element={<Home user={user} setUser={setUser} searchQuery={searchQuery} articles={articles} />}
          />
          <Route path="/newsletter" element={<NewsLetter />} />
          <Route path="/commodities" element={<Commodities />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/calculators" element={<CalculatorSection />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route
            path="/home-loan-calculator"
            element={<HomeLoanCalculator />}
          />
          <Route path="/car-loan-calculator" element={<CarLoanCalculator />} />
          <Route
            path="/fixed-deposit-calculator"
            element={<FixedDepositCalculator />}
          />
          <Route
            path="/investment-calculator"
            element={<InvestmentCalculator />}
          />
          <Route path="/revenue-calculator" element={<RevenueCalculator />} />
          <Route path="/budget-calculator" element={<BudgetPlanner />} />
          <Route path="/finance-academy" element={<FinanceAcademy />} />
          <Route path="/credit-calculator" element={<CreditScoreEstimator />} />
          <Route
            path="/insurance-calculator"
            element={<InsuranceCalculator />}
          />
          <Route path="/networth-calculator" element={<NetWorthCalculator />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword setResetEmail={setResetEmail} />}
          />
          <Route
            path="/verify-code"
            element={<VerifyCode email={resetEmail} />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword email={resetEmail} />}
          />

          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/form"
            element={
              isLoggedIn ? (
                <AdminForm onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* <Route path="/auth-success" element={<AuthSuccess onLogin={ setUser}/>} /> */}
          <Route
  path="/auth-success"
  element={
    <AuthSuccess
      onLogin={(user) => {
        setUser(user);
        setIsLoggedIn(true);
      }}
    />
  }
/>

          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <SignUp />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
        </Routes>
        <Footer scrollToSection={scrollToSection} />
      </div>
    </>
  );
}

export default App;
