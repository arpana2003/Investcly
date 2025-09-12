import React from "react";
import { Link } from "react-router-dom";

export default function TrendingSection({
  trending,
  loadingTrending,
  accent,
  cardBg,
  border,
  faded,
  isDarkMode,
  minimal = false,
  LoaderBox,
}) {
  return (
    <aside
      className={`md:col-span-1 order-2 md:order-1 ${minimal ? "" : "hidden md:block"}`}
      aria-label="Trending"
    >
      <div
        className="shadow-2xl blink-effect rounded-lg overflow-hidden"
        style={{
          background: cardBg,
          animation: "blink 1.5s infinite alternate",
        }}
      >
        {/* Sticky Header */}
        <div
          className="sticky top-0 z-10 p-4 border-b"
          style={{
            background: cardBg,
            borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="font-bold text-xl" style={{ color: accent }}>
            Trending
          </h2>
        </div>

        {/* Scrollable Body with Max Height */}
        <div className="scroll-container p-3 max-h-[736px] overflow-y-auto">
          {loadingTrending ? (
            <LoaderBox />
          ) : trending.length === 0 ? (
            <div className="text-center text-gray-400">No trending articles.</div>
          ) : (
            trending
              .filter(article => article.section === "featured")
              .map((article) => {
                const sectionImage =
                  Array.isArray(article.sections) && article.sections.length > 0
                    ? article.sections[0].imageUrl
                    : undefined;

                return (
                  <div
                    key={article._id || article.title}
                    className="shadow-md border rounded-md mb-4 overflow-hidden hover:scale-[1.02] transition-transform duration-200 ease-in-out flex flex-col"
                    style={{
                      background: cardBg,
                      borderColor: isDarkMode ? "#333" : "#ddd",
                    }}
                  >
                    <div
                      className="aspect-[16/9] w-full"
                      style={{
                        background: `url(${
                          sectionImage ||
                          article.imageUrl ||
                          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                        }) center/cover no-repeat`
                      }}
                    />

                    <div className="flex flex-col px-3 py-2 gap-1 flex-1">
                      <Link to={`/blog/${article._id}`} title={article.title}>
                        <h5
                          className="font-bold text-base break-words"
                          style={{
                            color: isDarkMode ? "#fff" : "#1a1a1a",
                            lineHeight: 1.4,
                          }}
                        >
                          <span className={`${isDarkMode ? 'hover:text-orange-300' : 'hover:text-orange-500'} transition-colors`}>
                            {article.title}
                          </span>
                        </h5>
                      </Link>

                      <div className="flex items-center flex-wrap gap-2">
                        <span
                          className="px-2 py-0.5 text-xs font-semibold rounded"
                          style={{
                            background: isDarkMode ? "#32344a" : "#fff7ec",
                            color: accent,
                          }}
                        >
                          {article.category}
                        </span>
                        {article.subcategory && (
                          <span
                            className="px-2 py-0.5 text-[11px] font-semibold rounded"
                            style={{
                              background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
                              color: accent,
                            }}
                          >
                            {article.subcategory}
                          </span>
                        )}
                      </div>

                      <span className="text-xs mt-auto" style={{ color: faded }}>
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* Custom Scrollbar & Blink Animation */}
      <style>{`
        @keyframes blink {
          0% { box-shadow: 0 0 0px ${accent}00; }
          100% { box-shadow: 0 0 18px ${accent}55, 0 0 50px ${accent}22; }
        }

        .blink-effect {
          will-change: box-shadow;
        }

        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: ${accent}20 transparent;
          transition: all 0.2s ease-in-out;
        }

        .scroll-container:hover {
          scrollbar-color: ${accent}88 transparent;
        }

        .scroll-container::-webkit-scrollbar {
          width: 8px;
        }

        .scroll-container::-webkit-scrollbar-thumb {
          background-color: ${accent}55;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: background-color 0.2s ease-in-out;
        }

        .scroll-container:hover::-webkit-scrollbar-thumb {
          background-color: ${accent};
        }

        .scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </aside>
  );
}
