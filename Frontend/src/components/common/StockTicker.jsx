import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  FaApple,
  FaMicrosoft,
  FaGoogle,
  FaFacebook,
  FaCar,
  FaChartLine,
  FaRupeeSign,
} from "react-icons/fa";

const LOGO_COLORS = {
  AAPL: "#a2aaad",
  MSFT: "#737373",
  GOOGL: "#4285f4",
  TSLA: "#cc0000",
  META: "#4267B2",
  SENSEX: "#f59e0b",
  GOLD: "#facc15",
};

const ICONS = {
  AAPL: <FaApple className="inline-block mr-1" color={LOGO_COLORS.AAPL} />,
  MSFT: <FaMicrosoft className="inline-block mr-1" color={LOGO_COLORS.MSFT} />,
  GOOGL: <FaGoogle className="inline-block mr-1" color={LOGO_COLORS.GOOGL} />,
  TSLA: <FaCar className="inline-block mr-1" color={LOGO_COLORS.TSLA} />,
  META: <FaFacebook className="inline-block mr-1" color={LOGO_COLORS.META} />,
  SENSEX: <FaChartLine className="inline-block mr-1" color={LOGO_COLORS.SENSEX} />,
  GOLD: <FaRupeeSign className="inline-block mr-1" color={LOGO_COLORS.GOLD} />,
};

const STATIC_STOCK_DATA = [
  { symbol: "AAPL", price: "197.20", change: "+1.25", percent: "+0.64" },
  { symbol: "MSFT", price: "352.15", change: "-0.45", percent: "-0.13" },
  { symbol: "GOOGL", price: "135.67", change: "+0.85", percent: "+0.63" },
  { symbol: "TSLA", price: "246.30", change: "-2.10", percent: "-0.85" },
  { symbol: "META", price: "315.95", change: "+1.75", percent: "+0.56" },
  { symbol: "SENSEX", price: "76,221.82", change: "+115.23", percent: "+0.15" },
  { symbol: "GOLD", price: "₹72,450", change: "-90", percent: "-0.12" },
];

// The gap in px between the last and first element as they loop
const ELEMENT_GAP = 48; // px

const StockTicker = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const containerRef = useRef(null);
  const tickerRef = useRef(null);
  const animationFrame = useRef(null);
  const lastTime = useRef(null);
  const position = useRef(0);
  const tickerWidth = useRef(0);

  const [paused, setPaused] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const scrollSpeed = 60;

  // Duplicate items for seamless looping
  // Use a memoized array to avoid re-rendering
  const items = STATIC_STOCK_DATA.concat(STATIC_STOCK_DATA.slice(0, 1)); // add first stock at end for smoothness

  useEffect(() => {
    // After render, calculate ticker width (only once)
    if (tickerRef.current) {
      const children = tickerRef.current.children;
      let total = 0;
      for (let i = 0; i < children.length - 1; ++i) {
        total += children[i].offsetWidth;
      }
      total += ELEMENT_GAP * (children.length - 2); // add gaps
      tickerWidth.current = total;
    }
    // Reset position to 0 if window resized
    position.current = 0;
    if (tickerRef.current) {
      tickerRef.current.style.transform = `translateX(0px)`;
    }
  }, []);

  const update = (timestamp) => {
    if (!lastTime.current) lastTime.current = timestamp;
    const delta = (timestamp - lastTime.current) / 1000;

    if (!paused && !scrollingDown) {
      position.current -= scrollSpeed * delta;

      const containerW = containerRef.current.offsetWidth;
      const totalTickerW = tickerWidth.current + ELEMENT_GAP; // Add gap between last and first
      // If the whole ticker has completely moved out, reset with a gap after
      if (Math.abs(position.current) >= totalTickerW) {
        position.current += totalTickerW;
      }

      tickerRef.current.style.transform = `translateX(${position.current}px)`;
    }

    lastTime.current = timestamp;
    animationFrame.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame.current);
    // eslint-disable-next-line
  }, [paused, scrollingDown]);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      setScrollingDown(st > lastScrollTop && st > 100);
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [lastScrollTop]);

  return (
    <div
  ref={containerRef}
  className={`fixed w-[84.4vw] z-40 border-b shadow-md overflow-hidden text-sm ${
    isDarkMode ? "bg-[#111] text-white border-gray-700" : "bg-[#111] text-black border-gray-200"
  }`}
  style={{ top: "var(--navbar-height, 56px)" }}
>
  <div
    ref={tickerRef}
    className="inline-block whitespace-nowrap py-2"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    style={{ willChange: "transform", cursor: "pointer" }}
  >
    {items.map(({ symbol, price, change, percent }, index) => (
      <span
        key={index}
        className={`inline-flex items-center px-4 ${
          index !== 0 ? "border-l border-gray-400" : ""
        }`}
        style={{
          color: change.startsWith("-") ? "#f87171" : "#34d399",
        }}
      >
        {ICONS[symbol]}
        <span style={{ color: LOGO_COLORS[symbol] || "inherit", marginLeft: "2px" }}>
          {symbol}
        </span>{" "}
        {price} {change.startsWith("-") ? "↓" : "↑"} {change} ({percent}%)
      </span>
    ))}
  </div>
</div>

  );
};

export default StockTicker;