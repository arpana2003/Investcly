import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { X, MessageCircle } from 'lucide-react';

const preQuestions = [
  "Latest stock market news",
  "Best mutual fund to invest",
  "Crypto market update",
  "Should I invest in gold?",
  "FD vs SIP – what's better?",
];

const responses = {
  "hi": "Hello! How can I help you with finance today?",
  "hello": "Hi there! Need help with investment advice?",
  "Latest stock market news": "Today, Nifty and Sensex showed positive trends with tech and banking stocks leading the rally.",
  "Best mutual fund to invest": "Some popular mutual funds right now are: Axis Bluechip, SBI Small Cap, and HDFC Flexi Cap.",
  "Crypto market update": "Bitcoin is trading around $65,000 with Ethereum following the trend. Market remains volatile.",
  "Should I invest in gold?": "Gold is a good hedge against inflation. Consider 10-15% of portfolio if you're conservative.",
  "FD vs SIP – what's better?": "FD is fixed return but lower. SIP in mutual funds can give better returns long-term but has risk.",
};

const FinanceChatBot = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const popupRef = useRef(null);

  // Click outside closes popup
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;

    const lowerMsg = msg.toLowerCase();
    const userMsg = { sender: 'user', text: msg };
    setChat(prev => [...prev, userMsg]);
    setInput('');

    setTyping(true);
    setTimeout(() => {
      const botText = responses[lowerMsg] || "Sorry, I don't have an answer for that yet.";
      const botMsg = { sender: 'bot', text: botText };
      setChat(prev => [...prev, botMsg]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Logo button */}
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
          className={`w-[22rem] max-h-[34rem] p-4 rounded-2xl shadow-xl border transition-all duration-300 flex flex-col ${
            isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-orange-500">💬 FinanceBot</h2>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X className="w-5 h-5 hover:text-orange-600" />
            </button>
          </div>

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
            {typing && (
              <div className="text-xs text-gray-500 italic">Bot is typing...</div>
            )}
          </div>

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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
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
