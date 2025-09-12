import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";


function SignUp({ onSignUp}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const API =
  process.env.NODE_ENV === "production"
    ? "https://dynamicnewsbackend.vercel.app/auth/signup"
    : "http://localhost:5000/auth/signup";

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const response = await axios.post(API, {
        username: username,
        email: email,
        password: password,
      });

      // Optionally, store the token or user info upon successful signup
      // localStorage.setItem('token', response.data.token);
      // localStorage.setItem('user', JSON.stringify(response.data.user));

      // Call the onSignUp function to update the parent component's state
      // onSignUp(response.data.user);

      // Redirect to the login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className={`py-10 min-h-screen flex items-center justify-center px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
  <section className={`max-w-md w-full rounded-3xl shadow-md p-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
    <h1 className="text-4xl font-extrabold mb-8">Sign Up</h1>
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Username */}
      <div>
        <label htmlFor="username" className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </div>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className={`w-full border rounded-xl pl-10 px-4 py-3 focus:outline-none focus:ring-2 transition
              ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-black'}`}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={`w-full border rounded-xl pl-10 px-4 py-3 focus:outline-none focus:ring-2 transition
              ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-black'}`}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={`w-full border rounded-xl pl-10 px-4 py-3 focus:outline-none focus:ring-2 transition
              ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-black'}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
          >
            {showPassword ? <FaEyeSlash className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} /> : <FaEye className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className={`block mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className={`w-full border rounded-xl pl-10 px-4 py-3 focus:outline-none focus:ring-2 transition
              ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-white' : 'bg-white border-gray-300 text-gray-900 focus:ring-black'}`}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
          >
            {showConfirmPassword ? <FaEyeSlash className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} /> : <FaEye className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className={`w-full rounded-xl py-3 font-semibold text-lg transition
          ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-900'}`}
      >
        Sign Up
      </button>
    </form>

    
    <div className="text-sm mt-2 text-orange-600 hover:underline">
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
    <p className={`mt-6 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Already have an account?{' '}
      <Link to="/login">
        <button
          type="button"
          className={`${isDarkMode ? 'text-white' : 'text-black'} font-semibold hover:underline focus:outline-none`}
        >
          Log In
        </button>
      </Link>
    </p>
  </section>
</main>

  );
}

export default SignUp;
