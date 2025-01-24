// components/Header.tsx
import React from 'react';
import { FaSearch, FaQuestionCircle, FaCommentDots } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between rounded-t-lg bg-blue-600 p-4 text-white shadow-lg">
      <div className="flex items-center gap-4">
        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 hover:bg-blue-500">
            <FaCommentDots className="text-xl" />
          </button>
          <button className="rounded-full p-2 hover:bg-blue-500">
            <FaQuestionCircle className="text-xl" />
          </button>
          <button className="rounded-full p-2 hover:bg-blue-500">
            <FaSearch className="text-xl" />
          </button>
        </div>

        {/* Profile Pictures */}
        <div className="flex items-center space-x-2">
          <img
            src="/avatar1.jpg"
            alt="Avatar 1"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          <img
            src="/avatar2.jpg"
            alt="Avatar 2"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          <img
            src="/avatar3.jpg"
            alt="Avatar 3"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Status and Response Time */}
      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold">Questions? Chat with us!</span>
        <span className="text-xs text-green-300">
          Typically replies under an hour
        </span>
      </div>
    </header>
  );
};

export default Header;
