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

import { BiSolidMessageRounded } from 'react-icons/bi';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Bundle from '@/app/(hydrogen)/recommendation/predictive-bundle/bundle';
import Items from '@/app/(hydrogen)/recommendation/predictive-bundle/items';

import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './previewSidebar';
import { CartProvider } from '@/store/quick-cart/cart.context';
import PageHeader from '@/app/shared/page-header';
import PosSearch from '@/app/shared/point-of-sale/pos-search';
import POSPageView from '@/app/shared/point-of-sale';
import POSDrawer from '@/app/shared/point-of-sale/pos-drawer';
import { routes } from '@/config/routes';
import Header from '../../header';
import { POS_CART_KEY } from '@/config/constants';

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

const pageHeader = {
  title: 'Point of Sale (POS)',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Point of Sale',
    },
  ],
};

export default function Preview() {
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
      <Sidebar />
      <div
        // className="flex w-full flex-col"
        className={`flex w-full flex-col px-4 py-8 md:h-20 md:px-5 lg:px-8 4xl:px-10`}
      >
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          <div>
            <CartProvider cartKey={POS_CART_KEY}>
              <div>
                <PageHeader
                  title={pageHeader.title}
                  breadcrumb={pageHeader.breadcrumb}
                  className="[&_h2]:font-lexend [&_h2]:font-bold"
                >
                  {/* <PosSearch /> */}
                </PageHeader>
                <POSPageView />
                <POSDrawer className="xl:hidden" />
              </div>
            </CartProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
