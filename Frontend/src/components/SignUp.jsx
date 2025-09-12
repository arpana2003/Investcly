import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

<button
  onClick={() => window.open("http://localhost:5000/auth/google", "_self")}
  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 mt-4 hover:bg-gray-100 transition"
>
  <FcGoogle className="text-2xl" />
  <span className="font-semibold text-gray-700">Sign Up with Google</span>
</button>;

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

const API = `${import.meta.env.VITE_BACKEND_URL}/auth/signup`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      const response = await axios.post(API, {
        username: username,
        email: email,
        password: password,
      });
      navigate("/login");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main
      className={`py-8 h-[80vh] flex items-center justify-center px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <section
        className={`max-w-md w-full rounded-3xl shadow-md p-10 py-2 border-2 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="" noValidate>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className={`block mb-2 font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full border rounded-xl pl-10 px-4 py-1 focus:outline-none focus:ring-2 transition
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-black"
              }`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`block mb-2 font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full border rounded-xl pl-10 px-4 py-1 focus:outline-none focus:ring-2 transition
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-black"
              }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className={`block mb-2 font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full border rounded-xl pl-10 px-4 py-1 focus:outline-none focus:ring-2 transition
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-black"
              }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  />
                ) : (
                  <FaEye
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block mb-2 font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full border rounded-xl pl-10 px-4 py-1 focus:outline-none focus:ring-2 transition
              ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-black"
              }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  />
                ) : (
                  <FaEye
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className={`w-full rounded-xl py-2 mt-2 font-semibold text-sm transition
          ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-900"
          }`}
          >
            Sign Up
          </button>
          <h1 className="font-bold text-center">or</h1>
          <button
            onClick={() =>
              window.open("http://localhost:5000/auth/google", "_self")
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2  hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-sm" />
            <span className="font-semibold text-gray-700 text-sm">
              Sign Up with Google
            </span>
          </button>
        </form>

        <div className="text-sm mt-2 text-orange-600 hover:underline">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <p
          className={`mt-2 text-center text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link to="/login">
            <button
              type="button"
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } font-semibold hover:underline focus:outline-none`}
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
