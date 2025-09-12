import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword({ setResetEmail }) {

    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const API_BASE = `${import.meta.env.VITE_BACKEND_URL}`;

    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!email || !email.includes("@")) return setMsg("Please enter a valid email address.");
        try {
            setLoading(true);
            const res = await axios.post(`${API_BASE}/auth/admin/send-code`, { email });
            setResetEmail(email);
            setMsg(res.data.message);
            navigate('/verify-code', { state: { email } });
        } catch (err) {
            console.error(err);
            setMsg("Failed to send code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`p-4 mx-auto min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} flex flex-col items-center justify-center`}>
            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-3 py-2 w-full rounded mb-2"
            />
            <button
                onClick={handleSend}
                disabled={loading}
                className={`px-4 py-2 rounded transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
                {loading ? "Sending..." : "Send Code"}
            </button>

            <p className="mt-3 text-sm">{msg}</p>
        </div>
    );
}
