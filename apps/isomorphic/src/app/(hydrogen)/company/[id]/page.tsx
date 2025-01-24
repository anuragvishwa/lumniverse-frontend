'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Burn from '@/app/shared/financial/dashboard/burn';
import Spending from '@/app/shared/financial/dashboard/spending';
import Exchange from '@/app/shared/financial/dashboard/exchange';
import CashFlow from '@/app/shared/financial/dashboard/cash-flow';
import Investment from '@/app/shared/financial/dashboard/investment/investment';
import CashInBank from '@/app/shared/financial/dashboard/cash-in-bank';
import BudgetStatus from '@/app/shared/financial/dashboard/budget-status';
import FinancialStats from '@/app/shared/financial/dashboard/transaction-states';
import ExpenseHistory from '@/app/shared/financial/dashboard/expense-history';
import TotalStatistics from '@/app/shared/financial/dashboard/total-statistics';
import TransactionHistoryTable from '@/app/shared/financial/dashboard/transaction-history-table';
import IncomeStatement from '@/app/shared/financial/dashboard/income-statement';
import Chatbot from '@/app/(hydrogen)/integrations/[id]/chatbot';
import ChatbotCustomize from '@/app/(hydrogen)/customize/chatbotCustomize';
import { AnimatePresence, motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import SocialFollowers from '@/app/shared/executive/social-followers';
import StyleCard from '@/app/(hydrogen)/customize/styleCard';
import { MdChat, MdKeyboardArrowUp } from 'react-icons/md';
import '@/app/(hydrogen)/customize/chatbot.css';
import { Button, Text, Title } from 'rizzui';
import CardsPage from '@/app/(hydrogen)/widgets/cards/page';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi2';
import NotFound from '@/app/not-found';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const CompanyDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isVisible, setIsVisible] = useState(true); // Control visibility
  const [chatbotTitle, setChatbotTitle] = useState(params.id.toUpperCase());
  const [chatbotDescription, setChatbotDescription] = useState(
    'You can ask me anything.'
  );

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const [bgColor, setBgColor] = useState(
    'bg-gradient-to-r from-violet-600 to-indigo-600'
  );

  const [textColor, setTextColor] = useState('text-white');

  const [imageSrc, setImageSrc] = useState(
    'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-07.webp'
  );

  const [changeContentBgColor, setChangeContentBgColor] = useState('bg-white');

  const [contentTextColor, setContentTextColor] = useState('text-white');

  const [buttonShape, setButtonShape] = useState('rounded');
  const [isOpen, setIsOpen] = useState(true);

  const [badgeTop, setBadgeTop] = useState(
    'bg-gradient-to-r from-violet-600 to-indigo-600'
  );
  const [badgeBottom, setBadgeBottom] = useState('to-indigo-600');
  const [height, setHeight] = useState('550');
  const [borderRadius, setBorderRadius] = useState('0.5rem');
  const [inputRadius, setInputRadius] = useState('full');

  const [chatbotAlignMent, setChatbotAlignment] = useState('right');

  const fonts = [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Lucida Console',
    'Comic Sans MS',
    'Impact',
  ];

  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  // Handle font change
  const handleFontChange = (event: any) => {
    setSelectedFont(event.target.value);
  };

  const chatbotConfig = {
    isVisible: isVisible,
    chatbotTitle: chatbotTitle,
    chatbotDescription: chatbotDescription,
    bgColor: bgColor,
    textColor: textColor,
    imageSrc: imageSrc,
    changeContentBgColor: changeContentBgColor,
    contentTextColor: contentTextColor,
    buttonShape: buttonShape,
    isOpen: isOpen,
    badgeTop: badgeTop,
    badgeBottom: badgeBottom,
    height: height,
    borderRadius: borderRadius,
    inputRadius: inputRadius,
    chatbotAlignMent: chatbotAlignMent,
    selectedFont: selectedFont,
    fonts: fonts,
  };
  const [company, setCompany] = useState<string[]>([]); // Initialize as an empty array

  const [isValidCompany, setIsValidCompany] = useState(false); // Track if the current `params.id` is valid

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get('/api/companies');
        const data: string[] = response.data.companies || []; // Ensure we get an array of strings
        setCompany(data);

        // Check if the `params.id` exists in the list of companies
        setIsValidCompany(data.includes(params.id));
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [params.id]);

  if (!isValidCompany) {
    return <NotFound />;
  }

  console.log(company, 'name');

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Title as="h4" className="capitalize">
          {params.id.charAt(0).toUpperCase() + params.id.slice(1).toLowerCase()}
        </Title>
      </div>
      <Text as="span" className="font-semibold text-gray-400">
        Easily personalize your chatbot&apos;s look in just a few clicks.
      </Text>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mt-6 grid grid-cols-10 gap-6 @container">
          <div className="col-span-6">
            <StyleCard
              bgColor={bgColor}
              setBgColor={setBgColor}
              textColor={textColor}
              setTextColor={setTextColor}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              changeContentBgColor={changeContentBgColor}
              setChangeContentBgColor={setChangeContentBgColor}
              buttonShape={buttonShape}
              setButtonShape={setButtonShape}
              setIsToggle={setIsOpen}
              setBadgeBottom={setBadgeBottom}
              setBadgeTop={setBadgeTop}
              badgeTop={badgeTop}
              badgeBottom={badgeBottom}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              setHeight={setHeight}
              height={height}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
              inputRadius={inputRadius}
              setInputRadius={setInputRadius}
              chatbotTitle={chatbotTitle}
              chatbotDescription={chatbotDescription}
              setChatbotTitle={setChatbotTitle}
              setChatbotDescription={setChatbotDescription}
              chatbotAlignMent={chatbotAlignMent}
              setChatbotAlignment={setChatbotAlignment}
            />
          </div>
          <div className="w-[400px]">
            <ChatbotCustomize
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
              chatbotTitle={chatbotTitle}
              chatbotDescription={chatbotDescription}
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {buttonShape === 'rounded' && !isOpen ? (
          <div className={`fixed bottom-6 ${chatbotAlignMent}-8 z-[9999]`}>
            <div className="rounded-full p-4">
              {badgeTop === 'bg-black' ? (
                <div className="animate-rgb-background absolute inset-0 rounded-full blur-lg"></div>
              ) : null}

              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4 }}
                className={`rounded-full ${
                  badgeTop.startsWith('bg-') ? badgeTop : ''
                } p-4 text-white shadow-md`}
                style={{
                  backgroundColor: !badgeTop.startsWith('bg-') ? badgeTop : '',
                  backdropFilter: badgeTop === 'bg-black' ? 'blur(10px)' : '',
                }}
                onClick={() => setIsOpen((prev) => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdChat className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        ) : buttonShape === 'rectangle' ? (
          <div className={`fixed bottom-0 ${chatbotAlignMent}-8 z-[9999]`}>
            <div className="relative rounded-t-md pb-0 pl-4 pr-4 pt-4">
              {/* Animated RGB Background */}

              {badgeTop === 'bg-black' ? (
                <div className="animate-rgb-background absolute inset-0 rounded-t-md blur-lg"></div>
              ) : null}

              <motion.button
                key="rectangle"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4 }}
                className={`relative flex h-8 w-24 items-center justify-center rounded-t-md ${
                  badgeTop.startsWith('bg-') ? badgeTop : ''
                } text-white shadow-md`}
                style={{
                  backgroundColor: !badgeTop.startsWith('bg-') ? badgeTop : '',
                  backdropFilter: badgeTop === 'bg-black' ? 'blur(10px)' : '',
                }}
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdKeyboardArrowUp className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        ) : buttonShape === 'semiCircle' ? (
          <div className={`fixed bottom-0 ${chatbotAlignMent}-8 z-[9999]`}>
            <div className="relative rounded-t-full pb-0 pl-4 pr-4 pt-4">
              {badgeTop === 'bg-black' ? (
                <div className="animate-rgb-background absolute inset-0 rounded-t-full blur-lg"></div>
              ) : null}

              <motion.button
                key="semiCircle"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4 }}
                className={`relative flex h-10 w-24 items-center justify-center ${
                  badgeTop.startsWith('bg-') ? badgeTop : ''
                } rounded-t-full text-white shadow-lg`} // Semi-circle shape
                style={{
                  backgroundColor: !badgeTop.startsWith('bg-') ? badgeTop : '',
                  backdropFilter: badgeTop === 'bg-black' ? 'blur(10px)' : '',
                }}
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdKeyboardArrowUp className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        ) : buttonShape === 'sidebar' ? (
          <div className="relative flex h-screen items-center justify-center bg-gray-50">
            <div
              className={`fixed bottom-8 right-0 h-14 w-8 rounded-l-lg ${
                badgeTop.startsWith('bg-') ? badgeTop : ''
              } shadow-lg`}
            ></div>

            <div className="fixed bottom-2 right-0">
              <div className="relative rounded-full p-2">
                {badgeTop === 'bg-black' ? (
                  <div className="animate-rgb-background absolute inset-0 rounded-full blur-lg"></div>
                ) : null}

                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className={`relative h-12 w-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-md`}
                  // style={{
                  //   backgroundColor: !badgeTop.startsWith('bg-')
                  //     ? badgeTop
                  //     : '',
                  //   backdropFilter: badgeTop === 'bg-black' ? 'blur(10px)' : '',
                  // }}
                  onClick={() => setIsOpen((prev) => !prev)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdChat className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        ) : buttonShape === 'text' ? (
          <div className={`fixed bottom-6 ${chatbotAlignMent}-8 z-[9999]`}>
            <div className="relative flex items-center justify-center">
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-[-10px] top-[-10px] flex items-center justify-center rounded-full bg-blue-800 text-white"
                  onClick={() => setIsOpen(false)}
                  style={{
                    height: '24px',
                    width: '24px',
                    cursor: 'pointer',
                  }}
                >
                  <AiOutlineClose />
                </motion.div>
              )}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`relative flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 shadow-lg hover:bg-white hover:text-blue-500 hover:shadow-xl`}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <HiOutlinePencil className="text-white group-hover:text-blue-500" />
                <span className="text-sm font-medium text-white hover:text-blue-500">
                  Need Help?
                </span>
              </motion.button>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default CompanyDetailsPage;
