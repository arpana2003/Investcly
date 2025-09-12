import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { categories as CATEGORIES, subcategoriesMap } from "../constants";

import Navbar from "./common/Navbar.jsx"; // Updated Navbar import
import HomeNav from "./home/HomeNav";
import ArticleSection from "./home/ArticleSection";
import FinanceSection from "./home/FinanceSection";
import FinanceChatBot from "./home/FinanceChatBot";
import HeaderImage from "./home/HeaderImage";

import { useNavigate } from "react-router";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/upload`;

export default function Home({ user, setUser }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const defaultCategory = CATEGORIES[0];
  const defaultSubcategory = subcategoriesMap[defaultCategory]?.[0] || "";

  const [category, setCategory] = useState(defaultCategory);
  const [subcategory, setSubcategory] = useState(defaultSubcategory);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const articleRef = useRef(null);
  const financeRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fetch all articles
  useEffect(() => {
    setLoadingArticles(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const allArticles = Array.isArray(data) ? data : [];
        setArticles(allArticles);
        setLoadingArticles(false);
      })
      .catch(() => {
        setArticles([]);
        setLoadingArticles(false);
      });
  }, []);

  // Filter articles based on category, subcategory, and searchQuery
  useEffect(() => {
    let filtered = [...articles];

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

    setFilteredArticles(filtered);
  }, [articles, category, subcategory, searchQuery]);

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
        scrollToSection={scrollToSection}
      />

      <main
        className="max-w-7xl mx-auto pt-4 flex justify-between px-6 pb-10 max:px-16 sm:max-xl:px-1 max-sm:px-1 max-sm:flex-col"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        {/* Middle: Articles */}
        <div
          className="relative border-b w-[57vw] md:max-xl:w-[60vw] sm:max-md:w-[56vw] max-sm:w-full max-sm:mb-8"
          ref={articleRef}
        >
          <ArticleSection
            user={user}
            setUser={setUser}
            articles={filteredArticles}
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

        {/* Right: Finance Section */}
        <div
          className="w-[23vw] sm:max-xl:w-[26vw] relative max-sm:w-full max-sm:border-2 max-sm:border-gray-300"
          ref={financeRef}
        >
          {/* Sticky wrapper */}
          <div className="sm:sticky sm:top-24 sm:h-[calc(100vh-6rem)]">
            <div className="h-full overflow-y-auto">
              <FinanceSection
                articles={filteredArticles}
                loadingArticles={loadingArticles}
                accent={accent}
                cardBg={cardBg}
                border={border}
                faded={faded}
                isDarkMode={isDarkMode}
                text={text}
              />
            </div>
          </div>
        </div>
      </main>

      <FinanceChatBot />

      {/* Custom scrollbar & blink effect */}
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
