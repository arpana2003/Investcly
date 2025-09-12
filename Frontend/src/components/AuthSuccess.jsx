import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthSuccess({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", token);

      try {
        // Fetch user data from backend
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success && res.data.user) {
          // Save user in localStorage
          localStorage.setItem("user", JSON.stringify(res.data.user));

          // Call your Login component callback
          onLogin(res.data.user);

          // Redirect to home
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error.response || error.message);
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate, onLogin]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-semibold">Logging in with Google...</h2>
    </div>
  );
}

export default AuthSuccess;
