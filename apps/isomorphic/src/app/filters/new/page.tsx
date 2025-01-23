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
import FormSummary from '../multi-step-1/form-summary';
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
import ProductCarousel from './productCarousel';
import PinProductSidebar from './component/PinProductSidebar';
import BoostSidebar from './component/boostSidebar';
import HideSidebar from './component/hideSidebar';
import DemoteSidebar from './component/demoteSidebar';
import FilterSidebar from './component/filterSidebar';
import { AnimatePresence, motion } from 'framer-motion';

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

interface OptionType {
  label: string;
  value: string;
}

const options: OptionType[] = [
  { label: 'Widget Layout', value: 'widget layout' },
  { label: 'Widget Title', value: 'widget title' },
];

interface Collection {
  id: number;
  title: string;
  image: any;
  handle: string;
  description: string;
  published_at: string;
  updated_at: string;
  products_count: number;
}

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
  const [activeButton, setActiveButton] = useState(null);

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
  const [showProduct, setShowProduct] = useState(4);

  const handleSelectChange = (selectedOption: OptionType | null) => {
    setSelectWidget(selectedOption);
  };

  const [pinnedProducts, setPinnedProducts] = useState<number[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenProducts, setHiddenProducts] = useState<number[]>([]); // State to keep track of hidden products

  // Handle pinning and unpinning of products (max 7)
  const handlePinProduct = (id: number) => {
    if (pinnedProducts.includes(id)) {
      // If already pinned, unpin it
      setPinnedProducts((prev) => prev.filter((productId) => productId !== id));
    } else if (pinnedProducts.length < 7) {
      // If not pinned and under the limit, pin it
      setPinnedProducts((prev) => [...prev, id]);
    } else {
      alert('You can only pin up to 7 products.');
    }
  };

  const handleHideProduct = (id: number) => {
    if (!hiddenProducts.includes(id)) {
      // Add to hidden products if not already hidden
      setHiddenProducts((prev) => [...prev, id]);
    } else {
      // If already hidden, remove it from hidden products (unhide)
      setHiddenProducts((prev) => prev.filter((productId) => productId !== id));
    }
  };

  const sortedProducts = collections
    .map((collection: Collection) => ({
      id: collection.id,
      thumbnail: collection?.image, // Replace with correct field or logic to get the image
      title: collection.title,
      description: collection.description,
      price: 295.0, // Replace with correct price if available
      sale_price: 320.0, // Replace with correct sale_price if available
      colors: [], // Adjust this if needed
    }))
    .sort((a, b) => {
      const isPinnedA = pinnedProducts.includes(a.id);
      const isPinnedB = pinnedProducts.includes(b.id);
      if (isPinnedA === isPinnedB) return 0; // If both are pinned or both are unpinned, keep order
      return isPinnedA ? -1 : 1; // Pinned products come first
    });

  useEffect(() => {
    // Fetch the collections data
    const fetchCollections = async () => {
      try {
        const response = await fetch('https://giva.co/collections.json');
        const data: any = await response.json();
        setCollections(data.collections);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex">
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
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setHeaderTextColor={setHeaderTextColor}
        className="w-[400px]" // Sidebar width increased to 320px
      />
      <div
        // className="flex w-full flex-col"
        className={`flex w-full flex-col ${
          activeButton
            ? 'xl:w-[calc(100%-750px)] 2xl:w-[calc(100%-750px)]'
            : 'xl:w-[calc(100%-400px)] 2xl:w-[calc(100%-400px)]'
        }`}
      >
        <Header />

        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          <div className="mb-6 flex items-center justify-between">
            <FormSummary />
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

          <div>
            <div>
              {/* <div className="collections-list">
                {collections.map((collection) => (
                  <div key={collection.id} className="collection-item">
                    <h3>{collection.title}</h3>
                    {collection.image ? (
                      <img
                        src={collection.image.src}
                        alt={collection.image.alt || 'Collection Image'}
                      />
                    ) : (
                      <p>No Image Available</p>
                    )}
                    <p>Products Count: {collection.products_count}</p>
                    <p>
                      Published at:{' '}
                      {new Date(collection.published_at).toLocaleString()}
                    </p>
                    <p>
                      Last Updated at:{' '}
                      {new Date(collection.updated_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div> */}
              <ProductCarousel
                pinnedProd={pinnedProducts}
                setPinnedProducts={setPinnedProducts}
                title={''}
                showProduct={showProduct}
                data={sortedProducts}
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
        </div>
      </div>

      {activeButton && (
        <motion.div
          className="md:w-1/3"
          initial={{ x: '100%' }} // Start off-screen to the right
          animate={{ x: 0 }} // Slide to the normal position when active
          exit={{ x: '100%' }} // Slide out to the right when inactive
          transition={{
            type: 'spring',
            stiffness: 300, // Controls the "springiness" of the animation
            damping: 30, // Controls how smooth the animation feels
            duration: 0.5, // Duration for the animation
          }}
        >
          {activeButton === 'pin' && (
            <PinProductSidebar
              setActiveButton={setActiveButton}
              pinnedProducts={pinnedProducts}
              handlePinProduct={handlePinProduct}
            />
          )}
          {activeButton === 'boost' && (
            <BoostSidebar
              setActiveButton={setActiveButton}
              pinnedProducts={pinnedProducts}
              handlePinProduct={handlePinProduct}
            />
          )}
          {activeButton === 'hide' && (
            <HideSidebar
              setActiveButton={setActiveButton}
              pinnedProducts={pinnedProducts}
              handlePinProduct={handlePinProduct}
            />
          )}
          {activeButton === 'demote' && (
            <DemoteSidebar
              setActiveButton={setActiveButton}
              pinnedProducts={hiddenProducts}
              handlePinProduct={handlePinProduct}
            />
          )}
          {activeButton === 'filter' && (
            <FilterSidebar setActiveButton={setActiveButton} />
          )}
        </motion.div>
      )}
    </div>
  );
}
