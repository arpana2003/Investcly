import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const API_BASE = `${import.meta.env.VITE_BACKEND_URL}`;

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/admin/verify-code`, {
        email,
        code,
      });
      setMsg("Code verified. You can now reset password.");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setMsg("Invalid code.");
    }
  };

  return (
    <div className={`p-4 mx-auto min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} flex flex-col items-center justify-center`}>
      <h2 className="text-xl mb-2">Verify Code</h2>
      <input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border px-3 py-2 w-full rounded mb-2"
      />
      <button onClick={handleVerify} className="bg-green-600 text-white px-4 py-2 rounded">
        Verify
      </button>
      <p className="mt-3 text-sm">{msg}</p>
    </div>
  );
}
