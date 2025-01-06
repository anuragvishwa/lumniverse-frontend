import {
  FaChevronDown,
  FaChevronLeft,
  FaEllipsisV,
  FaHandPaper,
} from 'react-icons/fa';
import './chatbot.css';

const Header = () => {
  return (
    <div className="relative">
      {/* Header content */}
      <div
        className="relative w-80 overflow-hidden rounded-t-xl bg-blue-600 p-4 pr-8 text-white shadow-md"
        style={{
          clipPath: 'path("M 0 0 H 300 V 70 Q 150 100 0 70 Z")',
        }}
      >
        {/* Icons and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Left Arrow Icon */}
            <FaChevronLeft className="text-white" />

            {/* Title with Wave Icon */}
            <h2 className="flex items-center font-bold">
              Hi there!
              <FaHandPaper className="ml-1" />
            </h2>
          </div>

          {/* Options Icon */}
          <FaEllipsisV />
        </div>

        {/* Body Content */}
        <p className="mt-2">
          Lyro AI is here to help while our CS team is offline. We’ll follow up
          via email.
        </p>

        {/* Dropdown Arrow */}
        <FaChevronDown className="absolute bottom-2 right-4" />
      </div>
    </div>
  );
};

export default Header;
