import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/upload`;

export default function HeaderImage({ isDarkMode }) {
  const [bottomNews, setBottomNews] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((item) => item.section === "bottom")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBottomNews(filtered.slice(0, 3));
      })
      .catch(() => setBottomNews([]));
  }, []);

  const border = isDarkMode ? "#32344a" : "#ececec";
  const bg = isDarkMode ? "#23253b" : "#fff";
  const text = isDarkMode ? "#f8fafc" : "#23253b";
  const subtitleColor = isDarkMode ? "#f1f5f9" : "#1e293b";
  const tagBg = isDarkMode ? "#334155" : "#e2e8f0";
  const tagText = isDarkMode ? "#f1f5f9" : "#1e293b";

  const getTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diffInMinutes = Math.floor((now - created) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours} hrs ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="w-full space-y-4 mt-4">
      {bottomNews.map((news) => (
        <Link
          to={`/blog/${news._id}`}
          key={news._id}
          className="block"
          style={{ textDecoration: "none" }}
        >
          <div
            className="flex gap-3 p-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            {/* Optional Image Display */}
            <div className="w-1/3 rounded-lg overflow-hidden">
              <img
                src={news.sections?.[0]?.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full flex flex-col justify-between">
              <p
                className="text-sm font-semibold leading-snug hover:underline"
                style={{ color: subtitleColor }}
              >
                {news.sections?.[0]?.subtitle || news.title}
              </p>

              {/* Category and Subcategory Tags */}
              <div className="flex gap-2 flex-wrap mt-1">
                {news.category && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: tagBg,
                      color: tagText,
                      fontWeight: 500,
                    }}
                  >
                    {news.category}
                  </span>
                )}
                {news.subcategory && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: tagBg,
                      color: tagText,
                      fontWeight: 500,
                    }}
                  >
                    {news.subcategory}
                  </span>
                )}
              </div>

              <span
                className="text-xs mt-1"
                style={{ color: isDarkMode ? "#94a3b8" : "#64748b" }}
              >
                {getTimeAgo(news.createdAt)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
