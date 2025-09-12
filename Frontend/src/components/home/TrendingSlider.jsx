import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TrendingSlider({
  trending,
  loadingTrending,
  accent,
  cardBg,
  border,
  faded,
  isDarkMode,
  LoaderBox,
}) {
  return (
    <div className="md:hidden block mb-4">
      <div className="w-full px-2">
        {loadingTrending ? (
          <LoaderBox />
        ) : trending.length === 0 ? (
          <div className="text-center text-gray-400 px-2">No trending articles.</div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            style={{
              paddingBottom: "2.5rem",
              borderRadius: "1rem",
            }}
          >
            {trending
              .filter(article => article.section === "featured")
              .map((article, i) => {
                // Show first section's image if exists, fallback to article.imageUrl
                const sectionImage =
                  Array.isArray(article.sections) && article.sections.length > 0
                    ? article.sections[0].imageUrl
                    : article.imageUrl || "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80";
                return (
                  <SwiperSlide key={article._id || article.title}>
                    <div className="text-center mb-2 text-red-500">Trending</div>

                    <div
                      className="rounded-2xl overflow-hidden shadow-lg border blink-effect flex flex-col"
                      style={{
                        background: cardBg,
                        border: `1.5px solid ${border}`,
                        minHeight: "180px",
                        maxHeight: "220px",
                        animation: `blink 1.7s ${i * 0.5}s infinite alternate`,
                      }}
                    >
                      <div
                        className="w-full"
                        style={{
                          height: 90,
                          minHeight: 90,
                          maxHeight: 90,
                          background: `url(${sectionImage ||
                            article.imageUrl ||
                            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                            }) center/cover no-repeat`,
                        }}
                      />
                      <div className="flex-1 flex flex-col px-3 py-2">
                        <div className="flex items-center mb-1 gap-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                              background: isDarkMode ? "#32344a" : "#fff7ec",
                              color: accent,
                            }}
                          >
                            {article.category}
                          </span>
                          {article.subcategory && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                              style={{
                                background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
                                color: accent,
                              }}
                            >
                              {article.subcategory}
                            </span>
                          )}
                          <span className="ml-auto text-xs" style={{ color: faded }}>
                            {article.createdAt
                              ? new Date(article.createdAt).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-base mb-1 truncate"
                          style={{
                            color: isDarkMode ? "#fff" : "#1a1a1a",
                            letterSpacing: ".01em",
                            lineHeight: 1.2,
                          }}
                          title={article.title}
                        >
                          {article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title}
                        </h3>
                       <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  {article.content?.length > 40 ? article.content.slice(0, 40) + '...' : article.content || ""}
</p>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
      <style>{`
        .swiper-pagination-bullet {
          background: ${accent} !important;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: ${accent} !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: ${accent};
        }
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
      `}</style>
    </div>
  );
}