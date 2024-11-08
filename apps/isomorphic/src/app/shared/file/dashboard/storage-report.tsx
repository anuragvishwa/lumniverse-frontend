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

  const [selectedFont, setSelectedFont] = useState('');

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
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-6 gap-6 @container">
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
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {buttonShape === 'rounded' && !isOpen ? (
          <motion.button
            key="rounded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-6 right-8 rounded-full ${
              badgeTop.startsWith('bg-') ? badgeTop : ''
            } p-4 text-white shadow-lg`}
            style={{
              backgroundColor: !badgeTop.startsWith('bg-') ? badgeTop : '',
            }}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdChat className="h-6 w-6" />
          </motion.button>
        ) : buttonShape === 'rectangle' ? (
          <motion.button
            key="rectangle"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: isOpen ? 0 : 1,
              y: isOpen ? -20 : 0,
              x: 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-0 right-8 flex h-8 w-24 items-center justify-center rounded-t-md bg-gradient-to-r from-${badgeTop} to-${badgeBottom} text-white shadow-lg`}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdKeyboardArrowUp className="h-6 w-6" />
          </motion.button>
        ) : buttonShape === 'semiCircle' ? (
          <motion.button
            key="semiCircle"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: isOpen ? 0 : 1,
              y: isOpen ? -20 : 0,
              x: 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-0 right-8 flex h-10 w-24 items-center justify-center bg-gradient-to-r from-${badgeTop} to-${badgeBottom} rounded-t-full text-white shadow-lg`} // Semi-circle shape
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdKeyboardArrowUp className="h-6 w-6" />
          </motion.button>
        ) : // Render nothing if both buttons should not be visible
        null}
      </AnimatePresence>
    </div>
  );
}
