import React from "react";
import { useSelector } from "react-redux";
import { categories as CATEGORIES, subcategoriesMap } from "../../constants/index";

export default function HomeNav({
  category,
  subcategory,
  setCategory,
  setSubcategory,
  accent = "#ff8800",
  tabBg,
  border,
}) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <>
      <nav
        className="border-b w-full transition-all duration-300"
        style={{
          borderColor: border,
          background: tabBg || (isDarkMode ? "#1f2937" : "#ffffff"),
        }}
      >
        {/* Category Tabs */}
        <div className="max-w-7xl mx-auto pt-5 px-2 sm:px-6">
          <div
            className="flex gap-2 overflow-x-auto flex-nowrap pb-2 custom-scroll"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  const firstSub = subcategoriesMap[cat]?.[0] || "";
                  setSubcategory(firstSub);
                }}
                className={`flex-shrink-0 px-5 py-2 rounded font-semibold text-base sm:text-lg transition-all min-w-[100px] text-center relative group ${
                  category === cat
                    ? "bg-orange-400 text-white border border-orange-400 ring-2 ring-orange-400"
                    : `border-0 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`
                }`}
                style={{
                  boxShadow: category === cat ? "0 2px 8px rgba(255,136,0,0.13)" : "none",
                }}
              >
                {cat}
                <span
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{
                    width: "100%",
                    backgroundColor: accent,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Show Subcategories Only if Category is not "All" */}
        {category && category !== "All" && subcategoriesMap[category] && (
          <div className="max-w-7xl mx-auto pb-2 px-2 sm:px-6 mt-4">
            <div
              className="flex gap-2 overflow-x-auto flex-nowrap custom-scroll"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {subcategoriesMap[category].map((subCat) => (
                <button
                  key={subCat}
                  onClick={() => setSubcategory(subCat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded font-semibold text-sm sm:text-base transition-all min-w-[80px] text-center relative group ${
                    subcategory === subCat
                      ? "bg-orange-400 text-white border border-orange-400 ring-2 ring-orange-400"
                      : `border-0 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`
                  }`}
                  style={{
                    boxShadow: subcategory === subCat ? "0 2px 8px rgba(255,136,0,0.13)" : "none",
                  }}
                >
                  {subCat}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                    style={{
                      width: "100%",
                      backgroundColor: accent,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          .custom-scroll::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background-color: ${accent}40;
            border-radius: 3px;
          }
        `}</style>
      </nav>
    </>
  );
}
