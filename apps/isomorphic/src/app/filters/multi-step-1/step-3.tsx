'use client';

import { ReactEventHandler, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { AppDispatch, RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import { RadioGroup, AdvancedRadio, Button, Select } from 'rizzui';
import {
  PropertyTypeSchema,
  propertyTypeSchema,
} from '@/validators/multistep-form.schema';
import { useStepperOne, stepOneTotalSteps } from '.';
import {
  SiBigcommerce,
  SiSalesforce,
  SiShopify,
  SiWoocommerce,
} from 'react-icons/si';
import ShopIcon from '@core/components/icons/shop';
import cn from '@core/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import megento from './magento-2-logo-svgrepo-com.svg';
import woo from './woocommerce-icon-svgrepo-com.svg';
import shopify from './shopify-color-svgrepo-com.svg';
import salesforce from './salesforce-svgrepo-com.svg';

import Image from 'next/image';
import LayoutPage from '@/app/(hydrogen)/recommendation/predictive-bundle/layoutPage';
import FormSummary from './form-summary';
import Header from '../header';
import Sidebar from './multiStepSidebar';
import { PiArrowUpLight } from 'react-icons/pi';
import SearchResults from '@/app/(hydrogen)/recommendation/predictive-bundle/searchResults';
import ProductPage from '@/app/(hydrogen)/recommendation/predictive-bundle/productPage';
import AddWidget from '@/app/(hydrogen)/recommendation/recommendation-widgets/add-widget';

interface OptionType {
  label: string;
  value: string;
}

const options: OptionType[] = [
  { label: 'Instant search widget', value: 'instant search widget' },
  { label: 'Search results page', value: 'search results page' },
  { label: 'Product Page', value: 'product page' },
];
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

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

export default function StepThree() {
  const [selectWidget, setSelectWidget] = useState<OptionType | null>(
    options[0]
  );
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

  // Handle select change
  const handleSelectChange = (selectedOption: OptionType | null) => {
    setSelectWidget(selectedOption);
  };
  return (
    <>
      <Header />
      <div
        className={cn(
          'place-content-center gap-6 px-5 py-10 @3xl:min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-56'
        )}
      >
        <div className="flex w-full flex-col justify-between gap-12">
          <div className="col-span-full">
            <FormSummary />
          </div>
          <AddWidget />
        </div>
      </div>
    </>
  );
}
