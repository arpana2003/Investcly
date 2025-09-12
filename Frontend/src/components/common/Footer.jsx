import React from "react";
import { useSelector } from "react-redux";
import { Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router";

export default function Footer({ scrollToSection }) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={isDarkMode ? "bg-[#0a0a0a]" : "bg-white/90"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center text-orange-500">
              📰 Investcly
            </h4>
            <p
              className="md:max-xl:text-xs mb-3"
            >
              Your trusted source for breaking news, market insights, and
              comprehensive coverage of business and technology.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-orange-400 hover:text-orange-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-orange-500">Categories</h5>
            <ul
              className={
                isDarkMode
                  ? "space-y-2 text-sm text-white"
                  : "space-y-2 text-sm text-black"
              }
            >
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("latestUpdates")}
              >
                Latest Updates
              </li>
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("finance")}
              >
                Finance
              </li>
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("investment")}
              >
                Investment
              </li>
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("trending")}
              >
                Trending
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-orange-500">Services</h5>
            <ul
              className={
                isDarkMode
                  ? "space-y-2 text-sm text-white"
                  : "space-y-2 text-sm text-black"
              }
            >
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("calculator")}
              >
                Calculators
              </li>
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("currencyConverter")}
              >
                Currency Converter
              </li>
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("goldRates")}
              >
                Gold Rates
              </li>
              <li
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => scrollToSection("newsletter")}
              >
                NewsLetter
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-orange-500">About</h5>
            <ul
              className={
                isDarkMode
                  ? "space-y-2 text-sm text-white "
                  : "space-y-2 text-sm text-black"
              }
            >
              <Link to="/about">
              <li
                className="hover:text-orange-500 md:max-xl:mb-1 cursor-pointer"
              >
                About Us
              </li>
              </Link>
              <Link to="/contact">
              <li
                className="hover:text-orange-500 md:max-xl:mb-2 cursor-pointer"
              >
                Contact
              </li>
              </Link>
              <Link to="/privacy">
              <li
                className="hover:text-orange-500 md:max-xl:mb-2 cursor-pointer"
              >
                Privacy Policy
              </li>
              </Link>
              <Link to="/termsofservice">
              <li
                className="hover:text-orange-500 cursor-pointer"
              >
                Terms Of Service
              </li>
              </Link>
            </ul>
          </div> 
        </div>

        <div
          className={
            isDarkMode
              ? "border-t border-orange-800 mt-8 pt-8 text-center text-sm text-white"
              : "border-t border-orange-300 mt-8 pt-8 text-center text-sm text-black"
          }
        >
          <p>
            &copy; {new Date().getFullYear()} Investcly. All rights reserved.
            Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
