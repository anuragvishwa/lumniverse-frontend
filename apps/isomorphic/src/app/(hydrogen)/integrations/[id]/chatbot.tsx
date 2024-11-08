import { useEffect, useRef, useState } from 'react';
import {
  BiChevronDown,
  BiMinus,
  BiPlus,
  BiReset,
  BiSend,
} from 'react-icons/bi';
import { BsArrowUpShort, BsQuestion, BsSendArrowUp } from 'react-icons/bs';
import { MdChat, MdFormatQuote } from 'react-icons/md';
import { SiChatbot, SiHelpdesk } from 'react-icons/si';
import axios from 'axios';
import { PiFinnTheHuman, PiFinnTheHumanBold } from 'react-icons/pi';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Accordion, Button, Input, Text } from 'rizzui';
import {
  Disclosure,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { IoChevronDownCircleOutline, IoSend } from 'react-icons/io5';
import cn from '@core/utils/class-names';
import './chatbot.css';
import ChatSolidIcon from '@core/components/icons/chat-solid';

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

const Chatbot = () => {
  const [messages, setMessages] = useState<
    {
      text: string;
      sender: 'user' | 'bot';
      subData: string;
      time: string; // New key for the timestamp
    }[]
  >(() => {
    const savedMessages = localStorage.getItem('chatMessages');

    return savedMessages
      ? JSON.parse(savedMessages).map((message: any) => ({
          ...message,
          time: message.time || new Date().toISOString(),
        }))
      : ([] as {
          text: string;
          sender: 'user' | 'bot';
          subData: string;
          time: string;
        }[]);
  });

  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null); // Track selected offer
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (message: string) => {
    // If message is not provided, use the current input state
    const finalMessage = message || input;

    if (finalMessage.trim() === '') return;

    // Format timestamp to exclude seconds
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setMessages((prev) => [
      ...prev,
      { text: finalMessage, sender: 'user', time: timestamp },
    ]);

    setInput(''); // Clear input if using direct message
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post('/api/chat', { message: finalMessage });

      if (response.status === 200 && response.data) {
        const botResponse = response.data; // Assuming response.data contains the bot's response
        const botTimestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        setMessages((prev) => [
          ...prev,
          { text: botResponse, sender: 'bot', time: botTimestamp },
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

  const handleReset = async () => {
    const resetTimestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [
      ...prev,
      { text: 'Resetting chat...', sender: 'user', time: resetTimestamp },
    ]);

    try {
      const response = await axios.post('/api/chat', { message: 'reset' });
      if (response.status === 200) {
        const botTimestamp = new Date().toLocaleTimeString();
        setMessages((prev) => [
          ...prev,
          { text: response.data.response, sender: 'bot', time: botTimestamp },
        ]);
      }
    } catch (error) {
      console.error('Error sending reset message:', error);
    }
  };

  const handleOffer = (offerType: string) => {
    const offerTimestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [
      ...prev,
      { text: offerType, sender: 'user', time: offerTimestamp },
    ]);

    const botResponse = `Sure, what are you interested in?`;
    const botTimestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [
      ...prev,
      { text: botResponse, sender: 'bot', time: botTimestamp },
    ]);

    const accordionMessages = [
      { subData: "Men's Fashions", sender: 'bot', time: botTimestamp },
      {
        subData: "Women's Special Fashions",
        sender: 'bot',
        time: botTimestamp,
      },
      { subData: 'Summer Special', sender: 'bot', time: botTimestamp },
    ];

    setMessages((prev) => [...prev, ...accordionMessages]);
    setSelectedOffer(offerType);
  };

  // const carouselRef = useRef<HTMLDivElement | null>(null);

  // const scrollLeft = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  //   }
  // };

  // const scrollRight = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  //   }
  // };

  return (
    <div className="relative">
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 right-0 z-[9999] mb-0 h-screen w-full rounded-2xl border border-gray-300 bg-white bg-opacity-30 shadow-lg backdrop-blur-lg @2xl:bottom-16 @2xl:right-8 @2xl:mb-96 @2xl:w-96 sm:bottom-16 sm:right-8 sm:mb-96 sm:h-[150px] sm:w-96"
            // className="fixed bottom-0 right-0 z-[9999] mb-0 h-screen w-full rounded-2xl border border-gray-300 bg-white bg-opacity-30 shadow-lg backdrop-blur-lg"
          >
            <TabGroup>
              <TabList className="relative flex items-start rounded-t-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-1">
                <div className="flex flex-col gap-2">
                  <Tab className="flex items-start gap-2 rounded-xl px-6 py-1 font-semibold text-white">
                    <img
                      src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                      className="h-9 w-9 rounded-full bg-white p-1 text-gray-900"
                      alt="Bot Avatar"
                    />

                    <span className="flex flex-col items-start justify-center px-2">
                      <span className="text-[0.9rem]">Lumi</span>
                      <span className="text-[0.7rem] font-normal">
                        You can ask me anything.
                      </span>
                    </span>
                  </Tab>
                </div>

                <button
                  className="absolute right-6 top-3 text-2xl text-white hover:text-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                  {/* This is the 'X' symbol, you can also use an icon here */}
                </button>
              </TabList>

              <TabPanels className="gradient-border bg-gradient-to-r from-violet-600 to-indigo-600">
                <TabPanel className="gradient-border-1">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex h-screen flex-col rounded-md sm:h-[400px]">
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
                            className="border-gradient-to-r mt-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                            size="sm"
                            onClick={() => handleOffer('Special Offers')}
                          >
                            Special Offer
                          </Button>

                          <Button
                            rounded="pill"
                            className="border-gradient-to-r mt-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                            size="sm"
                            onClick={() => handleOffer('Summer Outfits')}
                          >
                            Summer Outfits
                          </Button>
                          <Button
                            rounded="pill"
                            className="border-gradient-to-r mt-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                            size="sm"
                            onClick={() => handleOffer('Buy a Giftcard')}
                          >
                            Buy a Giftcard
                          </Button>
                          <Button
                            rounded="pill"
                            className="border-gradient-to-r mt-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                            size="sm"
                            onClick={() => handleOffer('New Collection')}
                          >
                            New Collection
                          </Button>
                        </div>

                        {/* {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`chat-message ${msg.sender === 'user' ? 'self-end bg-blue-500 text-white' : 'flex items-start gap-2 self-start'} max-w-xs rounded-lg`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="flex-shrink-0">
                              <img
                                src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                                className="h-7 w-7 rounded-full bg-white p-1 text-gray-900"
                              />{' '}
                            </div>
                          )}
                          <div
                            className={`${msg.sender === 'user' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 text-sm`}
                          >
                            {typeof msg.text === 'string'
                              ? msg.text
                              : msg.text.response}
                          </div>
                        </div>
                      ))} */}

                        {messages.map((msg: any, index: number) => {
                          const isAccordionTitle = [
                            "Men's Fashions",
                            "Women's Special Fashions",
                            'Summer Special',
                          ].includes(msg.subData);
                          console.log(messages, 'messages');
                          return (
                            <div
                              key={index}
                              className={`chat-message ${msg.sender === 'user' ? 'self-end text-white' : 'flex items-end gap-2 self-start'} max-w-xs rounded-lg`}
                            >
                              {msg.sender === 'bot' && !isAccordionTitle && (
                                <div className="flex-shrink-0">
                                  <img
                                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                                    className="h-7 w-7 rounded-full bg-white p-1 text-gray-900"
                                  />
                                </div>
                              )}
                              {!isAccordionTitle && (
                                <div>
                                  <div
                                    className={`${msg.sender === 'user' ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-1.5 text-sm`}
                                  >
                                    {typeof msg.text === 'string'
                                      ? msg.text
                                      : msg?.text?.response}
                                  </div>
                                  <div className="mt-2 bg-white text-xs text-gray-500">
                                    {msg.time}
                                  </div>
                                </div>
                              )}

                              {isAccordionTitle && (
                                <div className="mx-8 border-b-2 border-gray-300 last:border-b-0">
                                  <Button
                                    rounded="pill"
                                    className="mt-2 border-2 border-blue-200 bg-white bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text px-3 py-1.5 text-transparent"
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

                        {loading && (
                          <div
                            className={`chat-message flex max-w-xs items-start gap-2 rounded-lg`}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp"
                                className="h-7 w-7 rounded-full bg-white p-1 text-gray-900"
                              />
                            </div>
                            <div className="flex items-start">
                              <div className="flex space-x-2">
                                <div className="animate-bounce bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text px-1 text-2xl text-transparent">
                                  .
                                </div>
                                <div className="animate-bounce bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text px-1 text-2xl text-transparent">
                                  .
                                </div>
                                <div className="animate-bounce bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text px-1 text-2xl text-transparent">
                                  .
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="relative mt-4">
                          {/* Left Scroll Button */}
                          {/* <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-300 p-2"
                >
                  &#10094;
                </button> */}

                          {/* Carousel Container */}
                          <div
                            // ref={carouselRef}
                            className="scrollbar-hide flex overflow-x-auto"
                          >
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

                          {/* Right Scroll Button */}
                          {/* <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-300 p-2"
                >
                  &#10095;
                </button> */}
                        </div>
                      </div>
                      <div
                        className={`mt-2 rounded-full border-2 bg-gray-200 bg-clip-text px-3 py-1 text-transparent`}
                      >
                        <div className="flex gap-2">
                          <input
                            placeholder="Type your message..."
                            className="flex-1 rounded-full border-none text-xs text-gray-500 outline-none focus:ring-0"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                          <button
                            onClick={() => handleSend(input)}
                            className="rounded-full border-2 px-3 py-1.5 text-sm font-bold text-indigo-600 transition duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                          >
                            <BsArrowUpShort className="h-5 w-5" />
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

      <button
        className="fixed bottom-6 right-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-lg transition-transform hover:scale-105"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle chat visibility
      >
        <MdChat className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Chatbot;
