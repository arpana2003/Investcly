import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Simple "time ago" formatter
const getTimeAgo = (dateStr)=> {
  const now = new Date();
  const past = new Date(dateStr);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  const mins = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (diff < 60) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const API =
  process.env.NODE_ENV === "production"
    ? "https://dynamicnewsbackend.vercel.app/api/stories"
    : "http://localhost:5000/api/stories";

const UserStorySlider = ({ cardBg, border, isDarkMode }) => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch(() => setStories([]));
  }, []);

  const scrollHandler = (dir) => {
    const visibleCount = 3;
    const total = stories.length;
    let nextIndex =
      dir === "left"
        ? Math.max(currentIndex - visibleCount, 0)
        : Math.min(currentIndex + visibleCount, total - visibleCount);

    setCurrentIndex(nextIndex);
  };

  const visibleStories = stories.slice(currentIndex, currentIndex + 3);

  return (
    <div
      className={`select-none rounded min-h-[400px] px-4 py-6 ${
        isDarkMode ? "bg-orange-300" : "bg-orange-400"
      }`}
    >
      <h2 className="text-2xl font-bold text-black mb-4 text-center">User Stories</h2>

      <div className="relative w-full">
        <div className="flex justify-center gap-4 overflow-hidden">
          {visibleStories.map((story, index) => {
            const slide = story.slides?.[0];

            return (
           <div
  key={story._id}
  className={`flex flex-col items-center justify-start text-sm rounded-lg shadow-md border cursor-pointer overflow-hidden relative group`}
  style={{
    background: isDarkMode ? "#23253b" : cardBg,
    borderColor: border,
    width: "200px",
    height: "200px",
  }}
>
  {/* Image or Video */}
  {story.storyType === "video" && slide?.imageUrl ? (
    <video
      src={slide.imageUrl}
      className="w-full h-[120px] object-cover"
      controls
      draggable={false}
    />
  ) : slide?.imageUrl ? (
    <img
      src={slide.imageUrl}
      alt="story"
      className="w-full h-[120px] object-cover transition-transform duration-300 group-hover:scale-105"
      draggable={false}
    />
  ) : (
    <div className="w-full h-[120px] bg-gray-300" />
  )}

  {/* Title */}
  <div className="p-2 w-full text-center relative">
    <h3
      className={`font-semibold text-orange-600 line-clamp-1 hover:underline`}
    >
      {story.title}
    </h3>
  </div>

  {/* Time Bottom Left */}
  <p
    className={`absolute bottom-2 left-2 text-xs ${
      isDarkMode ? "text-gray-400" : "text-gray-600"
    }`}
  >
    {getTimeAgo(story.createdAt)}
  </p>
</div>

            );
          })}
        </div>

        {/* Nav Arrows at bottom-left */}
        {stories.length > 3 && (
          <div className="absolute top-56 left-4 flex gap-3 z-10">
            <button
              onClick={() => scrollHandler("left")}
              className="bg-orange-500 border-2 border-amber-50 text-white p-2 rounded-full shadow"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => scrollHandler("right")}
              className="bg-orange-500 border-2 border-amber-50 text-white p-2 rounded-full shadow"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStorySlider;
