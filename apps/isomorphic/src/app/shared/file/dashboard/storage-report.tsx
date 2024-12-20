'use client';

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
import { useState } from 'react';
import SocialFollowers from '@/app/shared/executive/social-followers';
import StyleCard from '@/app/(hydrogen)/customize/styleCard';
import { MdChat, MdKeyboardArrowUp } from 'react-icons/md';
import '@/app/(hydrogen)/customize/chatbot.css';
import PageHeader from '../../page-header';
import { Button, Text, Title } from 'rizzui';
import CardsPage from '@/app/(hydrogen)/widgets/cards/page';

export default function Customize() {
  const [isVisible, setIsVisible] = useState(true); // Control visibility

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const [bgColor, setBgColor] = useState(
    'bg-gradient-to-r from-violet-600 to-indigo-600'
  );

  // className =
  //   'rounded-full px-3 py-1.5 text-sm font-bold text-indigo-600 transition duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white';

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
  const [height, setHeight] = useState('450');
  const [borderRadius, setBorderRadius] = useState('0.5rem');
  const [inputRadius, setInputRadius] = useState('full');

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
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Title as="h4">Style Palette</Title>
        {/* <Button
          size="sm"
          rounded="lg"
          variant="text"
          className={`ashref`}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <span className="spanish">
            {' '}
            <MdChat className="h-6 w-6" />
          </span>
        </Button> */}
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
        <div className="mt-6 grid grid-cols-6 gap-6 @container">
          <StyleCard
            className="col-span-full @[59rem]:col-span-4 @[80rem]:col-span-3"
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
          />
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
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {buttonShape === 'rounded' && !isOpen ? (
          <div className="fixed bottom-6 right-8">
            <div className="relative rounded-full p-4">
              {badgeTop === 'bg-black' ? (
                <div className="animate-rgb-background absolute inset-0 rounded-full blur-lg"></div>
              ) : null}

              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-full ${
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
          <div className="fixed bottom-0 right-8">
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
          <div className="fixed bottom-0 right-8">
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
        ) : // Render nothing if both buttons should not be visible
        null}
      </AnimatePresence>
    </>
  );
}
