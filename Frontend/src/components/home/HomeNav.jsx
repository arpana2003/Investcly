import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function HomeNav({
  scrollToSection,
  accent = "#ff8800",
  tabBg,
  border,
}) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [selected, setSelected] = useState("All");

  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const categories = [
    "All",
    "Finance",
    "Investment",
    "Budget",
    "Loan",
    "GST",
    "Tax",
    "Saving",
    "Calculator",
  ];

  const handleClick = (cat) => {
    setSelected(cat);
    if (cat !== "All") scrollToSection(cat.toLowerCase());
  };

  const startScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    scrollIntervalRef.current = setInterval(() => {
      // Scroll to the right
      container.scrollLeft += 2; // Adjust speed here

      // If reached the end, reset to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    }, 10);
  };

  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
  };

  return (
    <nav
      className="border-b w-full transition-all duration-300"
      style={{
        borderColor: border,
        background: tabBg || (isDarkMode ? "#1f2937" : "#ffffff"),
      }}
    >
      <div className="pt-5 px-2">
        <div
          ref={scrollRef}
          className="flex justify-evenly pb-2 custom-scroll overflow-x-auto whitespace-nowrap space-x-4"
          style={{ WebkitOverflowScrolling: "touch" }}
          onMouseEnter={startScroll}
          onMouseLeave={stopScroll}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(cat)}
              className={`inline-block px-5 py-2 text-lg rounded font-semibold transition-all text-center
                ${selected === cat ? "bg-[#f77331] text-white" : "bg-transparent text-black"}
              `}
            >
              {cat}
              <span
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ width: "100%", backgroundColor: accent }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar (hidden) */}
      <style jsx>{`
        .custom-scroll {
          -ms-overflow-style: none;  /* IE/Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .custom-scroll::-webkit-scrollbar {
          display: none;             /* Chrome/Safari/Opera */
        }
      `}</style>
    </nav>
  );
}
