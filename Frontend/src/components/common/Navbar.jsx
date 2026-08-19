import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaSignInAlt,
  FaSearch,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const API = `${import.meta.env.VITE_BACKEND_URL}/admin/upload`;

export default function Navbar({ scrollToSection, onSearch, user }) {
  console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
  console.log(user);
  console.log("User");
  const searchRef = useRef(null);

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const isLoggedIn = !!localStorage.getItem("token");

  // SPA logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false); // close mobile menu if open
    window.location.href = "/login"; // full page reload + navigation
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        onSearch?.(query.trim());
        setQuery("");
        setSearchOpen(false);
      }
    }
  };

  // Filter articles for search dropdown
  useEffect(() => {
    if (query.trim()) {
      const results = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(results);
    } else {
      setFilteredArticles([]);
    }
  }, [query, articles]);

  const recent = (articles ?? []).filter((article) => {
    const uploadedDate = new Date(article.createdAt);
    return uploadedDate <= new Date(); // just check it's a valid date
  });

  const bgClass = isDarkMode ? "bg-[#111111]" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-black";
  const hoverBg = isDarkMode ? "hover:bg-[#333333]" : "hover:bg-gray-100";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = isDarkMode
    ? "bg-gray-800 border-gray-600 text-white"
    : "bg-gray-100 border-gray-300 text-black";
  const menuBg = isDarkMode
    ? "bg-[#111] text-white border-gray-600"
    : "bg-white text-black border-gray-200";

  return (
    <>
      <header
        className={`sticky top-0 z-50 ${bgClass} shadow-sm border-b ${borderColor}`}
      >
        <nav
          className={`max-w-7xl mx-auto flex flex-wrap sm:items-center px-4 sm:px-6 py-3 max-sm:flex-col justify-between ${textClass}`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              className="w-9 h-9 border-amber-600 border rounded-full"
              alt="logo"
            />
            <Link to="/" className="text-2xl font-bold text-[#f77331]">
              Invest<span className={textClass}>cly</span>
            </Link>
          </div>

          <div className="max-sm:mt-2 flex items-end sm:w-[55vw]">
            {/* Search */}
            <div
              className="flex-1 flex justify-center relative"
              ref={searchRef}
            >
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full relative"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none ${inputBg}`}
                    />

                    {/* Dropdown results */}
                    {filteredArticles.length == 0 && (
                      <div
                        className={`absolute top-full left-0 right-0 mt-1 rounded-md shadow-lg border ${menuBg} max-h-60 overflow-y-auto z-50`}
                      >
                        <ul className="space-y-2 px-2">
                          <li
                            onClick={() => scrollToSection("calculator")}
                            className="mt-2"
                          >
                            Calculator
                          </li>
                          <hr className="text-gray-300" />
                          <li
                            onClick={() => scrollToSection("currencyConverter")}
                            className="mt-2"
                          >
                            Currency Converter
                          </li>
                          <hr className="text-gray-300" />
                          <li
                            onClick={() => scrollToSection("fuel-dashboard")}
                            className="mt-2"
                          >
                            Fuel Dashboard
                          </li>
                          <hr className="text-gray-300" />
                          <li
                            onClick={() => scrollToSection("tax")}
                            className="mt-2"
                          >
                            Tax
                          </li>
                          <hr className="text-gray-300" />
                          <li
                            onClick={() => scrollToSection("saving")}
                            className="mt-2"
                          >
                            Saving
                          </li>
                          <hr className="text-gray-300" />
                          <li
                            onClick={() => scrollToSection("budget")}
                            className="mt-2"
                          >
                            Budget
                          </li>
                        </ul>
                        {/* {recent.map((article) => (
                          <div
                            key={article._id}
                            className="px-4 py-2 cursor-pointer hover:bg-orange-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              navigate(`/article/${article._id}`);
                              setQuery("");
                              setFilteredArticles([]);
                              setSearchOpen(false);
                            }}
                          >
                            {article.title}
                          </div>
                        ))} */}
                      </div>
                    )}

                    {filteredArticles.length > 0 && (
                      <div
                        className={`absolute top-full left-0 right-0 mt-1 rounded-md shadow-lg border ${menuBg} max-h-60 overflow-y-auto z-50`}
                      >
                        {filteredArticles.map((article) => (
                          <div
                            key={article._id}
                            className="px-4 py-2 cursor-pointer hover:bg-orange-100 dark:hover:bg-gray-700 mb-2"
                            onClick={() => {
                              setQuery("");
                              setFilteredArticles([]);
                              setSearchOpen(false);
                            }}
                          >
                            <Link to={`/blog/${article._id}`}>
                            {article.title}
                            </Link>
                            <hr className="text-gray-300" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full ${hoverBg}`}
                title="Search"
              >
                {searchOpen ? <FaTimes size={16} /> : <FaSearch size={16} />}
              </button>

              {/* Desktop links */}
              <div className="hidden lg:flex gap-3 text-sm font-medium items-center">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
                {isLoggedIn && user?.isAdmin && (
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                )}

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f77331] text-white rounded-md hover:bg-orange-600 transition"
                  >
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f77331] text-white rounded-md hover:bg-orange-600 transition"
                  >
                    <FaSignInAlt size={14} /> Login
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-full ${hoverBg} lg:hidden`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
              </button>
            </div>
          </div>
        </nav>
      </header>


      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden flex flex-col pt-10 gap-2 px-4 pb-3 border-t ${menuBg} z-50`}
          >
            <Link
              to="/"
              className="py-1 border-b"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="py-1 border-b"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="py-1 border-b"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/privacy"
              className="py-1 border-b"
              onClick={() => setMenuOpen(false)}
            >
              Privacy Policy
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f77331] text-white rounded-md hover:bg-orange-600 transition mt-1"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f77331] text-white rounded-md hover:bg-orange-600 transition mt-1"
              >
                <FaSignInAlt size={14} /> Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
