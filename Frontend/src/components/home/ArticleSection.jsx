import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Header from "./Header.jsx";
import {
  BellDot,
  Newspaper,
  Megaphone,
  Sparkles,
  Flame,
  Sparkle,
  Circle,
} from "lucide-react";
import LoanCalc from "../../assets/LoanCalc.svg";
import BudgetCalc from "../../assets/BudgetCalc.svg";
import InsuranceCalc from "../../assets/InsuranceCalc.svg";
import NetWorthCalc from "../../assets/NetWorthCalc.svg";
import RevenueCalc from "../../assets/RevenueCalc.svg";
import UserStorySlider from "../home/StorySlider";
import NewsLetter from "./NewsLetter.jsx";
import Insight from "../common/Insight.jsx";
import InsightImage1 from "../../assets/Insight1.jpg";
import InsightImage2 from "../../assets/Insight2.jpg";
import InsightImage3 from "../../assets/Insight3.jpg";

export default function ArticleSectionss({
  user,
  setUser,
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
  const navigate = useNavigate();

  const mainFinancial = articles.filter(
    (article) =>
      article.category.toLowerCase().includes("finance") ||
      article.category.toLowerCase().includes("financial")
  );

  const mainGST = articles.filter((article) =>
    article.category.toLowerCase().includes("gst")
  );

  const mainTax = articles.filter((article) =>
    article.category.toLowerCase().includes("tax")
  );

  const mainSaving = articles.filter((article) =>
    article.category.toLowerCase().includes("saving")
  );

  const mainFinTech = articles.filter((article) =>
    article.category.toLowerCase().includes("fintech")
  );

  const mainCaseStudies = articles.filter((article) =>
    article.category.toLowerCase().includes("case studies")
  );

  const mainLoan = articles.filter((article) =>
    article.category.toLowerCase().includes("loan")
  );

  const mainBudget = articles.filter((article) =>
    article.category.toLowerCase().includes("budget")
  );

  const mainInvestment = articles.filter(
    (article) =>
      article.category.toLowerCase().includes("investment") ||
      article.category.toLowerCase().includes("investment")
  );

  const mainNews = articles.filter(
    (article) =>
      article.subcategory.toLowerCase().includes("news") ||
      article.subcategory.toLowerCase().includes("news")
  );

  const trending = articles.filter((article) => article.featured === true);

  const insightsData = [
    {
      title: "Market Trends 2025",
      description:
        "Explore the key market trends shaping 2025, including emerging sectors, evolving investment strategies, and global economic factors influencing stock movements. Stay ahead with actionable insights for smart investing.",
      imageUrl:
        "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
      slides: [
        {
          title: "Emerging Tech Sectors",
          imageUrl: InsightImage1,
        },
        {
          title: "Global Economic Shifts",
          imageUrl: InsightImage2,
        },
        {
          title: "Sustainable Investments",
          imageUrl: InsightImage3,
        },
      ],
    },
    {
      title: "Top 10 Performing Stocks",
      description:
        "Discover the top 10 performing stocks this month and understand why they are outperforming the market. Learn how to analyze trends, company fundamentals, and market sentiment to identify potential opportunities.",
      imageUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      slides: [
        {
          title: "Tech Giants Leading Growth",
          imageUrl: InsightImage3,
        },
        {
          title: "Healthcare Stocks Insights",
          imageUrl: InsightImage2,
        },
        {
          title: "Energy Sector Leaders",
          imageUrl: InsightImage1,
        },
      ],
    },
    {
      title: "Investment Strategies & Tips",
      description:
        "Learn practical investment strategies to grow your portfolio effectively while minimizing risk. Understand diversification, asset allocation, and the best practices for both short-term and long-term investments.",
      imageUrl:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
      slides: [
        {
          title: "Diversification Techniques",
          imageUrl: InsightImage2,
        },
        {
          title: "Long-Term vs Short-Term",
          imageUrl: InsightImage1,
        },
        {
          title: "Risk Management",
          imageUrl: InsightImage3,
        },
      ],
    },
  ];

  const [selectedInsight, setSelectedInsight] = useState(null);

  return (
    <div className="relative w-[100%]">
      {/* Trending Section  */}
      <section
        id="trending"
        className="w-full min-h-[67vh] gap-0 overflow-hidden sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : trending.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full sm:max-xl:flex-col max-sm:flex-col">
              <div className="relative w-[50%] max-sm:w-full sm:max-xl:w-[100%]">
                {trending.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="relative min-h-[60%] border-r border-b border-gray-300 px-2  hover:cursor-zoom-in sm:max-md:w-[100%] max-sm:w-full space-y-3">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs">
                          TRENDING
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 sm:max-xl:text-sm max-sm:text-sm md:max-xl:leading-5 "
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 sm:max-xl:h-32 max-sm:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex items-center text-sm space-x-4 text-[#666666] mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current sm:max-xl:w-1 max-sm:w-1" />
                        </span>
                        <span className="text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="relative  md:grid md:grid-cols-2 sm:max-md:flex max-sm:flex sm:max-md:flex-col max-sm:flex-col max-sm:w-full">
                  {trending.slice(1, 3).map((article, index) => (
                    <Link to={`/blog/${article._id}`}>
                      <div className="space-y-2 flex flex-col border-r border-gray-300 px-2 pb-4 hover:cursor-zoom-in sm:max-md:w-[100%] max-sm:w-full min-h-[35%] ">
                        <p
                          className="text-sm font-bold mt-2 text-[#333333] sm:max-xl:text-[10px] max-sm:text-[10px]"
                          style={{
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {article.title}
                        </p>
                        <div class="group relative overflow-hidden w-full h-24 sm:max-xl:h-16 max-sm:h-16 ">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                        <div className="flex items-center md:max-xl:flex-col text-sm space-x-2 text-[#666666] md:max-xl:text-[10px] md:max-xl:space-x-0 md:max-xl:-space-y-2">
                          <span>4 MIN READ</span>
                          <span>
                            <Circle className="w-2 fill-current md:max-xl:w-0" />
                          </span>
                          <span className="text-xs md:max-xl:text-[10px]">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 auto-rows-auto flex-1 w-[50%] sm:max-xl:w-full max-sm:w-full">
                {trending.slice(1, 5).map((article, index) => (
                  <div className="border-r  border-gray-300 px-1">
                    <Link to={`/blog/${article._id}`}>
                      <div className="flex items-center space-x-3 md:max-xl:py-0">
                        <Sparkle className="scale-50 text-red-700 fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          TRENDING
                        </h1>
                      </div>
                      <p className="text-xs font-semibold hover:underline md:max-xl:text-[10px]">
                        <h1 className="text-lg max-sm:text-sm sm:max-md:text-[14px] text-[#333333]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                      <hr className="text-gray-300" />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}
      </section>

      <hr className="mt-8 mb-6" />

      {/* news section  */}
      <section
        id="news"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainNews.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainNews.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          LIVE NEWS
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainNews.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLES
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainFinancial.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          NEWS ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <hr className="mb-6 mt-8" />

      {/* Newsletter Section  */}
      <div id="newsletter">
        <NewsLetter user={user} setUser={setUser} />
      </div>

      <hr className="mb-6 mt-8" />

      {/* Finance section  */}
      <section
        id="finance"
        className="w-full min-h-[67vh] gap-0 overflow-hidden sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainFinancial.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full sm:max-xl:flex-col max-sm:flex-col">
              <div className="relative w-[50%] max-sm:w-full sm:max-xl:w-[100%]">
                {mainFinancial.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="relative min-h-[60%] border-r border-b border-gray-300 px-2  hover:cursor-zoom-in sm:max-md:w-[100%] max-sm:w-full space-y-3">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs">
                          FINANCE
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 sm:max-xl:text-sm max-sm:text-sm md:max-xl:leading-5 "
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 sm:max-xl:h-32 max-sm:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex items-center text-sm space-x-4 text-[#666666] mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current sm:max-xl:w-1 max-sm:w-1" />
                        </span>
                        <span className="text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="relative  md:grid md:grid-cols-2 sm:max-md:flex max-sm:flex sm:max-md:flex-col max-sm:flex-col max-sm:w-full">
                  {mainFinancial.slice(1, 3).map((article, index) => (
                    <Link to={`/blog/${article._id}`}>
                      <div className="space-y-2 flex flex-col border-r border-gray-300 px-2 pb-4 hover:cursor-zoom-in sm:max-xl:w-[100%] max-sm:w-full min-h-[35%] ">
                        <p
                          className="text-sm font-bold mt-2 text-[#333333] sm:max-xl:text-[10px] max-sm:text-[10px]"
                          style={{
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {article.title}
                        </p>
                        <div class="group relative overflow-hidden w-full h-24 sm:max-xl:h-16 max-sm:h-16 ">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                        <div className="flex items-center md:max-xl:flex-col text-sm space-x-2 text-[#666666] md:max-xl:text-[10px] md:max-xl:space-x-0 md:max-xl:-space-y-2">
                          <span>4 MIN READ</span>
                          <span>
                            <Circle className="w-2 fill-current md:max-xl:w-0" />
                          </span>
                          <span className="text-xs md:max-xl:text-[10px]">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 auto-rows-auto flex-1 w-[50%] sm:max-xl:w-full max-sm:w-full">
                {mainFinancial.slice(1, 5).map((article, index) => (
                  <div className="border-r  border-gray-300 px-1">
                    <Link to={`/blog/${article._id}`}>
                      <div className="flex items-center space-x-3 md:max-xl:py-0">
                        <Sparkle className="scale-50 text-red-700 fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          FINANCE
                        </h1>
                      </div>
                      <p className="text-xs font-semibold hover:underline md:max-xl:text-[10px]">
                        <h1 className="text-lg max-sm:text-sm sm:max-md:text-[14px] text-[#333333]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                      <hr className="text-gray-300" />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}
      </section>

      <hr className="mt-16 mb-6" />

      {/* calculators  */}
      <div id="calculator">
        <div>
          <h2 className="font-bold text-2xl text-[#f77331]">
            Explore Our Popular Calculator
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-5 gap-5 px-4 pt-12 sm:max-xl:px-1 sm:max-xl:grid-cols-3 max-sm:px-1 max-sm:grid-cols-3">
            {/*Home Loan Calculator */}
            <div
              className="flex flex-col justify-between items-center p-4 w-[10vw] border-2 border-gray-200 min-h-[20vh] rounded-lg text-center font-semibold hover:cursor-pointer hover:text-orange-500 overflow-hidden hover:-translate-0.5 sm:max-xl:w-[16vw] max-sm:w-auto"
              onClick={() => navigate("/home-loan-calculator")}
            >
              <img
                src={LoanCalc}
                alt="Loan Calculator"
                className="h-[20vh] w-auto icon-orange-600"
              />
              <h2 className="mt-4 text-sm ">Home Loan Calculator</h2>
            </div>

            {/* Car Loan Planner */}
            <div
              className="flex flex-col justify-between items-center p-4 border-2 border-gray-200 w-[10vw] min-h-[20vh] rounded-lg text-center font-semibold hover:cursor-pointer hover:text-orange-500 overflow-hidden hover:-translate-0.5 sm:max-xl:w-[16vw] max-sm:w-auto"
              onClick={() => navigate("/car-loan-calculator")}
            >
              <img
                src={BudgetCalc}
                alt="Budget Planner"
                className="h-[20vh] w-auto icon-orange-600"
              />
              <h2 className="mt-4 text-sm">Car Loan Calculator</h2>
            </div>

            {/* Insurance Calculator */}
            <div
              className="flex flex-col justify-between items-center p-4 border-2 border-gray-200 w-[10vw] min-h-[20vh] rounded-lg text-center font-semibold hover:cursor-pointer hover:text-orange-500 overflow-hidden sm:max-xl:w-[16vw] max-sm:w-auto"
              onClick={() => navigate("/fixed-deposit-calculator")}
            >
              <img
                src={InsuranceCalc}
                alt="Insurance Calculator"
                className="h-[20vh] w-auto icon-orange-600"
              />
              <h2 className="mt-4 text-sm">Fixed Deposit</h2>
            </div>

            {/* NetWorth Calculator */}
            <div
              className="flex flex-col justify-between items-center p-4 border-2 border-gray-200 w-[10vw] min-h-[20vh] rounded-lg text-center font-semibold hover:cursor-pointer hover:text-orange-500 overflow-hidden hover:-translate-0.5 sm:max-xl:w-[16vw] max-sm:w-auto"
              onClick={() => navigate("/networth-calculator")}
            >
              <img
                src={NetWorthCalc}
                alt="NetWorth Calculator"
                className="h-[20vh] w-auto icon-orange-600"
              />
              <h2 className="mt-4 text-sm">NetWorth Calculator</h2>
            </div>

            {/* Revenue Calculator */}
            <div
              className="flex flex-col justify-between items-center p-4 border-2 border-gray-200 w-[10vw] min-h-[20vh] rounded-lg text-center font-semibold hover:cursor-pointer hover:text-orange-500 overflow-hidden hover:-translate-0.5 sm:max-xl:w-[16vw] max-sm:w-auto"
              onClick={() => navigate("/revenue-calculator")}
            >
              <img
                src={RevenueCalc}
                alt="Revenue Calculator"
                className="h-[20vh] w-auto icon-orange-600"
              />
              <h2 className="mt-4 text-sm">Revenue Calculator</h2>
            </div>
          </div>

          <div className="flex min-h-[50vh] justify-between px-4 items-center sm:max-md:flex-col sm:max-md:h-auto sm:max-md:space-y-5 max-sm:flex-col max-sm:h-auto max-sm:space-y-5">
            <div className="w-[50%] min-h-[40vh] p-3 text-center border-2 border-gray-200 md:max-xl:w-[55%] sm:max-md:w-full sm:max-md:min-h-[40vh] sm:max-md:mt-3 max-sm:w-full max-sm:h-auto max-sm:mt-3">
              <h1 className="text-[#f77331] text-sm font-medium mb-5">
                Trending at InvestCly
              </h1>
              <div className="">
                {trending.slice(0, 4).map((article) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className=" border border-orange-200 rounded-2xl text-xs p-1 flex space-x-2 items-center my-2">
                      <Flame className="text-amber-500 fill-current scale-75 " />
                      <h1>{article.title}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-[40%] min-h-[40vh] p-3 text-center border-2 border-gray-200 sm:max-md:w-full max-sm:w-full">
              <h1 className="text-[#666666] font-medium mb-3 text-sm">
                Advertisement
              </h1>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-8 mb-6" />

      {/* Investment section */}
      <section
        id="investment"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainInvestment.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainInvestment.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          INVESTMENT
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainInvestment.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLES
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainInvestment.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <hr className=" mb-6 mt-8" />

      {/* Insights  */}
      <div className="py-10 px-6 pt-2 max-sm:h-auto">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#f77331] sm:max-xl:mb-5 max-sm:mb-5">
          Insights & Analysis
        </h2>

        <div className="grid grid-cols-3 gap-6 sm:max-xl:grid-cols-2 sm:max-xl:grid-rows-1 max-sm:grid-cols-1">
          {insightsData.map((insight, idx) => (
            <div
              key={idx}
              className="h-[50vh] max-sm:h-[38vh] relative cursor-pointer rounded-xl overflow-hidden shadow-lg group"
              onClick={() => setSelectedInsight(insight)}
            >
              {/* Cover Image */}
              <div
                className="w-full h-[50vh] bg-center bg-cover transition-transform duration-300 group-hover:scale-105 sm:max-xl:h-full max-sm:h-[38vh]"
                style={{ backgroundImage: `url(${insight.imageUrl})` }}
              />

              {/* Title */}
              <div className="absolute bottom-1 left-2 z-10 bg-black/40 bg-opacity-30 rounded px-2 py-1 space-y-2">
                <h3 className="text-[#f77331] font-semibold text-lg sm:max-xl:text-sm max-sm:text-sm">
                  {insight.title}
                </h3>
                <p className="text-white text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {selectedInsight && (
          <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
            <Insight
              insight={selectedInsight}
              onClose={() => setSelectedInsight(null)}
            />
          </div>
        )}
      </div>

      <hr className="mt-8 mb-6" />

      {/* Bussiness  */}
      <section
        id="business"
        className="w-full min-h-[67vh] gap-0 overflow-hidden sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainFinancial.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full sm:max-xl:flex-col max-sm:flex-col">
              <div className="relative w-[50%] max-sm:w-full sm:max-xl:w-[100%]">
                {mainFinancial.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="relative min-h-[60%] border-r border-b border-gray-300 px-2  hover:cursor-zoom-in sm:max-md:w-[100%] max-sm:w-full space-y-3">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs">
                          BUSINESS
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 sm:max-xl:text-sm max-sm:text-sm md:max-xl:leading-5 "
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 sm:max-xl:h-32 max-sm:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex items-center text-sm space-x-4 text-[#666666] mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current sm:max-xl:w-1 max-sm:w-1" />
                        </span>
                        <span className="text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="relative  md:grid md:grid-cols-2 sm:max-md:flex max-sm:flex sm:max-md:flex-col max-sm:flex-col max-sm:w-full">
                  {mainFinancial.slice(1, 3).map((article, index) => (
                    <Link to={`/blog/${article._id}`}>
                      <div className="space-y-2 flex flex-col border-r border-gray-300 px-2 pb-4 hover:cursor-zoom-in sm:max-xl:w-[100%] max-sm:w-full min-h-[35%] ">
                        <p
                          className="text-sm font-bold mt-2 text-[#333333] sm:max-xl:text-[10px] max-sm:text-[10px]"
                          style={{
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {article.title}
                        </p>
                        <div class="group relative overflow-hidden w-full h-24 sm:max-xl:h-16 max-sm:h-16 ">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                        <div className="flex items-center md:max-xl:flex-col text-sm space-x-2 text-[#666666] md:max-xl:text-[10px] md:max-xl:space-x-0 md:max-xl:-space-y-2">
                          <span>4 MIN READ</span>
                          <span>
                            <Circle className="w-2 fill-current md:max-xl:w-0" />
                          </span>
                          <span className="text-xs md:max-xl:text-[10px]">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 auto-rows-auto flex-1 w-[50%] sm:max-xl:w-full max-sm:w-full">
                {mainFinancial.slice(1, 5).map((article, index) => (
                  <div className="border-r  border-gray-300 px-1">
                    <Link to={`/blog/${article._id}`}>
                      <div className="flex items-center space-x-3 md:max-xl:py-0">
                        <Sparkle className="scale-50 text-red-700 fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-xs font-semibold hover:underline md:max-xl:text-[10px]">
                        <h1 className="text-lg max-sm:text-sm sm:max-md:text-[14px] text-[#333333]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                      <hr className="text-gray-300" />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}
      </section>

      <hr className="mb-6 mt-8" />

      {/* user stories section */}
      <div className="h-[60vh]">
        <UserStorySlider
          accent={accent}
          cardBg={cardBg}
          border={border}
          isDarkMode={isDarkMode}
        />
      </div>

      <hr className="mt-8 mb-6" />

      {/* FinTech  */}
      <section
        id="fintech"
        className="w-full min-h-[67vh] gap-0 overflow-hidden sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainFinTech.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full sm:max-xl:flex-col max-sm:flex-col">
              <div className="relative w-[50%] max-sm:w-full sm:max-xl:w-[100%]">
                {mainFinTech.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="relative min-h-[60%] border-r border-b border-gray-300 px-2  hover:cursor-zoom-in sm:max-md:w-[100%] max-sm:w-full space-y-3">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs">
                          FINTECH
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 sm:max-xl:text-sm max-sm:text-sm md:max-xl:leading-5 "
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 sm:max-xl:h-32 max-sm:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex items-center text-sm space-x-4 text-[#666666] mt-1 sm:max-xl:text-[10px] max-sm:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current sm:max-xl:w-1 max-sm:w-1" />
                        </span>
                        <span className="text-xs sm:max-xl:text-[10px] max-sm:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="relative  md:grid md:grid-cols-2 sm:max-md:flex max-sm:flex sm:max-md:flex-col max-sm:flex-col max-sm:w-full">
                  {mainFinTech.slice(1, 3).map((article, index) => (
                    <Link to={`/blog/${article._id}`}>
                      <div className="space-y-2 flex flex-col border-r border-gray-300 px-2 pb-4 hover:cursor-zoom-in sm:max-xl:w-[100%] max-sm:w-full min-h-[35%] ">
                        <p
                          className="text-sm font-bold mt-2 text-[#333333] sm:max-xl:text-[10px] max-sm:text-[10px]"
                          style={{
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {article.title}
                        </p>
                        <div class="group relative overflow-hidden w-full h-24 sm:max-xl:h-16 max-sm:h-16 ">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                        <div className="flex items-center md:max-xl:flex-col text-sm space-x-2 text-[#666666] md:max-xl:text-[10px] md:max-xl:space-x-0 md:max-xl:-space-y-2">
                          <span>4 MIN READ</span>
                          <span>
                            <Circle className="w-2 fill-current md:max-xl:w-0" />
                          </span>
                          <span className="text-xs md:max-xl:text-[10px]">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 auto-rows-auto flex-1 w-[50%] sm:max-xl:w-full max-sm:w-full">
                {mainFinTech.slice(1, 5).map((article, index) => (
                  <div className="border-r  border-gray-300 px-1">
                    <Link to={`/blog/${article._id}`}>
                      <div className="flex items-center space-x-3 md:max-xl:py-0">
                        <Sparkle className="scale-50 text-red-700 fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          FINTECH
                        </h1>
                      </div>
                      <p className="text-xs font-semibold hover:underline md:max-xl:text-[10px]">
                        <h1 className="text-lg max-sm:text-sm sm:max-md:text-[14px] text-[#333333]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                      <hr className="text-gray-300" />
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}
      </section>

      <hr className="mt-8 mb-6" />

      {/* Budget  */}
      <section
        id="budget"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainBudget.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainBudget.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          BUDGET
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainBudget.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLES
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainBudget.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <hr className="mt-8 mb-6" />

      {/* Loan  */}
      <section
        id="loan"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainLoan.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainLoan.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          LOAN
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainLoan.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainLoan.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <hr className="mt-8 mb-10" />

      {/* Case Studies */}
      <div className=" h-[70vh] flex flex-col sm:max-xl:h-[55vh] max-sm:h-auto">
        <h2 className="text-2xl font-bold text-[#f77331] mb-6">Highlights</h2>
        <div className="flex justify-between sm:max-xl:justify-evenly max-sm:grid max-sm:grid-cols-2 max-sm:gap-4">
          {mainFinancial.slice(0, 3).map((data) => (
            // <Link to={`/blog/${data._id}`}>
            <ArticleCard article={data} />
            // </Link>
          ))}
        </div>
      </div>

      <hr className=" mb-6 mt-8" />

      {/* GST  */}
      <section
        id="gst"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainGST.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainGST.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          GST
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainGST.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainGST.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <hr className="mt-8 mb-6" />

      {/* Tax  */}
      <section
        id="tax"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainTax.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainTax.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          TAX
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainTax.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainTax.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <hr className="mt-8 mb-6" />

      {/* Saving  */}
      <section
        id="saving"
        className="w-[100%] min-h-[70vh]  gap-0 overflow-hidden sm:max-md:h-auto max-sm:h-auto"
        aria-label="Articles"
      >
        {loadingArticles ? (
          <LoaderBox />
        ) : mainSaving.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-12 rounded-lg shadow col-span-full"
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
            <div className="relative flex w-full  sm:max-xl:flex-col max-sm:flex-col sm:max-xl:mt-3 max-sm:mt-3">
              <div className="w-[40%] sm:max-xl:w-full max-sm:w-full">
                {mainSaving.slice(0, 1).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="space-y-2 border-r border-b border-gray-300 px-2 pb-4 hover:cursor-zoom-in md:max-xl:space-y-0 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-[#f77331] fill-current" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          SAVINGS
                        </h1>
                      </div>
                      <p
                        className="text-[23px] font-medium text-[#333333] leading-7 md:max-xl:text-sm"
                        style={{ fontFamily: "Times New Roman, Times, serif" }}
                      >
                        {article.title}
                      </p>
                      <div class="group relative overflow-hidden w-full h-36 md:max-xl:h-32">
                        <img
                          src={article.sections[0].imageUrl}
                          alt="Description"
                          class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex text-sm space-x-4 text-[#666666] items-center md:max-xl:text-[10px]">
                        <span>4 MIN READ</span>
                        <span>
                          <Circle className="w-2 fill-current md:max-xl:w-1" />
                        </span>
                        <span className="text-xs mt-1 md:max-xl:text-[10px]">
                          {new Date(article.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {mainSaving.slice(1, 2).map((article, index) => (
                  <Link to={`/blog/${article._id}`}>
                    <div className="border-r border-gray-300 ">
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <div className="flex md:max-xl:flex-col">
                        <p className="text-[12px] font-semibold hover:underline md:max-xl:text-[10px]">
                          {article.sections[0].description.length > 90
                            ? article.sections[0].description.slice(0, 90) +
                              " ..."
                            : article.sections[0].description}
                        </p>
                        <div class="group relative overflow-hidden w-[25vw] bg-green-500 mx-1 md:max-xl:h-16 sm:max-xl:w-full">
                          <img
                            src={article.sections[0].imageUrl}
                            alt="Description"
                            class="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-125 group-hover:opacity-90"
                          />
                        </div>
                      </div>
                      <span
                        className="mt-2 text-sm font-semibold md:max-xl:text-[10px]"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="relative h-[100%] w-[60%] grid grid-cols-2 grid-rows-3 overflow-hidden sm:max-xl:w-full max-sm:w-full">
                {mainSaving.slice(1,7).map((article, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-300 px-1 flex flex-col h-full border-b"
                  >
                    <Link
                      to={`/blog/${article._id}`}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkle className="scale-50 text-red-700 fill-current md:max-xl:scale-30" />
                        <h1 className="font-medium text-[#666666] text-xs md:max-xl:text-[10px]">
                          ARTICLE
                        </h1>
                      </div>
                      <p className="text-[12px] font-semibold hover:underline flex-grow md:max-xl:text-[9px]">
                        <h1 className="text-[15px] leading-5 max-sm:text-sm sm:max-md:text-[14px]">{article.title}</h1>
                        {article.sections[0].description.length > 90
                          ? article.sections[0].description.slice(0, 90) +
                            " ..."
                          : article.sections[0].description}
                      </p>
                      <span
                        className=" text-xs font-semibold md:max-xl:text-[10px] my-1"
                        style={{ color: accent }}
                      >
                        Read More →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// Article Card
function ArticleCard({ article, isDarkMode, accent }) {
  const firstSection =
    Array.isArray(article.sections) && article.sections.length > 0
      ? article.sections[0]
      : {};
  const sectionImage = firstSection.imageUrl;
  const sectionDescription = firstSection.description;

  return (
    <Link  className="block group relative">
      <div className="h-[58vh] w-[18vw] rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg relative sm:max-xl:h-[40vh] max-sm:h-[40vh] max-sm:w-[90%]">
        {/* IMAGE */}
        <div
          className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url(${
              sectionImage ||
              article.imageUrl ||
              "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
            })`,
          }}
        />

        {/* INITIAL INFO: Title, Category, Subcategory */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:opacity-0">
          <div className="text-white">
            {article.category && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold mb-1 inline-block"
                style={{ background: "#f77331" }}
              >
                {article.category}
              </span>
            )}
            {article.featured && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold mb-1 inline-block ml-2"
                style={{ background: "#ffe0b2", color: "#b45309" }}
              >
                Featured
              </span>
            )}
            <h3 className="font-bold text-lg leading-snug mt-1 sm:max-xl:text-sm max-sm:text-sm">
              {article.title}
            </h3>
          </div>
        </div>

        {/* DESCRIPTION ON HOVER */}
        <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center sm:max-md:p-1">
          <div
            className="text-white text-sm overflow-auto sm:max-md:text-[8px]"
            
          >
            {sectionDescription}
          </div>
        </div>
      </div>
    </Link>
  );
}
