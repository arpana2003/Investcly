import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'wouter';
import { Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={
      isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white/90'
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center text-orange-500">
              📰 DynamicNews
            </h4>
            <p className={
              isDarkMode ? 'text-white text-sm mb-4' : 'text-black text-sm mb-4'
            }>
              Your trusted source for breaking news, market insights, and comprehensive coverage of business and technology.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Linkedin, Youtube].map((Icon, index) => (
                <a key={index} href="#"
                  className="text-orange-400 hover:text-orange-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-orange-500">Categories</h5>
            <ul className={
              isDarkMode ? 'space-y-2 text-sm text-white' : 'space-y-2 text-sm text-black'
            }>
              {['Latest News', 'Markets', 'Companies', 'Technology', 'Premium'].map((category) => (
                <li key={category}>
                  <Link 
                    href={`/category/${encodeURIComponent(category)}`}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-orange-500">Services</h5>
            <ul className={
              isDarkMode ? 'space-y-2 text-sm text-white' : 'space-y-2 text-sm text-black'
            }>
              {['Market Data', 'Gold Rates', 'Currency Converter', 'Newsletter', 'RSS Feeds'].map((service) => (
                <li key={service}>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-orange-500">About</h5>
            <ul className={
              isDarkMode ? 'space-y-2 text-sm text-white' : 'space-y-2 text-sm text-black'
            }>
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Advertise'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className={
          isDarkMode
            ? 'border-t border-orange-800 mt-8 pt-8 text-center text-sm text-white'
            : 'border-t border-orange-300 mt-8 pt-8 text-center text-sm text-black'
        }>
          <p>&copy; 2024 DynamicNews. All rights reserved. Built with modern web technologies.</p>
        </div>

      </div>
    </footer>
  );
}
