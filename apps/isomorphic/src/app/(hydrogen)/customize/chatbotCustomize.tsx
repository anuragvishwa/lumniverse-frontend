import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  BiChevronDown,
  BiMinus,
  BiPlus,
  BiReset,
  BiSend,
} from 'react-icons/bi';
import {
  BsArrowUpCircleFill,
  BsArrowUpShort,
  BsQuestion,
  BsSendArrowUp,
  BsX,
  BsXLg,
} from 'react-icons/bs';
import {
  MdCancel,
  MdChat,
  MdOutlineCancel,
  MdOutlineSearch,
} from 'react-icons/md';
import { SiChatbot, SiHelpdesk } from 'react-icons/si';
import axios from 'axios';
import { PiFinnTheHuman, PiFinnTheHumanBold } from 'react-icons/pi';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Accordion, ActionIcon, Button, Input, Text } from 'rizzui';
import {
  Disclosure,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import {
  IoChevronDownCircleOutline,
  IoSearchCircleOutline,
} from 'react-icons/io5';
import cn from '@core/utils/class-names';
import '../integrations/[id]/chatbot.css';
import { HexColorPicker } from 'react-colorful';
import ChatSolidIcon from '@core/components/icons/chat-solid';
import './chatbot.css';
import SearchTrigger from './search/search-trigger';
import SearchWidget from './search/search';
import { FaCommentDots, FaTshirt } from 'react-icons/fa';
import Carousel from './carousel';
import { recommendationProducts } from '@/data/shop-products';
import ProductCarousel from './product-carousel';

// Define a type for the products
interface Product {
  id: string;
  name: string;
  description: string;
}

const accordionVariants = {
  open: { height: 'auto', opacity: 1 },
  closed: { height: 0, opacity: 0 },
};

interface ButtonData {
  label: string;
  value: string;
}

interface Props {
  bgColor: string;
  handleOffer: (value: string) => void;
}
// This will print your states in JSON format

const ChatbotCustomize = ({
  bgColor,
  setBgColor,
  inputRadius,
  textColor,
  setTextColor,
  imageSrc,
  contentTextColor,
  changeContentBgColor,
  isOpen,
  setIsOpen,
  selectedFont,
  height,
  borderRadius,
  chatbotTitle,
  chatbotDescription,
}: {
  inputRadius: string;
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  changeContentBgColor: string;
  imageSrc: string;
  contentTextColor: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedFont: string;
  height: string;
  borderRadius: string;
  chatbotTitle: string;
  chatbotDescription: string;
}) => {
  const jsonData = {
    chatbotTitle,
    chatbotDescription,
    bgColor,
    textColor,
    imageSrc,
    changeContentBgColor,
    contentTextColor,
    isOpen,
    height,
    borderRadius,
    inputRadius,
    selectedFont,
  };

  console.log(jsonData);
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'bot'; subData: string }[]
  >(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    try {
      return savedMessages
        ? (JSON.parse(savedMessages) as {
            text: string;
            sender: 'user' | 'bot';
            subData: string;
          }[])
        : [];
    } catch (error) {
      console.error('Failed to parse saved messages:', error);
      return [];
    }
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };
  const [input, setInput] = useState('');
  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null); // Track selected offer
  const [loading, setLoading] = useState(false);

  const handleSend = async (message: string) => {
    // If message is not provided, use the current input state
    const finalMessage = message || input;

    if (finalMessage.trim() === '') return;

    // Format timestamp to exclude seconds
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Add the user's message to the state
    setMessages((prev) => [
      ...prev,
      {
        text: finalMessage,
        sender: 'user',
        subData: '', // Add `subData`, can be an empty string or other relevant data
        time: timestamp,
      },
    ]);

    setInput(''); // Clear input if using direct message
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post('/api/query', {
        query: finalMessage,
        user_id: '66096695',
      });

      if (response.status === 200 && response.data) {
        const botResponse = response.data; // Assuming response.data contains the bot's response
        const botTimestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        // Add the bot's response to the state
        setMessages((prev) => [
          ...prev,
          {
            text: botResponse,
            sender: 'bot',
            subData: '', // Can be filled with relevant bot data
            time: botTimestamp,
          },
        ]);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error: Could not get a response from the bot. Please try again later.',
          sender: 'bot',
          subData: '', // Add subData for error message
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleOffer = (offerType: string) => {
    const offerTimestamp = new Date().toLocaleTimeString();

    // Add user message with subData (use empty string if not relevant)
    setMessages((prev) => [
      ...prev,
      { text: offerType, sender: 'user', time: offerTimestamp, subData: '' }, // Corrected sender to 'user'
    ]);

    const botResponse = `Sure, what are you interested in?`;
    const botTimestamp = new Date().toLocaleTimeString();

    // Add bot response with subData (empty string if not relevant)
    setMessages((prev) => [
      ...prev,
      { text: botResponse, sender: 'bot', time: botTimestamp, subData: '' }, // Corrected sender to 'bot'
    ]);

    // Accordion messages for bot with subData
    const accordionMessages: {
      subData: string;
      sender: 'bot';
      time: string;
      text: string;
    }[] = [
      {
        subData: "Men's Fashions",
        sender: 'bot',
        time: botTimestamp,
        text: '',
      },
      {
        subData: "Women's Special Fashions",
        sender: 'bot',
        time: botTimestamp,
        text: '',
      },
      {
        subData: 'Summer Special',
        sender: 'bot',
        time: botTimestamp,
        text: '',
      },
    ];

    // Append accordion messages
    setMessages((prev) => [...prev, ...accordionMessages]);

    setSelectedOffer(offerType);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);

  const [hoverStates, setHoverStates] = useState<Record<number, boolean>>({});

  const buttonData: ButtonData[] = [
    { label: 'Track my order', value: 'track_my_order' },
    { label: 'Request, Return & Exchange', value: 'request_return' },
    { label: 'Return & Refund Status', value: 'return_status' },
    { label: 'Cancel Order', value: 'cancel_order' },
    { label: 'Check warranty', value: 'check_warranty' },
  ];

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => ({ ...prev, [index]: false }));
  };

  const [showMore, setShowMore] = useState(false); // State to track the visibility of the button group
  // const [hoverStates, setHoverStates] = useState(
  //   new Array(buttonData.length).fill(false)
  // );

  // Handle mouse enter and leave for hover effect
  // const handleMouseEnter = (index) => {
  //   const newHoverStates = [...hoverStates];
  //   newHoverStates[index] = true;
  //   setHoverStates(newHoverStates);
  // };

  // const handleMouseLeave = (index) => {
  //   const newHoverStates = [...hoverStates];
  //   newHoverStates[index] = false;
  //   setHoverStates(newHoverStates);
  // };

  return (
    <div style={{ fontFamily: selectedFont }} className={`col-span-2.5 w-full`}>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl"
          >
            <TabGroup>
              <TabList
                className={`relative flex rounded-t-[${borderRadius}] items-start py-1 ${
                  bgColor.startsWith('bg-') ? bgColor : ''
                }`}
                style={{
                  backgroundColor: !bgColor.startsWith('bg-') ? bgColor : '',
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                }}
              >
                <div className="flex flex-col gap-2">
                  <Tab
                    className="flex items-start gap-2 rounded-xl px-6 py-1 text-white"
                    style={{ color: textColor }}
                  >
                    <img
                      src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                      className="h-9 w-9 rounded-full bg-white p-1 text-gray-900"
                      alt="Bot Avatar"
                    />

                    <span className="flex flex-col items-start justify-center px-2">
                      <span className="text-[0.9rem]">{chatbotTitle}</span>
                      <span className="text-[0.7rem] font-normal">
                        {chatbotDescription}
                      </span>
                    </span>
                  </Tab>
                </div>
                <div className="absolute right-0 top-3">
                  <div className="flex items-center justify-end gap-1 pr-2 text-white">
                    <SearchWidget />
                    <ActionIcon
                      variant="text"
                      aria-label="Search"
                      className="font-bold text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <BsXLg className="me-2 h-[18px] w-[18px] font-bold" />
                    </ActionIcon>
                  </div>
                </div>

                {/* <button
                  className="absolute right-6 top-3 text-2xl text-white hover:text-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
           
                </button> */}
              </TabList>

              <TabPanels
                className={`relative rounded-bl-xl rounded-br-xl p-1 ${
                  bgColor.startsWith('bg-') ? bgColor : ''
                }`}
                style={{
                  backgroundColor: !bgColor.startsWith('bg-') ? bgColor : '',
                }}
              >
                <TabPanel
                  className={`relative rounded-lg bg-white p-2 ${
                    changeContentBgColor.startsWith('bg-')
                      ? changeContentBgColor
                      : ''
                  }`}
                  style={{
                    backgroundColor: !changeContentBgColor.startsWith('bg-')
                      ? changeContentBgColor
                      : '',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className={`flex flex-col rounded-md`}
                      style={{ height: `${height}px` }}
                    >
                      <div className="flex flex-1 flex-col space-y-2 overflow-y-auto p-3">
                        <div
                          className={`chat-message flex max-w-xs items-end gap-2 self-start rounded-lg`}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                              className="h-7 w-7 rounded-full bg-white p-1 text-gray-900"
                            />{' '}
                          </div>
                          <div
                            className={`rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-900`}
                          >
                            Hello! How can I help you?
                          </div>
                        </div>
                        <div className="flex-row-2 ml-8 mt-4 flex flex-wrap gap-2">
                          <Button
                            rounded="pill"
                            size="sm"
                            onMouseEnter={() => {
                              setIsHovered(true);
                            }}
                            onMouseLeave={() => {
                              setIsHovered(false);
                            }}
                            className={`mt-2 px-3 py-1.5 transition-all duration-300 ${
                              bgColor === 'bg-orange-500' && isHovered
                                ? 'btn-hover-orange'
                                : bgColor === 'bg-green-500' && isHovered
                                  ? 'btn-hover-green'
                                  : bgColor === 'bg-blue-500' && isHovered
                                    ? 'btn-hover-blue'
                                    : bgColor === 'bg-gray-500' && isHovered
                                      ? 'btn-hover-gray'
                                      : isHovered
                                        ? `${bgColor.startsWith('bg-') ? bgColor : ''} text-white`
                                        : `border-2 border-blue-200 ${bgColor.startsWith('bg-') ? bgColor : ''} bg-clip-text text-transparent`
                            }`}
                            style={{
                              backgroundColor: !bgColor.startsWith('bg-')
                                ? bgColor
                                : '',
                            }}
                            onClick={() => handleOffer('Special Offers')}
                          >
                            Special Offer
                          </Button>

                          <Button
                            rounded="lg"
                            onMouseEnter={() => {
                              setIsHovered2(true);
                            }}
                            onMouseLeave={() => {
                              setIsHovered2(false);
                            }}
                            className={`mt-2 flex items-center gap-1 px-3 py-1.5 transition-all duration-300 ${
                              bgColor === 'bg-orange-500' && isHovered2
                                ? 'btn-hover-orange'
                                : bgColor === 'bg-green-500' && isHovered2
                                  ? 'btn-hover-green'
                                  : bgColor === 'bg-blue-500' && isHovered2
                                    ? 'btn-hover-blue'
                                    : bgColor === 'bg-gray-500' && isHovered2
                                      ? 'btn-hover-gray'
                                      : isHovered2
                                        ? `${bgColor.startsWith('bg-') ? bgColor : ''} text-white`
                                        : `border-2 border-blue-200 ${bgColor.startsWith('bg-') ? bgColor : ''} bg-clip-text text-transparent`
                            }`}
                            style={{
                              backgroundColor: !bgColor.startsWith('bg-')
                                ? bgColor
                                : '',
                            }}
                            size="sm"
                            onClick={() => handleOffer('Summer Outfits')}
                          >
                            <FaTshirt className="h-5 w-5" /> Summer Outfits
                          </Button>
                          <Button
                            rounded="pill"
                            onMouseEnter={() => {
                              setIsHovered3(true);
                            }}
                            onMouseLeave={() => {
                              setIsHovered3(false);
                            }}
                            className={`mt-2 px-3 py-1.5 transition-all duration-300 ${
                              bgColor === 'bg-orange-500' && isHovered3
                                ? 'btn-hover-orange'
                                : bgColor === 'bg-green-500' && isHovered3
                                  ? 'btn-hover-green'
                                  : bgColor === 'bg-blue-500' && isHovered3
                                    ? 'btn-hover-blue'
                                    : bgColor === 'bg-gray-500' && isHovered3
                                      ? 'btn-hover-gray'
                                      : isHovered3
                                        ? `${bgColor.startsWith('bg-') ? bgColor : ''} text-white`
                                        : `border-2 border-blue-200 ${bgColor.startsWith('bg-') ? bgColor : ''} bg-clip-text text-transparent`
                            }`}
                            style={{
                              backgroundColor: !bgColor.startsWith('bg-')
                                ? bgColor
                                : '',
                            }}
                            size="sm"
                            onClick={() => handleOffer('Buy a Giftcard')}
                          >
                            Buy a Giftcard
                          </Button>
                          <Button
                            rounded="pill"
                            onMouseEnter={() => {
                              setIsHovered4(true);
                            }}
                            onMouseLeave={() => {
                              setIsHovered4(false);
                            }}
                            className={`mt-2 px-3 py-1.5 transition-all duration-300 ${
                              bgColor === 'bg-orange-500' && isHovered4
                                ? 'btn-hover-orange'
                                : bgColor === 'bg-green-500' && isHovered4
                                  ? 'btn-hover-green'
                                  : bgColor === 'bg-blue-500' && isHovered4
                                    ? 'btn-hover-blue'
                                    : bgColor === 'bg-gray-500' && isHovered4
                                      ? 'btn-hover-gray'
                                      : isHovered4
                                        ? `${bgColor.startsWith('bg-') ? bgColor : ''} text-white`
                                        : `border-2 border-blue-200 ${bgColor.startsWith('bg-') ? bgColor : ''} bg-clip-text text-transparent`
                            }`}
                            style={{
                              backgroundColor: !bgColor.startsWith('bg-')
                                ? bgColor
                                : '',
                            }}
                            onClick={() => handleOffer('New Collection')}
                            size="sm"
                          >
                            New Collection
                          </Button>

                          <Button
                            rounded="pill"
                            size="sm"
                            onClick={() => setShowMore(!showMore)}
                            onMouseEnter={() => {
                              setIsHovered5(true);
                            }}
                            onMouseLeave={() => {
                              setIsHovered5(false);
                            }}
                            className={`mt-2 px-3 py-1.5 transition-all duration-300 ${
                              bgColor === 'bg-orange-500' && isHovered5
                                ? 'btn-hover-orange'
                                : bgColor === 'bg-green-500' && isHovered5
                                  ? 'btn-hover-green'
                                  : bgColor === 'bg-blue-500' && isHovered5
                                    ? 'btn-hover-blue'
                                    : bgColor === 'bg-gray-500' && isHovered5
                                      ? 'btn-hover-gray'
                                      : isHovered5
                                        ? `${bgColor.startsWith('bg-') ? bgColor : ''} text-white`
                                        : `border-2 border-blue-200 ${bgColor.startsWith('bg-') ? bgColor : ''} bg-clip-text text-transparent`
                            }`}
                            style={{
                              backgroundColor: !bgColor.startsWith('bg-')
                                ? bgColor
                                : '',
                            }}
                          >
                            {showMore ? 'Show Less' : 'Show More'}
                          </Button>
                        </div>

                        <div className="mb-4">
                          {showMore && (
                            <div className="ml-8 mt-2 flex flex-col gap-2">
                              {' '}
                              {/* Use flex-col for vertical stacking */}
                              {buttonData.map((button, index) => (
                                <Button
                                  key={index}
                                  rounded="pill"
                                  size="sm"
                                  onMouseEnter={() => handleMouseEnter(index)}
                                  onMouseLeave={() => handleMouseLeave(index)}
                                  className={`mt-2 px-3 py-1.5 transition-all duration-300 ${
                                    bgColor === 'bg-orange-500' &&
                                    hoverStates[index]
                                      ? 'btn-hover-orange'
                                      : bgColor === 'bg-green-500' &&
                                          hoverStates[index]
                                        ? 'btn-hover-green'
                                        : bgColor === 'bg-blue-500' &&
                                            hoverStates[index]
                                          ? 'btn-hover-blue'
                                          : bgColor === 'bg-gray-500' &&
                                              hoverStates[index]
                                            ? 'btn-hover-gray'
                                            : hoverStates[index]
                                              ? `${bgColor.startsWith('bg-') ? bgColor : ''} text-white`
                                              : `border-2 border-blue-200 ${
                                                  bgColor.startsWith('bg-')
                                                    ? bgColor
                                                    : ''
                                                } bg-clip-text text-transparent`
                                  }`}
                                  style={{
                                    backgroundColor: !bgColor.startsWith('bg-')
                                      ? bgColor
                                      : '',
                                    width: 'auto', // Ensure button width is auto (adjust based on content)
                                  }}
                                  onClick={() => handleOffer(button.value)}
                                >
                                  {button.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* <ProductCarousel
                          title={''}
                          data={recommendationProducts}
                          bgColor={bgColor}
                          setBgColor={setBgColor}
                          textColor={textColor}
                          setTextColor={setTextColor}
                          imageSrc={imageSrc}
                          changeContentBgColor={changeContentBgColor}
                          contentTextColor={contentTextColor}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          selectedFont={selectedFont}
                          height={height}
                          borderRadius={borderRadius}
                          inputRadius={inputRadius}
                        /> */}

                        {messages.map((msg: any, index: number) => {
                          const isAccordionTitle = [
                            "Men's Fashions",
                            "Women's Special Fashions",
                            'Summer Special',
                          ].includes(msg.subData);
                          return (
                            <div
                              key={index}
                              className={`chat-message ${msg.sender === 'user' ? 'self-end text-white' : ''} max-w-xs rounded-lg`}
                            >
                              {msg.sender === 'bot' && !isAccordionTitle && (
                                <div className="flex items-start gap-2">
                                  <img
                                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                                    className="h-7 w-7 rounded-full bg-white p-1 text-gray-900"
                                  />
                                  <div className="mt-2 bg-white text-xs text-gray-500">
                                    {msg.time}
                                  </div>
                                </div>
                              )}
                              {!isAccordionTitle && (
                                <div>
                                  <div
                                    className={`${
                                      msg.sender === 'user'
                                        ? `${
                                            bgColor.startsWith('bg-')
                                              ? bgColor // Apply Tailwind background color class if it's prefixed with "bg-"
                                              : 'bg-indigo-600' // Fallback Tailwind class for when bgColor is a hex code
                                          } text-white`
                                        : ''
                                    } rounded-lg px-3 py-1.5 text-sm`}
                                    style={{
                                      backgroundColor:
                                        msg.sender === 'user' &&
                                        !bgColor.startsWith('bg-')
                                          ? bgColor // Apply hex color as inline style if bgColor is not a Tailwind class
                                          : '',
                                    }}
                                  >
                                    {typeof msg.text === 'string' ? (
                                      msg.text
                                    ) : (
                                      <Carousel message={msg} />
                                    )}
                                  </div>
                                </div>
                              )}

                              {isAccordionTitle && (
                                <div className="mx-8 border-b-2 border-gray-300 last:border-b-0">
                                  <Button
                                    rounded="pill"
                                    className="mt-2 border-2 border-blue-200 bg-white bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text px-3 py-1.5 text-transparent"
                                    size="sm"
                                    onClick={() => handleSend(msg.subData)}
                                  >
                                    {msg.subData}
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* {messages.map((msg: any, index: number) => {
                          const isAccordionTitle = [
                            "Men's Fashions",
                            "Women's Special Fashions",
                            'Summer Special',
                          ].includes(msg.subData);
                          return (
                            <div
                              key={index}
                              className={`chat-message ${msg.sender === 'user' ? 'self-end text-white' : ''} max-w-xs rounded-lg`}
                            >
                              {!isAccordionTitle && (
                                <div>
                                  <div
                                    className={`${
                                      msg.sender === 'user'
                                        ? `${
                                            bgColor.startsWith('bg-')
                                              ? bgColor // Apply Tailwind background color class if it's prefixed with "bg-"
                                              : '' // Fallback Tailwind class for when bgColor is a hex code
                                          } text-white`
                                        : ''
                                    } rounded-lg px-3 py-1.5 text-sm`}
                                  >
                                    {typeof msg.text === 'string' ? (
                                      msg.text
                                    ) : (
                                      <Carousel message={msg} />
                                    )}
                                  </div>

                                  <div className="mt-2 bg-white text-xs text-gray-500">
                                    {msg.time}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })} */}
                        {loading && (
                          <div className="chat-message flex items-center gap-2 rounded-lg">
                            <div className="flex-shrink-0">
                              <div className="icon rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 p-2 text-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="h-6 w-6 animate-pulse"
                                >
                                  <rect
                                    x="5"
                                    y="5"
                                    width="3"
                                    height="10"
                                    className="fill-current"
                                  >
                                    <animate
                                      attributeName="height"
                                      values="10; 15; 10"
                                      dur="1s"
                                      repeatCount="indefinite"
                                    />
                                  </rect>
                                  <rect
                                    x="10"
                                    y="5"
                                    width="3"
                                    height="10"
                                    className="fill-current"
                                  >
                                    <animate
                                      attributeName="height"
                                      values="10; 15; 10"
                                      dur="1s"
                                      repeatCount="indefinite"
                                      begin="0.2s"
                                    />
                                  </rect>
                                  <rect
                                    x="15"
                                    y="5"
                                    width="3"
                                    height="10"
                                    className="fill-current"
                                  >
                                    <animate
                                      attributeName="height"
                                      values="10; 15; 10"
                                      dur="1s"
                                      repeatCount="indefinite"
                                      begin="0.4s"
                                    />
                                  </rect>
                                </svg>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <span>Thinking</span>
                              <span className="dot1 animate-bounce">.</span>
                              <span className="dot2 animate-bounce delay-200">
                                .
                              </span>
                              <span className="dot3 delay-400 animate-bounce">
                                .
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="relative mt-4">
                          <div className="scrollbar-hide flex overflow-x-auto">
                            {products.length > 0 &&
                              products.map((product) => (
                                <div
                                  key={product.id}
                                  className="m-2 w-64 flex-shrink-0 rounded-lg border border-gray-300 bg-white p-4 shadow transition-shadow duration-200 hover:shadow-lg"
                                >
                                  <h3 className="text-lg font-semibold">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Product ID: {product.id}
                                  </p>
                                  <p className="mt-1 text-gray-700">
                                    {product.description}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`mt-2 rounded-${inputRadius} border-2 ${bgColor.startsWith('bg-') ? bgColor.replace('bg-', 'border-') : 'border-blue-200'} bg-gray-200 bg-clip-text px-3 py-1 text-transparent`}
                      >
                        <div className="flex gap-2">
                          <input
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className={`flex-1 rounded-full border-none text-xs text-gray-500 outline-none focus:ring-0`}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />

                          <button
                            className={`${
                              bgColor.startsWith('bg-') ? bgColor : ''
                            } rounded-full px-2 py-1.5 text-sm font-bold text-white transition duration-300 ease-in-out`}
                            style={{
                              backgroundColor: !bgColor.startsWith('bg-')
                                ? bgColor
                                : '',
                            }}
                            onClick={() => handleSend(input)}
                          >
                            {/* <BsArrowUpShort className="h-5 w-5" /> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="white"
                              className="bi bi-arrow-up-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <Text className="flex items-center justify-center py-2 text-center text-sm font-medium text-gray-400">
                        <span className="text-[0.6rem]">Powered by</span>{' '}
                        <span className="ml-2 flex items-center justify-center gap-2">
                          <ChatSolidIcon className="mt-2 h-5 w-5" /> Lumniverse
                        </span>
                      </Text>
                    </div>
                  </motion.div>
                </TabPanel>
                <TabPanel className="gradient-border-1">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex h-[400px] flex-col overflow-hidden rounded-t-md">
                      <div className="flex-1 space-y-2 overflow-y-auto p-5">
                        {[
                          'Get Started with help of',
                          'Billing and plans guide',
                          'Enable External Forwarding',
                          'Get Started with help of',
                          'Billing and plans guide',
                          'Enable External Forwarding',
                          'Get Started with help of',
                          'Billing and plans guide',
                          'Enable External Forwarding',
                        ].map((section) => (
                          <Disclosure
                            key={section}
                            as="div"
                            className="border-b last:border-b-0"
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex w-full items-center gap-4 py-4 text-left text-sm font-medium text-gray-900">
                                  {open ? (
                                    <BiMinus className="h-5 w-5 text-blue-500 transition-transform duration-200" />
                                  ) : (
                                    <BiPlus className="h-5 w-5 text-blue-500 transition-transform duration-200" />
                                  )}
                                  <span>{section}</span>
                                </Disclosure.Button>
                                <AnimatePresence>
                                  {open && (
                                    <motion.div
                                      initial="closed"
                                      animate="open"
                                      exit="closed"
                                      variants={accordionVariants}
                                      transition={{ duration: 0.3 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-4 pb-4 text-sm text-gray-500">
                                        This is the content for {section}. You
                                        can put any information here.
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabPanel>
                <TabPanel>
                  <div className="flex h-[400px] flex-col rounded-t-md">
                    Content for Another Tab
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ChatbotCustomize;
