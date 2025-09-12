import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import UserStorySlider from "./StorySlider";

export default function ArticleSection({
  articles,
  loadingArticles,
  faded,
  cardBg,
  border,
  text,
  isDarkMode,
  accent,
  LoaderBox,
}) {
  const filteredArticles = articles.filter(
    (article) => article.section === "featured" || article.section === "main"
  );

  const firstFour = filteredArticles.slice(0, 4);
  const remaining = filteredArticles.slice(4);

  return (
    <section className="md:col-span-2 order-1 md:order-2" aria-label="Articles">
      {loadingArticles ? (
        <LoaderBox />
      ) : filteredArticles.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center p-12 rounded-lg shadow"
          style={{
            background: cardBg,
            border: `1.5px solid ${border}`,
            color: faded,
            minHeight: 220,
          }}
        >
          <span className="font-semibold text-lg">No articles found.</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {firstFour.map((article) => (
              <ArticleCard
                key={article._id || article.title}
                article={article}
                border={border}
                text={text}
                faded={faded}
                isDarkMode={isDarkMode}
                accent={accent}
              />
            ))}
          </div>

          {/* 👇 Your Component after first 4 cards */}
          <div className="my-6 min-h-[300px]">
            <UserStorySlider
              accent={accent}
              cardBg={cardBg}
              border={border}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* 👇 Remaining Articles */}
          {remaining.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {remaining.map((article) => (
                <ArticleCard
                  key={article._id || article.title}
                  article={article}
                  border={border}
                  text={text}
                  faded={faded}
                  isDarkMode={isDarkMode}
                  accent={accent}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

// Reusable Card Component
function ArticleCard({ article, border, text, faded, isDarkMode, accent }) {
  const firstSection = Array.isArray(article.sections) && article.sections.length > 0 ? article.sections[0] : {};
  const sectionImage = firstSection.imageUrl;
  const sectionDescription = firstSection.description;

  return (
    <Link
      to={`/blog/${article._id}`}
      className="block"
      style={{ textDecoration: "none" }}
    >
      <div
        className="flex flex-col gap-3 pb-4 border-b"
        style={{ borderColor: border, color: text }}
      >
        <div
          className="w-full"
          style={{
            height: 180,
            background: `url(${
              sectionImage ||
              article.imageUrl ||
              "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
            }) center/cover no-repeat`,
          }}
        />
        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-center text-xs gap-2">
            <span
              className="px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: isDarkMode ? "#32344a" : "#fff7ec",
                color: accent,
              }}
            >
              {article.category}
            </span>
            {article.featured && (
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "#ffe0b2", color: "#b45309" }}
              >
                Featured
              </span>
            )}
            <span className="ml-auto text-xs" style={{ color: faded }}>
              {article.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : ""}
            </span>
          </div>

          <h3
            className="font-bold text-base"
            style={{
              color: isDarkMode ? "#fff" : "#1a1a1a",
              wordBreak: "break-word",
              lineHeight: 1.3,
            }}
            title={article.title}
          >
            {article.title}
          </h3>

          <div
            className="text-sm leading-snug"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                sectionDescription?.length > 150
                  ? sectionDescription.slice(0, 150) + "..."
                  : sectionDescription || article.content || ""
              ),
            }}
          />

          <span
            className="mt-auto text-sm font-semibold"
            style={{ color: accent }}
          >
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}


