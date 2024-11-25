'use client';

import React, { useState } from 'react';
import CardsPage from '../widgets/cards/page';
import AppointmentListStats from '@/app/shared/appointment/appointment-list/stats';
import ProductCarousel from '@/app/shared/product-carousel';
import { recommendationProducts } from '@/data/shop-products';

import { AnimatePresence, motion } from 'framer-motion';

const SearchCards = () => {
  const [bgColor, setBgColor] = useState('bg-blue-500');

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
        title={'Search Cards'}
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
    </motion.div>
  );
};

export default SearchCards;
