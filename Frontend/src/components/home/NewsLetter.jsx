import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewsLetter = ({ user, setUser }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const API = `${import.meta.env.VITE_BACKEND_URL}/auth/subscribe`;

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!user || !user.email) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
console.log("NEWSTOKEN",localStorage.getItem("token"));
    try {
      const token = localStorage.getItem("token"); // JWT from login
      const res = await fetch(API, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email }), // optional, backend can use req.user
      });

      // Parse response safely
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response is not JSON:", text);
        toast.error("Server error: invalid response");
        return;
      }

      if (data.success) {
        toast.success(data.message);
        setUser({
          ...user,
          isSubscribed: true,
        });
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = user && user.isSubscribed;
  const buttonText = isDisabled
    ? "Already Subscribed"
    : loading
    ? "Subscribing..."
    : "Subscribe Free";

  return (
    <div className="w-full bg-white font-sans px-6 py-4 pb-8 max-w-screen-lg mx-auto">
      <Toaster />
      <h2 className="text-black text-xl font-bold sm:max-xl:text-lg max-sm:text-lg">Investcly Newsletter</h2>

      <div className="flex gap-x-10 sm:max-xl:flex-col sm:max-xl:gap-x-0 max-sm:flex-col max-sm:gap-x-0">
        <div className="max-sm:w-full max-sm:text-center">
          <h1 className="text-[2.5rem] leading-tight font-extrabold text-[#f77331] mt-2 sm:max-xl:text-lg max-sm:text-lg ">
            STAY AHEAD IN <br /> FINANCE
          </h1>
          <p className="text-lg mt-4 text-black">
            Turn every update into a <br className="md:hidden" /> financial lesson
          </p>

          <ul className="mt-5 space-y-1 text-[15px] text-gray-800">
            <li>✔️ No spam, just value</li>
            <li>✔️ Free tools & reports</li>
            <li>✔️ Weekly updates</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:gap-4  w-[50%] sm:max-xl:w-full max-sm:w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled || loading}
            className="px-5 py-3 rounded text-sm w-full bg-[#d9d9d9] placeholder:text-black focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            disabled={isDisabled || loading}
            className={`px-6 py-3 text-white font-semibold text-sm rounded transition  ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f77331] hover:bg-[#e78c00]"
            }`}
          >
            {buttonText}
          </button>

          <p className="text-sm text-black mt-3 font-medium">
            1000+ Subscribers
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm tracking-wide text-black font-[Times_New_Roman]">
        Turning news into knowledge with{" "}
        <span className="text-[#ff9900] font-medium">investcly</span>
      </div>
    </div>
  );
};

export default NewsLetter;
