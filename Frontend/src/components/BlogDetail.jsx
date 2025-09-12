import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Loader,
  Share2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
  Circle,
} from "lucide-react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/upload`;

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const accent = "#f77331";

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/${id}`).then((res) => res.json()),
      fetch(API).then((res) => res.json()),
    ])
      .then(([articleData, allData]) => {
        setArticle(articleData);
        setAllArticles(Array.isArray(allData) ? allData : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load article.");
        setLoading(false);
      });
  }, [id]);

  const currIndex = allArticles.findIndex((a) => a._id === id);
  const prevBlog = currIndex > 0 ? allArticles[currIndex - 1] : null;
  const nextBlog =
    currIndex !== -1 && currIndex < allArticles.length - 1
      ? allArticles[currIndex + 1]
      : null;

  const handleShare = () => {
    const shareData = {
      title: article?.title,
      text: article?.subcategory,
      url: window.location.href,
    };
    if (navigator.share) navigator.share(shareData);
    else {
      setShareOpen(true);
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const sharedButtonStyle = {
    background: isDarkMode ? "#23253b" : "#f2f2f7",
    color: isDarkMode ? "#f8fafc" : "#23253b",
    border: isDarkMode ? "1.5px solid #32344a" : "1.5px solid #ececec",
  };

  if (loading)
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        style={{ background: isDarkMode ? "#181926" : "#fcfcfc" }}
      >
        <Loader className="animate-spin" size={38} color={accent} />
      </div>
    );

  if (error || !article)
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        style={{
          background: isDarkMode ? "#181926" : "#fcfcfc",
          color: isDarkMode ? "#ff6b6b" : "#d32f2f",
        }}
      >
        <div className="font-bold text-xl mb-4">
          {error || "Article not found."}
        </div>
        <Link
          to="/"
          className="px-4 py-2 rounded font-bold bg-[#f77331] hover:bg-orange-600 text-white"
        >
          Go Home
        </Link>
      </div>
    );

  const sections =
    Array.isArray(article.sections) && article.sections.length > 0
      ? article.sections
      : [
          {
            imageUrl: article.imageUrl,
            subtitle: article.subcategory,
            description: article.content,
          },
        ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="flex w-full max-sm:flex-col max-sm:space-y-6 "
      style={{ background: isDarkMode ? "#181926" : "#fcfcfc" }}
    >
      <main
        className=" flex-1 py-6 px-4"
        style={{ color: isDarkMode ? "#f8fafc" : "#23253b" }}
      >
        <div className=" relative max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#f77331]"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:max-xl:gap-1 max-sm:gap-1">
            <div className="flex-1 ">
              <h1 className="relative font-extrabold text-[2.2rem] sm:max-xl:text-lg max-sm:text-lg">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold md:max-xl:text-xs sm:max-md:text-[10px] max-sm:text-[10px]"
                  style={{
                    background: isDarkMode ? "#32344a" : "#fff7ec",
                    color: accent,
                  }}
                >
                  {article.category}
                </span>
                {article.subcategory && (
                  <span
                    className="text-sm px-3 py-1 rounded-full font-medium md:max-xl:text-xs max-sm:text-[10px] sm:max-md:text-[10px]"
                    style={{
                      background: isDarkMode ? "#2d2f46" : "#fff5e5",
                      color:"#f77331"}}
                  >
                    {article.subcategory}
                  </span>
                )}
                {article.featured && (
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "#ffe0b2", color: "#b45309" }}
                  >
                    Featured
                  </span>
                )}
                <span
                  className="text-xs font-medium ml-auto"
                  style={{ color: isDarkMode ? "#c6cad7" : "#707080" }}
                >
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 rounded font-semibold whitespace-nowrap md:max-xl:text-sm sm:max-xl:px-1 sm:max-md:text-[10px] max-sm:px-1 max-sm:text-[10px] max-sm:w-[80px]"
              style={{
                background: isDarkMode ? "#2d2f46" : "#fff7ec",
                color: accent,
                border: isDarkMode
                  ? "1.5px solid #32344a"
                  : "1.5px solid #ffe0b2",
              }}
            >
              <Share2 size={18} className="sm:max-xl:scale-59 max-sm:scale-59" /> Share
            </button>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} className="relative mb-8">
              {/* Image container */}
              <div
                className="relative h-[40vh] w-[90%] mx-auto overflow-hidden rounded-xl shadow mb-3 group bg-cover bg-center"
                style={{
                  backgroundImage: `url(${section.imageUrl})`,
                }}
              ></div>

              {/* Subtitle */}
              {section.subtitle && (
                <div
                  className="relative -left-19 font-semibold my-3 text-xl px-24 sm:max-xl:px-9 max-sm:px-9 sm:max-xl:left-0 max-sm:-left-3 text-[#f77331]"
                 
                >
                  {section.subtitle}
                </div>
              )}

              {section.description && section.subtitle !== "FAQs" && (
                <div
                  className="relative w-full text-[14px] text-start px-4 mb-4 md:max-xl:px-8 sm:max-xl:text-xs sm:max-md:px-4 max-sm:text-xs max-sm:px-4"
                  style={{ color: isDarkMode ? "#f8fafc" : "#23253b" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      (section.description || "")
                        // ✅ Format Numbered Points: "1. Something"
                        .replace(
                          /(^|\n)(\d+\.)\s+(.*)/g,
                          (match, p1, num, text) => {
                            return `${p1}<br/><span class="point-heading">${num}</span> <span class="point-heading">${text}</span>`;
                          }
                        )
                        // ✅ Format Numbered Points: "1: Something"

                        // ✅ Format paragraphs: any text line not starting with Q:, A:, or number
                        .replace(
                          /(^|\n)(?!Q:|A:|\d+\.)\s*(.+)/g,
                          (match, p1, text) => {
                            return `${p1}<p class="paragraph">${text}</p>`;
                          }
                        )
                    ),
                  }}
                />
              )}

              {/* FAQs Section */}

              {section.description &&
                section.subtitle === "FAQs" && ( // 🔹 remove ":" after FAQs
                  <div className="relative w-full text-start sm:px-36 sm:max-xl:px-2 px-4 mb-4 max-sm:px-2">
                    <div className="relative flex flex-col gap-4 ">
                      {section.description
                        .split(/(?=\d+\.\s)/) // split whenever "1. ", "2. ", etc.
                        .filter((block) => block.trim())
                        .map((block, index) => {
                          // Break block into lines
                          const lines = block
                            .split("\n")
                            .map((l) => l.trim())
                            .filter(Boolean);

                          // Question = first line (the numbered point)
                          const question = lines[0].replace(/^\d+\.\s*/, ""); // remove "1. "
                          // Answer = everything after question
                          const answer = lines.slice(1).join(" ");

                          return (
                            <div key={index} className="relative">
                              {/* Question */}
                              <div
                                onClick={() => toggleAnswer(index)}
                                className={`cursor-pointer p-4 rounded shadow-lg transition duration-200
                    ${
                      activeIndex === index
                        ? "bg-[#f77331] text-white"
                        : "bg-gray-100 hover:bg-orange-200"
                    }`}
                              >
                                <p className="text-sm font-semibold">
                                  {question}
                                </p>
                              </div>

                              {/* Answer */}
                              {activeIndex === index && (
                                <div
                                  className="absolute left-0 mt-1 w-full z-10 bg-white p-4 text-sm font-bold text-[#f77331] rounded shadow-lg border border-purple-200"
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(answer),
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </main>

      <aside className="w-[25vw] mt-8 max-sm:w-full">
        <RightSection
          articles={allArticles}
          category={article.category}
          isDarkMode={isDarkMode}
        />
      </aside>
    </div>
  );
}



const RightSection = ({ articles = [], category, isDarkMode }) => {
  const liveUpdates = articles.filter(
    (article) => article.category?.trim() === category?.trim()
  );

  const navigate = useNavigate();

  // Map category to route
  const calculatorRoutes = {
    Loan: "/loan-calculator",
    Investment: "/investment-calculator",
    Revenue: "/revenue-calculator",
    Budget: "/budget-calculator",
    Credit: "/credit-calculator",
    Insurance: "/insurance-calculator",
    NetWorth: "/networth-calculator",
  };

  // Determine route based on category; default to LoanCalculator
  const calculatorRoute = Object.keys(calculatorRoutes).find((key) =>
    category.toLowerCase().includes(key.toLowerCase())
  )
    ? calculatorRoutes[
        Object.keys(calculatorRoutes).find((key) =>
          category.toLowerCase().includes(key.toLowerCase())
        )
      ]
    : "/loan-calculator";

  return (
    <div className="p-3 rounded-lg border-2 border-gray-200 transition-colors duration-300 space-y-6 flex flex-col">
      {/* Second Item: Live Updates */}
      <div className="grid grid-cols-1 py-2">
        <h2 className="text-2xl font-semibold mb-4 sm:max-xl:text-lg max-sm:text-lg">Related Article</h2>
        {liveUpdates.slice(0, 4).map((article) => (
          <Link key={article._id} to={`/blog/${article._id}`}>
            <div
              style={{
                backgroundColor: isDarkMode ? "#1e2532" : "#fff",
                borderColor: isDarkMode ? "#32344a" : "#e5e7eb",
                color: isDarkMode ? "#f8fafc" : "#1f2937",
              }}
            >
              <div className="flex items-center space-x-2 py-1">
                <Circle className="scale-50 text-[#f77331] fill-current" />
                <h1 className="font-medium text-[#666666] text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                  SIMILAR ARTICLE
                </h1>
              </div>

              <h1 className="font-medium text-lg sm:max-xl:text-sm max-sm:text-sm">{article.title}</h1>
              <p className="text-sm mb-2 sm:max-xl:text-[10px] max-sm:text-[10px]">
                {article.sections[0].description.length > 150
                  ? article.sections[0].description.slice(0, 150) + " ..."
                  : article.sections[0].description}
              </p>

              <div className="flex text-[11px] space-x-4 text-[#666666] mt-1 items-center">
                <span>4 MIN READ</span>
                <span>
                  <Circle className="w-1 fill-current" />
                </span>
                <span>
                  {new Date(article.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <hr className="text-gray-300 mt-2" />
            </div>
          </Link>
        ))}
      </div>

      {/* Calculator Card */}
      <div
        onClick={() => navigate(calculatorRoute)}
        className={`cursor-pointer p-5 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 flex flex-col justify-between ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 text-orange-900"
        }`}
      >
        <div className="flex items-center justify-between mb-4 sm:max-md:flex-col max-sm:flex-col">
          <h2 className="text-xl font-extrabold max-sm:text-sm">{category} Calculator</h2>
          <span className="text-3xl max-sm:text-lg">🧮</span>
        </div>
        <p className="text-sm mb-4 max-sm:text-xs">
          Click here to open the {category} calculator and calculate key financial details instantly.
        </p>
        <button
          className={`mt-auto px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200 max-sm:text-xs ${
            isDarkMode
              ? "bg-amber-600 hover:bg-amber-500 text-white"
              : "bg-orange-700 hover:bg-orange-600 text-white"
          }`}
        >
          Open Calculator
        </button>
      </div>
    </div>
  );
};
