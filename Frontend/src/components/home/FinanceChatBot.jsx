import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { X, MessageCircle } from 'lucide-react';

const preQuestions = [
  "Latest stock market news",
  "Best mutual fund to invest",
  "Crypto market update",
  "Gold investment advice",
  "FD vs SIP – which is better?",
];

const responses = {
  "hi": "Hello! Welcome to InvestCly. How can I assist you with your financial journey today?",
  "hello": "Hi there! Looking for investment advice or market insights?",
  "latest stock market news": "Today, Nifty and Sensex saw mixed trends. Banking and IT sectors showed positive movement, while Pharma stocks lagged.",
  "best mutual fund to invest": "Currently, some top-performing mutual funds are Axis Bluechip, HDFC Flexi Cap, and SBI Small Cap. Always consider your risk appetite before investing.",
  "crypto market update": "Bitcoin is trading near $65,000, while Ethereum is around $4,200. The crypto market remains volatile; invest cautiously.",
  "gold investment advice": "Gold is a stable hedge against inflation. For conservative investors, allocating 10-15% of your portfolio is recommended.",
  "fd vs sip – which is better?": "FD offers guaranteed returns but lower interest. SIP in mutual funds can provide higher long-term growth but carries market risk.",
};

const FinanceChatBot = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const popupRef = useRef(null);

  // Close popup on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;

    const lowerMsg = msg.toLowerCase();
    setChat(prev => [...prev, { sender: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botText = responses[lowerMsg] || "Sorry, I don't have an answer for that yet. Try another question from the suggestions.";
      setChat(prev => [...prev, { sender: 'bot', text: botText }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 transition"
          aria-label="Open Chat"
        >
          <MessageCircle className="text-white w-6 h-6" />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className={`w-[24rem] max-h-[36rem] p-4 rounded-2xl shadow-xl border transition-all duration-300 flex flex-col ${
            isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-orange-500">💬 InvestCly Bot</h2>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X className="w-5 h-5 hover:text-orange-600" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 max-h-64 overflow-y-auto space-y-2 mb-3 pr-1">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`text-sm px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-orange-100 text-right text-black'
                    : isDarkMode
                    ? 'mr-auto bg-gray-800 text-white'
                    : 'mr-auto bg-gray-200 text-black'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {typing && <div className="text-xs text-gray-500 italic">InvestCly Bot is typing...</div>}
          </div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2 mb-3">
            {preQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask me about stocks, mutual funds or crypto..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border outline-none text-sm ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100 border-gray-300 text-black placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FinanceChatBot;
