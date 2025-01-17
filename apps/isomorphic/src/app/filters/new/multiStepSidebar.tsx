'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import Popover from '@core/ui/carbon-menu/popover/popover';
import cn from '@core/utils/class-names';
import SimpleBar from '@core/ui/simplebar';
import Logo from '@core/components/logo';
import { SidebarMenu } from '@/layouts/hydrogen/sidebar-menu';
import {
  ActionIcon,
  Button,
  Checkbox,
  Input,
  Radio,
  Select,
  Text,
} from 'rizzui';
import { HexColorPicker } from 'react-colorful';
import { FaQuestionCircle } from 'react-icons/fa';
import RangeSlider from '@core/ui/range-slider';
import { DatePicker } from '@core/ui/datepicker';
import { FiTrash2 } from 'react-icons/fi';
import { BiCrown } from 'react-icons/bi';
interface OptionType {
  label: string;
  value: string;
}

const options: OptionType[] = [
  { label: 'Customization', value: 'customization' },
  { label: 'Default', value: 'default' },
];

const alignmentOptions: OptionType[] = [
  { label: 'Center', value: 'center' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
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

const fontOptions = [
  ...fonts.map((font) => ({
    value: font.toLowerCase().replace(/\s+/g, '-'),
    label: font,
  })),
];

const textTransformOptions = [
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'capitalize', label: 'Capitalize' },
];

const buttonSize = [
  { label: 'Specific search terms', value: 'specific_search_terms' },
];

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

interface SidebarProps {
  headerFont: string;
  setHeaderFont: React.Dispatch<React.SetStateAction<string>>;
  headerAlignment: string;
  setHeaderAlignment: React.Dispatch<React.SetStateAction<string>>;
  headerTextTransform: string;
  setHeaderTextTransform: Dispatch<SetStateAction<TextTransform>>;
  headerFontSize: number;
  setHeaderFontSize: React.Dispatch<React.SetStateAction<number>>;
  headerTitle: string;
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
  buttonColor: string;
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  setButtonColor: React.Dispatch<React.SetStateAction<string>>;
  buttonTextColor: string;
  setButtonTextColor: React.Dispatch<React.SetStateAction<string>>;
  headerTextColor: string;
  setHeaderTextColor: React.Dispatch<React.SetStateAction<string>>;
  selectWidget: any;
  showProduct: number;
  setShowProduct: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  activeButton: null;
  setActiveButton: Dispatch<SetStateAction<null>>;
}

export default function Sidebar({
  headerFont,
  showProduct,
  setShowProduct,
  setHeaderFont,
  headerAlignment,
  selectWidget,
  setHeaderAlignment,
  headerTextTransform,
  setHeaderTextTransform,
  headerFontSize,
  setHeaderFontSize,
  headerTitle,
  setHeaderTitle,
  buttonText,
  setButtonText,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
  headerTextColor,
  setHeaderTextColor,
  activeButton,
  setActiveButton,
  className,
}: SidebarProps) {
  const [terms, setTerms] = useState<string[]>(['']); // Initialize with one empty term
  const [isError, setIsError] = useState<boolean[]>([false]); // Error state per term

  const buttons = [
    { label: 'Pin', value: 'pin' },
    { label: 'Boost', value: 'boost' },
    { label: 'Demote', value: 'demote' },
    { label: 'Hide', value: 'hide' },
    { label: 'Filter', value: 'filter' },
    { label: 'Banner', value: 'banner', icon: <BiCrown className="h-4 w-4" /> },
  ];

  const handleClick = (buttonValue: any) => {
    setActiveButton(buttonValue);
  };

  const handleAddTerm = () => {
    setTerms([...terms, '']);
    setIsError([...isError, false]); // Add new error state for the new term
  };

  const handleTermChange = (index: number, value: string) => {
    const newTerms = [...terms];
    newTerms[index] = value;
    setTerms(newTerms);
  };

  const handleRemoveTerm = (index: number) => {
    const newTerms = terms.filter((_, i) => i !== index);
    const newErrors = isError.filter((_, i) => i !== index);
    setTerms(newTerms);
    setIsError(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorStates = terms.map((term) => term.trim() === '');
    setIsError(errorStates);
    if (!errorStates.includes(true)) {
      // Handle form submission here
      console.log('Form submitted with terms:', terms);
    }
  };

  const [style, setStyle] = useState<string>('customization');

  const handleStyleChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setStyle(selectedOption.value);
  };

  const handleFontChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setHeaderFont(selectedOption.value);
  };

  const handleHeaderTextTransform = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setHeaderTextTransform(selectedOption.value as TextTransform);
  };

  const handleHeaderTextColorChange = (color: string) => {
    setHeaderTextColor(color);
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setHeaderFontSize(value[0]);
    } else {
      setHeaderFontSize(value);
    }
  };

  return (
    <aside
      className={cn(
        'h-full border-e-2 border-gray-100 bg-white dark:bg-gray-100/50',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="text-sm text-gray-800 hover:text-gray-900"
        >
          <svg
            width="150"
            height="50"
            viewBox="0 0 370.00000000000006 69.92222340901692"
            className="looka-1j8o68f"
          >
            <defs id="SvgjsDefs1608"></defs>
            <g
              id="SvgjsG1609"
              transform="matrix(0.7777777777777778,0,0,0.7777777777777778,-3.8888881471421985,-3.888888888888889)"
              fill="black"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <path d="M78.4,66.5c-5.5,4.8-9.9,15.2-9.9,15.2s-6.9-11.4-12.9-15.3c-9.5-6.1-13.6-6.2-13.6-6.2V65c0,0,7.8,1.2,11.7,4.6   c8.2,7.1,14.8,18.5,14.8,18.5S74.4,75,80.1,70.5C88.1,64.3,95,65,95,65v-4.8C95,60.1,85.1,60.7,78.4,66.5z"></path>
                <path d="M42,80c-6.4-3.6-17.8-4.3-17.8-4.3s8.7-10.1,10.5-17C37.5,47.9,36.2,44,36.2,44l-4.6,1.6c0,0,1.3,7.7-0.6,12.4   c-4.1,9.9-13,19.8-13,19.8s14.6,1.3,20.7,5.1c8.6,5.4,10.2,12,10.2,12l4.6-1.6C53.5,93.4,49.7,84.4,42,80z"></path>
                <path d="M35.3,36.8c11.3-0.9,14.6-3.4,14.6-3.4l-3-3.8c0,0-6.9,3.7-12.1,3.4c-10.9-0.6-23.3-5.6-23.3-5.6s3.5,14,1.8,20.9   C10.9,58.2,5,61.8,5,61.8l3,3.8c0,0,7.5-6.5,9.1-15.1c1.3-7.1-1.7-18-1.7-18S28,37.4,35.3,36.8z"></path>
                <path d="M37.4,17.8c7.3-1.1,16.7-7.4,16.7-7.4s-0.6,13.2,2.4,19.8c4.6,10.2,8,12.5,8,12.5l2.7-4c0,0-5.9-5.2-7.3-10.2   C56.9,18.2,57.7,5,57.7,5s-12.3,7.8-19.5,8.5c-10.2,1-15.6-3.3-15.6-3.3l-2.7,4.1C19.9,14.2,28.6,19.1,37.4,17.8z"></path>
                <path d="M65,60.5c0,0,3.1-7.2,7.4-10.1c9-6.1,21.9-9.7,21.9-9.7s-11.5-8.9-14.5-15.4c-4.2-9.1-1.9-15.6-1.9-15.6l-4.8-1.2   c0,0-1.9,9.6,2.2,17.4c3.4,6.4,12.5,13.2,12.5,13.2S75,42.9,69.6,47.8c-8.3,7.6-9.4,11.5-9.4,11.5L65,60.5z"></path>
              </g>
            </g>
            <g
              id="SvgjsG1610"
              transform="matrix(3.0091108427793998,0,0,3.0091108427793998,86.6854922830582,-4.380324083924474)"
              fill="black"
            >
              <path d="M9.322 18.1525 c0.15238 0 0.27102 0.10169 0.27102 0.28814 l0 1.2881 c0 0.15238 -0.11881 0.27102 -0.27119 0.27102 l-8 0 c-0.15254 0 -0.22034 -0.11864 -0.22034 -0.27102 l0 -13.017 c0 -0.15254 0.10169 -0.27119 0.27136 -0.27119 l1.3729 0 c0.15254 0 0.27119 0.11864 0.27119 0.27119 l0 11.441 l6.3051 0 z M19.254223728813557 11.6102 c0.15254 0 0.25424 0.11881 0.25424 0.28831 l0 7.8305 c0 0.15238 -0.10169 0.27102 -0.23729 0.27102 l-1.0508 0 c-0.28814 0 -0.52542 -0.42356 -0.54237 -0.71169 l0 -0.18644 c-0.66102 0.50847 -1.5593 0.99983 -2.7119 0.99983 c-1.7458 0 -3.4915 -1.1015 -3.4915 -3.2202 l0 -3.7458 c0 -0.45763 -0.033898 -0.81356 -0.084746 -1.1695 c-0.033898 -0.18644 0.016949 -0.35593 0.16949 -0.35593 l1.1017 0 c0.42373 0 0.66102 0.28814 0.66102 0.67797 l0 4.4237 c0 1.1186 0.76271 1.7458 1.8983 1.7458 c0.9661 0 1.7627 -0.54237 2.4576 -1.2373 l0 -5.322 c0 -0.16949 0.10169 -0.28831 0.25407 -0.28831 l1.3222 0 z M35.864677966101695 19.64424 c0.050847 0.18644 -0.016784 0.3561 -0.16916 0.3561 l-1.1017 0 c-0.42373 0 -0.66102 -0.28797 -0.66102 -0.6778 l0 -4.4237 c0 -1.1017 -0.77966 -1.7458 -1.8983 -1.7458 c-0.9661 0 -1.7797 0.55932 -2.4746 1.2542 c0.016784 0.10169 0.016784 0.20339 0.016784 0.3222 l0 3.7456 c0.016949 0.47458 0.050847 0.83051 0.10169 1.1695 c0.033898 0.18644 -0.016949 0.35576 -0.16949 0.35576 l-1.1017 0 c-0.44068 0 -0.66102 -0.28797 -0.66102 -0.6778 l0 -4.4237 c0 -1.1017 -0.77966 -1.7458 -1.8985 -1.7458 c-0.96593 0 -1.7795 0.54237 -2.4575 1.2373 l0 5.339 c0 0.15238 -0.11864 0.27102 -0.27119 0.27102 l-1.322 0 c-0.15254 0 -0.25424 -0.11864 -0.25424 -0.27102 l0 -7.8476 c0 -0.15238 0.10169 -0.27119 0.25424 -0.27119 l0.91525 0 c0.40678 0 0.66102 0.42373 0.67797 0.72881 l0 0.16949 c0.66102 -0.50864 1.5424 -1 2.6949 -1 c1.1695 0 2.339 0.49136 2.9831 1.4405 c0.67797 -0.62712 1.7288 -1.4407 3.2203 -1.4407 c1.7458 0 3.4914 1.1017 3.4914 3.2205 l0 3.7456 c0 0.47458 0.050847 0.83051 0.084746 1.1695 z M45.881213559322035 19.64424 c0.033898 0.18644 -0.016784 0.35576 -0.16916 0.35576 l-1.1017 0 c-0.44068 0 -0.66102 -0.28797 -0.66102 -0.6778 l0 -4.4068 c0 -1.1186 -0.77966 -1.7627 -1.8983 -1.7627 c-0.9661 0 -1.7797 0.45763 -2.4575 1.1186 l0 5.4578 c0 0.15238 -0.11864 0.27102 -0.27119 0.27102 l-1.3222 0 c-0.15238 0 -0.25407 -0.11864 -0.25407 -0.27102 l0 -7.8476 c0 -0.15238 0.10169 -0.27119 0.25407 -0.27119 l0.91525 0 c0.40678 0 0.66102 0.42373 0.67797 0.72881 l0 0.16949 c0.66102 -0.50864 1.5422 -1.0171 2.6947 -1.0171 c1.7458 0 3.4915 1.1019 3.4915 3.2205 l0 3.7627 c0.016784 0.47458 0.050681 0.83051 0.10153 1.1695 z M48.94896271186441 8.492 c-0.55915 0 -1.0168 -0.44068 -1.0168 -1.0169 c0 -0.55932 0.45763 -1.0169 1.0168 -1.0169 c0.55932 0 1.0169 0.45763 1.0169 1.0169 c0 0.57627 -0.45763 1.0169 -1.0169 1.0169 z M49.609962711864405 11.6102 l-1.3051 0 c-0.16949 0 -0.27119 0.11881 -0.27119 0.27119 l0 7.4407 c0 0.38983 0.23729 0.6778 0.64407 0.6778 l0.94915 0 c0.15254 0 0.25424 -0.10153 0.25424 -0.28797 l0 -7.8305 c0 -0.15238 -0.11864 -0.27119 -0.27119 -0.27119 z M59.932242372881355 11.6102 l-1.4575 -0.00016552 c-0.15254 0 -0.20339 0.084746 -0.27119 0.25441 l-2.3051 5.0846 l-2.322 -5.0846 c-0.067797 -0.16966 -0.11864 -0.25441 -0.27119 -0.25441 l-1.5254 0 c-0.15254 0 -0.23712 0.084746 -0.16933 0.25441 l3.9153 8.0168 c0.050847 0.11864 0.18644 0.20339 0.28814 0.20339 l0.16949 0 c0.10169 0 0.23712 -0.084746 0.28797 -0.20339 l3.8814 -8.0168 c0.08458 -0.15254 -0.067963 -0.25424 -0.22051 -0.25424 z M68.05084067796611 16.4915 c0.61 0 1.0336 -0.30508 1.0336 -1.0169 c0 -2.0847 -1.6102 -3.9831 -4.0847 -3.9831 c-2.3559 0 -4.2034 1.8644 -4.2034 4.3051 c0 2.5422 1.9322 4.288 4.3051 4.288 c1.5085 0 2.6949 -0.61017 3.4237 -1.5932 c0.10186 -0.13559 0.067963 -0.23729 -0.033568 -0.37288 l-0.32203 -0.42373 c-0.13559 -0.16933 -0.27119 -0.15254 -0.44085 -0.050847 c-0.5422 0.44068 -1.4405 0.81373 -2.4236 0.81373 c-1.3898 0 -2.3729 -0.84746 -2.5593 -1.9661 l5.3051 0 z M62.7456406779661 15.050799999999999 c0.067797 -0.81356 0.83051 -1.8644 2.2203 -1.8644 c1.4068 0 2.1356 1.0678 2.1864 1.8644 l-4.4068 0 z M76.66086440677967 12.034099999999999 c0.18644 0.11864 0.23729 0.22017 0.11848 0.40661 l-0.69475 1.0169 c-0.084746 0.11864 -0.20339 0.15254 -0.35593 0.11864 c-0.35593 -0.16949 -0.66102 -0.32203 -1.2203 -0.32203 s-1.4407 0.23729 -1.9153 1.2881 l0 5.1866 c0 0.15238 -0.10169 0.27102 -0.25424 0.27102 l-1.339 0 c-0.15254 0 -0.25424 -0.11864 -0.25424 -0.27102 l0 -7.8476 c0 -0.15238 0.11864 -0.27119 0.25424 -0.27119 l0.9322 0 c0.40678 0 0.66102 0.42373 0.66102 0.72881 l0 0.11881 c0.59322 -0.54237 1.3051 -0.91525 2.2373 -0.91525 c0.86441 0 1.5085 0.27119 1.8305 0.49153 z M78.01677983050848 18.7798 l0.5761 -0.91508 c0.11864 -0.18661 0.22034 -0.23746 0.38983 -0.15271 c0.016949 0.033898 1.0508 0.64407 2.1864 0.64407 c0.98305 0 1.322 -0.38983 1.322 -0.77966 c0 -0.57627 -0.62712 -0.77949 -1.7627 -1.0676 c-1.6102 -0.42373 -2.678 -1.2542 -2.678 -2.5424 c0 -1.2712 1.0847 -2.4576 3.1186 -2.4576 c1.2373 0 2.0847 0.42373 2.7627 0.81356 c0.16949 0.10169 0.25424 0.25424 0.15254 0.38983 l-0.62712 0.9661 c-0.084746 0.13559 -0.22034 0.18644 -0.37288 0.13559 c-0.44068 -0.22017 -1.1525 -0.54237 -1.9153 -0.54237 c-0.94915 0 -1.2034 0.47458 -1.2034 0.76271 c0 0.49153 0.71186 0.72881 1.5763 0.96593 c1.5086 0.40678 3.0171 1.1356 3.0171 2.6102 c0 1.4237 -1.3558 2.5083 -3.3898 2.5083 c-1.3898 0 -2.6441 -0.6778 -3.0678 -1.0168 c-0.11864 -0.067797 -0.15254 -0.23729 -0.084746 -0.32203 z M93.1186372881356 16.4915 c0.61 0 1.0336 -0.30508 1.0336 -1.0169 c0 -2.0847 -1.6102 -3.9831 -4.0847 -3.9831 c-2.3559 0 -4.2034 1.8644 -4.2034 4.3051 c0 2.5422 1.9322 4.288 4.3051 4.288 c1.5085 0 2.6949 -0.61017 3.4237 -1.5932 c0.10186 -0.13559 0.067963 -0.23729 -0.033568 -0.37288 l-0.32203 -0.42373 c-0.13559 -0.16933 -0.27119 -0.15254 -0.44085 -0.050847 c-0.5422 0.44068 -1.4405 0.81373 -2.4236 0.81373 c-1.3898 0 -2.3729 -0.84746 -2.5593 -1.9661 l5.3051 0 z M87.8134372881356 15.050799999999999 c0.067797 -0.81356 0.83051 -1.8644 2.2203 -1.8644 c1.4068 0 2.1356 1.0678 2.1864 1.8644 l-4.4068 0 z"></path>
            </g>
          </svg>
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
          <div className="mb-4 flex items-center space-x-2 font-roboto">
            {/* Text label */}
            <span className="text-md font-semibold text-gray-800">
              RULE CONDITIONS
            </span>

            {/* Circle with 'If' */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-500">
              If
            </div>
          </div>
          <div className="space-y-4">
            <div>
              {/* <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                  Maximum recommendations
                  <FaQuestionCircle className="h-4 w-4" />
                </label> */}
              <Input
                label="Rule name"
                labelClassName="mb-1 flex items-center gap-2 text-sm font-medium"
                type="number"
                size="sm"
                variant="outline"

                // defaultValue={headerTitle}
                // onChange={(e) => setHeaderTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                Active date
              </label>
              <DatePicker />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-700">
                  Apply To
                </label>
                <div className="flex items-center space-x-2">
                  <Select
                    size="sm"
                    value="Specific search terms"
                    className="w-2/3" // Set more width for the first select
                    options={buttonSize}
                  />

                  <Select
                    size="sm"
                    className="w-1/3" // Set smaller width for the second select
                    options={buttonSize}
                  />
                </div>
              </div>

              {terms.map((term, index) => (
                <div key={index} className="relative mb-4">
                  <div className="flex items-center space-x-2">
                    {/* <select
                        className="block w-24 rounded-md border bg-gray-100 p-2 text-gray-700"
                        value="Are"
                        disabled
                      >
                        <option value="Are">Are</option>
                      </select>

                      <input
                        type="text"
                        value={term}
                        onChange={(e) =>
                          handleTermChange(index, e.target.value)
                        }
                        className={`block w-full rounded-md border p-2 focus:outline-none focus:ring-2 ${
                          isError[index]
                            ? 'border-red-500 focus:ring-red-500'
                            : 'focus:ring-blue-500'
                        }`}
                        placeholder="Enter term"
                      /> */}

                    <Input
                      size="sm"
                      prefix="Are"
                      prefixClassName="bg-gray-100 text-gray-700"
                    />

                    {/* Trash icon to remove the term */}
                    <ActionIcon
                      size="md"
                      variant="text"
                      onClick={() => handleRemoveTerm(index)}
                    >
                      <FiTrash2 size={20} />
                    </ActionIcon>
                  </div>

                  {isError[index] && (
                    <p className="mt-1 text-sm text-red-500">
                      This field can&apos;t be empty
                    </p>
                  )}

                  {/* Connecting line between the inputs */}
                  {index < terms.length - 1 && (
                    <div className="absolute left-0 right-0 mt-2 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}

              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAddTerm}
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  <span className="mr-2">+</span> Add more terms
                </button>
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <Checkbox size="sm" variant="outline" />
                  <span className="ml-2 text-gray-700">
                    Apply for singular and plurals (English only)
                  </span>
                </label>
              </div>

              <div>
                {/* Heading */}
                <div className="mb-4 flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">
                    STRATEGIES
                  </span>
                  {/* <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-500">
                    Then
                  </div>  */}
                  <Button rounded="pill" size="sm" color="secondary">
                    {' '}
                    Then
                  </Button>
                </div>

                {/* Description */}
                <p className="mb-4 text-gray-600">
                  You can add multiple strategies to a rule. Please select each
                  button and set the conditions for each option.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {buttons.map((button) => (
                    <Button
                      disabled={!!button.icon}
                      key={button.value}
                      size="sm"
                      variant={
                        activeButton === button.value ? 'solid' : 'outline'
                      }
                      color={
                        activeButton === button.value ? 'primary' : undefined
                      }
                      onClick={() => handleClick(button.value)}
                      className={button.icon ? 'flex items-center gap-1' : ''}
                    >
                      {button.icon && button.icon}
                      <span>{button.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </SimpleBar>
    </aside>
  );
}
