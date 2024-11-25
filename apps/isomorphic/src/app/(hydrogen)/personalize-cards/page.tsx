'use client';

import React from 'react';
import { useState } from 'react';
import CardsPage from '../widgets/cards/page';
import AppointmentListStats from '@/app/shared/appointment/appointment-list/stats';
import ProductCarousel from '@/app/shared/product-carousel';
import { recommendationProducts } from '@/data/shop-products';
import StyleCard from './StyleCard';
import { AnimatePresence, motion } from 'framer-motion';

const Personlize = () => {
  const [bgColor, setBgColor] = useState('bg-blue-500');

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

  const [badgeTop, setBadgeTop] = useState('bg-blue-500');
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-8"
    >
      <ProductCarousel
        title={'Personalize Cards'}
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
      />
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
    </motion.div>
  );
};

export default Personlize;
