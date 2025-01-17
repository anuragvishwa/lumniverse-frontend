'use client';

import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  AdvancedRadio,
  RadioGroup,
  FieldError,
  Radio,
  Text,
  Avatar,
  Select,
} from 'rizzui';
import { useStepperOne } from '.';
import FormSummary from './form-summary';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Bundle from '@/app/(hydrogen)/recommendation/predictive-bundle/bundle';
import Items from '@/app/(hydrogen)/recommendation/predictive-bundle/items';
import Header from '../header';
import { recommendationProducts } from '@/data/shop-products';
import cn from '@core/utils/class-names';
import Sidebar from './multiStepSidebar';
import ProductCarousel from '@/app/(hydrogen)/recommendation/recommendation-widgets/productCarousel';
import RecommendationSettings from '@/app/(hydrogen)/recommendation/recommendation-widgets/recommendation-settings-';

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

interface OptionType {
  label: string;
  value: string;
}

const options: OptionType[] = [
  { label: 'Widget Layout', value: 'widget layout' },
  { label: 'Widget Title', value: 'widget title' },
];

export default function StepTwo() {
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

  const [headerFontSize, setHeaderFontSize] = useState(14);
  const [headerTitle, setHeaderTitle] = useState('Buy more and save');
  const [headerTextColor, setHeaderTextColor] = useState('#595959');
  const [headerFont, setHeaderFont] = useState(fonts[0]);
  const [headerAlignment, setHeaderAlignment] = useState('center');
  const [headerTextTransform, setHeaderTextTransform] =
    useState<TextTransform>('uppercase');

  const [buttonText, setButtonText] = useState('Add bundle to cart');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');
  const [selectWidget, setSelectWidget] = useState<OptionType | null>(
    options[0]
  );
  const [showProduct, setShowProduct] = useState(3);

  const handleSelectChange = (selectedOption: OptionType | null) => {
    setSelectWidget(selectedOption);
  };

  console.log(
    localStorage.getItem('selectedRadio'),
    localStorage.getItem('selectedTab')
  );

  const radio = localStorage.getItem('selectedRadio');
  const tab = localStorage.getItem('selectedTab');

  console.log(radio, tab);
  return (
    <>
      {radio === 'Hand-picked products' ? (
        <>
          <Header />
          <div
            className={cn(
              'place-content-center gap-6 px-5 py-10 @3xl:min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-56'
            )}
          >
            <div className="flex w-full flex-col justify-between gap-12">
              <div className="flex items-center justify-between">
                <FormSummary />
              </div>

              <RecommendationSettings radio={radio} tab={tab || ''} />
            </div>
          </div>
        </>
      ) : (
        <main className="flex min-h-screen flex-grow">
          <Sidebar
            showProduct={showProduct}
            setShowProduct={setShowProduct}
            selectWidget={selectWidget}
            headerFont={headerFont}
            setHeaderFont={setHeaderFont}
            headerAlignment={headerAlignment}
            setHeaderAlignment={setHeaderAlignment}
            headerTextTransform={headerTextTransform}
            setHeaderTextTransform={setHeaderTextTransform}
            headerFontSize={headerFontSize}
            setHeaderFontSize={setHeaderFontSize}
            headerTitle={headerTitle}
            setHeaderTitle={setHeaderTitle}
            buttonText={buttonText}
            setButtonText={setButtonText}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
            buttonTextColor={buttonTextColor}
            setButtonTextColor={setButtonTextColor}
            headerTextColor={headerTextColor}
            setHeaderTextColor={setHeaderTextColor}
            className="fixed hidden dark:bg-gray-50 xl:block"
          />
          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            <Header />

            <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
              <div className="mb-6 flex items-center justify-between">
                <FormSummary />
                <Select
                  options={options}
                  placeholder="Select text transform"
                  size="sm"
                  variant="outline"
                  className="w-72"
                  value={selectWidget}
                  onChange={(selectedOption: OptionType | null) =>
                    handleSelectChange(selectedOption)
                  }
                />
              </div>
              <div className="my-6 flex items-center justify-between">
                <div className="h-[1px] flex-grow bg-gray-300"></div>
                <span
                  className={`px-4 font-medium text-[${headerTextColor}] text-[${headerFontSize}px]`}
                  style={{
                    fontSize: `${headerFontSize}px`,
                    fontFamily: headerFont,
                    textTransform: `${headerTextTransform}`,
                    color: headerTextColor,
                  }}
                >
                  {headerTitle}
                </span>
                <div className="h-[1px] flex-grow bg-gray-300"></div>
              </div>
              <ProductCarousel
                title={''}
                showProduct={showProduct}
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
            </div>
          </div>
        </main>
      )}
    </>
  );
}
