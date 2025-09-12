import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { categories as CATEGORIES, subcategoriesMap } from "../constants";

import HomeNav from "./home/HomeNav";
import ArticleSection from "./home/ArticleSection";
import TrendingSection from "./home/TrendingSection";
import TrendingSlider from "./home/TrendingSlider";
import FinanceSection from "./home/FinanceSection";

import FinanceChatBot from "./home/FinanceChatBot";
import HeaderImage from "./home/HeaderImage";
import Header from "./home/Header";

const API =
  process.env.NODE_ENV === "production"
    ? "https://dynamicnewsbackend.vercel.app/admin/upload"
    : "http://localhost:5000/admin/upload";

export default function Home({ searchQuery }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const defaultCategory = CATEGORIES[0];
  const defaultSubcategory = subcategoriesMap[defaultCategory]?.[0] || "";

  const [category, setCategory] = useState(defaultCategory);
  const [subcategory, setSubcategory] = useState(defaultSubcategory);
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [trending, setTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  const leftScrollRef = useRef(null);
  const rightScrollRef = useRef(null);

  useEffect(() => {
    setLoadingArticles(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        let filtered = Array.isArray(data) ? data : [];
        if (category && category !== "All") {
          filtered = filtered.filter((a) => a.category === category);
        }

        if (subcategory && subcategoriesMap[category]) {
          filtered = filtered.filter((a) => a.subcategory === subcategory);
        }
        if (searchQuery) {
          filtered = filtered.filter((a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setArticles(filtered);

        // Only featured articles for trending
        const trend = Array.isArray(data)
          ? data
            .filter((a) => a.section === "featured") // <--- IMPORTANT: this is the key change
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6)
          : [];
        setTrending(trend);
        setLoadingArticles(false);
        setLoadingTrending(false);
      })
      .catch(() => {
        setArticles([]);
        setTrending([]);
        setLoadingArticles(false);
        setLoadingTrending(false);
      });
  }, [category, subcategory, searchQuery]);

  const bg = isDarkMode ? "#181926" : "#fcfcfc";
  const cardBg = isDarkMode ? "#23253b" : "#fff";
  const border = isDarkMode ? "#32344a" : "#ececec";
  const text = isDarkMode ? "#f8fafc" : "#23253b";
  const tabBg = isDarkMode ? "#23253b" : "#f2f2f7";
  const accent = "#ff8800";
  const faded = isDarkMode ? "#c6cad7" : "#707080";

  const LoaderBox = () => (
    <div className="flex items-center justify-center pt-40 w-full">
      <Loader className="animate-spin text-orange-500" size={36} />
    </div>
  );

  return (
    <div
      style={{ background: bg, minHeight: "100vh" }}
      className="transition-colors"
    >
      <HomeNav
        category={category}
        subcategory={subcategory}
        setCategory={setCategory}
        setSubcategory={setSubcategory}
        isDarkMode={isDarkMode}
        accent={accent}
        tabBg={tabBg}
        border={border}
      />

      <div className="mt-10">
        <TrendingSlider
          trending={trending}
          loadingTrending={loadingTrending}
          accent={accent}
          cardBg={cardBg}
          border={border}
          faded={faded}
          isDarkMode={isDarkMode}
          LoaderBox={LoaderBox}
          className=" pt-4 "
        />
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-7 px-2 sm:px-6 pb-10"
        style={{ minHeight: "calc(100vh - 100px)" }}>

        {/* Left: Trending */}
        <div className="md:col-span-1 order-2 md:order-1 ">
          <div className="flex-col flex gap-2 justify-center items-center">

            <div><TrendingSection
              trending={trending}
              loadingTrending={loadingTrending}
              accent={accent}
              cardBg={cardBg}
              border={border}
              faded={faded}
              isDarkMode={isDarkMode}
              LoaderBox={LoaderBox}
            /></div>
            <div>      <Header isDarkMode={isDarkMode} />   </div>
          </div>
        </div>

        {/* Middle: Articles */}
        <div className="md:col-span-2 order-1 md:order-2">
          <ArticleSection
            articles={articles}
            loadingArticles={loadingArticles}
            faded={faded}
            cardBg={cardBg}
            border={border}
            text={text}
            isDarkMode={isDarkMode}
            accent={accent}
            LoaderBox={LoaderBox}
          />
           <HeaderImage isDarkMode={isDarkMode} />
        </div>

        {/* Right: Finance */}
        <div className="md:col-span-1 order-3 md:order-3">
          <FinanceSection
            accent={accent}
            cardBg={cardBg}
            border={border}
            faded={faded}
            isDarkMode={isDarkMode}
            text={text}
          />
        </div>


      </main>


      <FinanceChatBot />

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${accent} transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${accent};
          border-radius: 8px;
          min-height: 24px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: #ffb266;
        }
        @media (max-width: 767px) {
          .custom-scrollbar::-webkit-scrollbar { display: none; }
          .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        }
           @keyframes blink {
          0% { box-shadow: none; }
          100% { box-shadow: 0 0 18px ${accent}55, 0 0 50px ${accent}22; }
        }
        .blink-effect {
          will-change: box-shadow;
        }
      `}</style>
    </div>
  );
}