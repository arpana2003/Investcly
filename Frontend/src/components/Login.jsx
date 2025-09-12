import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [approvalError, setApprovalError] = useState("");
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const API = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    setError("");
    setApprovalError("");

    try {
      const response = await axios.post(API, { email, password });
      const { token, user } = response.data;

      // if (!user.isAllowedToCreate) {
      //   setApprovalError("Your account has not been approved yet.");
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("user");
      //   return;
      // }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage);
      onLogin(user);
      console.log(localStorage);
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main
      className={`h-[80vh] flex items-center justify-center px-4 py-4`}
    >
      <section
        className={`max-w-md w-full rounded-3xl shadow-md border-2 p-10 pt-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-2" noValidate>
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
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full border rounded-xl pl-10 px-4 py-1 focus:outline-none focus:ring-2 transition ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-black"
                }`}
              />
            </div>
          </div>

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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full border rounded-xl pl-10 px-4 py-1 focus:outline-none focus:ring-2 transition ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-black"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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

          {error && <p className="text-sm text-red-600">{error}</p>}
          {approvalError && (
            <p className="text-sm text-red-600">{approvalError}</p>
          )}

          <button
            type="submit"
            className={`w-full rounded-xl py-2 font-semibold text-lg transition ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            Log In
          </button>

           <h1 className="font-bold text-center">or</h1>
                    <button
                      onClick={() =>
                        window.open("http://localhost:5000/auth/google", "_self")
                      }
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3  hover:bg-gray-100 transition"
                    >
                      <FcGoogle className="text-2xl" />
                      <span className="font-semibold text-gray-700">
                        Login with Google
                      </span>
                    </button>
        </form>

        <div className="text-sm mt-2 text-orange-600 hover:underline">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <p
          className={`mt-6 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Don&apos;t have an account?{" "}
          <Link to="/signup">
            <button
              type="button"
              className={`font-semibold hover:underline focus:outline-none ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Sign Up
            </button>
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
