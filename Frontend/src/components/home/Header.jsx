import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API =
    process.env.NODE_ENV === "production"
        ? "https://dynamicnewsbackend.vercel.app/admin/upload"
        : "http://localhost:5000/admin/upload";

export default function Header({ isDarkMode }) {
    const [headlineNews, setHeadlineNews] = useState([]);

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data); // 👈 Add this
                const filtered = data
                    .filter((item) => item.section === "headline")
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setHeadlineNews(filtered.slice(0, 5));
            })
            .catch(() => setHeadlineNews([]));
    }, []);


    const text = isDarkMode ? "#f8fafc" : "#23253b";
    const subtitleColor = isDarkMode ? "#f1f5f9" : "#1e293b";
    const timeColor = isDarkMode ? "#94a3b8" : "#64748b";

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
            {headlineNews.map((news) => (
                <Link
                    to={`/blog/${news._id}`}
                    key={news._id}
                    className="block px-2 py-3 rounded-lg hover:bg-opacity-10 transition-all duration-150"
                    style={{ color: text, textDecoration: "none" }}
                >
                    <div className="flex flex-col">
                        <h2
                            className="text-sm font-semibold hover:underline"
                            style={{ color: subtitleColor }}
                        >
                            {news.sections?.[0]?.subtitle || news.title || "Untitled"}
                        </h2>


                        <div className="flex items-center gap-3 mt-1 text-xs">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-medium">
                                {news.category}
                            </span>
                            <span style={{ color: timeColor }}>{getTimeAgo(news.createdAt)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
