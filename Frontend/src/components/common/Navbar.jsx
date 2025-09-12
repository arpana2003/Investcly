import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import { FaMoon, FaSun, FaSignOutAlt, FaSignInAlt, FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StockTicker from '../common/StockTicker';

export default function Navbar({ onSearch }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) {
        onSearch?.(query.trim());
        setQuery('');
        setSearchOpen(false);
      }
    }
  };

  const bgClass = isDarkMode ? 'bg-[#111111]' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const hoverBg = isDarkMode ? 'hover:bg-[#333333]' : 'hover:bg-gray-100';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-black';
  const menuBg = isDarkMode ? 'bg-[#111] text-white border-gray-600' : 'bg-white text-black border-gray-200';

  const sensex = '76,221.82';
  const goldRate = '₹72,450';

  return (
    <>
      <header className={`sticky top-0 z-50 ${bgClass} shadow-sm border-b ${borderColor} m-0 p-0`}>
        <nav className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 ${textClass}`}>
          {/* Logo and SENSEX */}
          <div className="flex items-center gap-2">
            
              <img src="/logo.png" className='w-9 h-9 border-amber-600 border rounded-full' alt="" />
            
            <Link to="/" className="text-2xl font-bold text-[#f77331]">
              Invest<span className={textClass}>cly</span>
            </Link>

          </div>

          {/* Center Search */}
          <div className="flex-1 flex justify-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md"
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2 rounded-full ${hoverBg}`} title="Search">
              {searchOpen ? <FaTimes size={16} /> : <FaSearch size={16} />}
            </button>

            <button onClick={() => dispatch(toggleTheme())} className={`p-2 rounded-full ${hoverBg}`} title="Toggle Theme">
              {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-3 text-sm font-medium items-center">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
              <Link to="/calculators" className="hover:underline">Calculators</Link>
              <Link to="/about" className="hover:underline">About Us</Link>
              {isLoggedIn && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}

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
        </nav>
      </header>

      {/* StockTicker below header */}
      <div className="mx-2 py-3">
        <StockTicker />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence >
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden flex bg-black flex-col pt-10 gap-2 px-4 pb-3 border-t ${menuBg}`}
          >
            <Link to="/" className="py-1 border-b" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/contact" className="py-1 border-b" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            <Link to="/calculators" className="py-1 border-b" onClick={() => setMenuOpen(false)}>Calculators</Link>
            <Link to="/about" className="py-1 border-b" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/privacy" className="py-1 border-b" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>
            <Link to="/disclaimer" className="py-1 border-b" onClick={() => setMenuOpen(false)}>Disclaimer</Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f77331] text-white rounded-md hover:bg-orange-600 transition mt-1"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f77331] text-white rounded-md hover:bg-orange-600 transition mt-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaSignInAlt size={14} /> Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
