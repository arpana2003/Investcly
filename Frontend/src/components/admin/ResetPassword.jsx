import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword({ email }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();

  const API_BASE = `${import.meta.env.VITE_BACKEND_URL}`;

  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE}/auth/admin/reset-password`, { email, password });
      setMsg("Password updated successfully.");
      setSuccess(true);
    } catch {
      setMsg("Failed to update.");
      setSuccess(false);
    }
  };

  return (
    <div className={`p-4  mx-auto min-h-screen flex flex-col items-center justify-center ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2 w-full rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <button
        onClick={handleReset}
        className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded w-full mb-3"
      >
        Update Password
      </button>
      <p className={`text-sm ${success ? "text-green-500" : "text-red-500"}`}>{msg}</p>

      {success && (
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm underline text-blue-500 hover:text-blue-700"
        >
          Back to Home
        </button>
      )}
    </div>
  );
}
