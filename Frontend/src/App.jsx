import { useState, useEffect } from 'react';
import './App.css';
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


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [searchQuery, setSearchQuery] = useState(""); 
const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <>
    <Navbar onSearch={setSearchQuery} />
      <Routes>
   
        <Route path="/" element={<Home  searchQuery={searchQuery} />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/calculators" element={<CalculatorSection />} />
<Route path="/forgot-password" element={<ForgotPassword setResetEmail={setResetEmail} />} />
<Route path="/verify-code" element={<VerifyCode email={resetEmail} />} />
<Route path="/reset-password" element={<ResetPassword email={resetEmail} />} />


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
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <SignUp />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
