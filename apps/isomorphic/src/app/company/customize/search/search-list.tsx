'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ActionIcon,
  Empty,
  SearchNotFoundIcon,
  Button,
  Title,
  Input,
  cn,
  Text,
} from 'rizzui';
import {
  PiFileTextDuotone,
  PiMagnifyingGlassBold,
  PiXBold,
} from 'react-icons/pi';
import { pageLinks } from './page-links.data';
import './glass.css';
import { SiChatbot } from 'react-icons/si';
import logo from '@public/address.svg';
import Image from 'next/image';
import { AiOutlineArrowLeft, AiOutlineStar } from 'react-icons/ai';
import ShopFilters from '@/app/shared/ecommerce/shop/shop-filters';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import RatingFilter from '@/app/shared/ecommerce/shop/shop-filters/rating-filter';
import PriceFilter from '@/app/shared/ecommerce/shop/shop-filters/price-filter';
import GenderSpecificFilter from '@/app/shared/ecommerce/shop/shop-filters/gender-specific-filter';
import { useFilterControls } from '@core/hooks/use-filter-control';
import {
  initialState,
  categoriesData,
  brandsData,
  colorsData,
} from '@/app/shared/ecommerce/shop/shop-filters/filter-utils';
import FilterWithSearch from '@core/components/filter-with-search';
import hasSearchedParams from '@core/utils/has-searched-params';

export default function SearchList({ onClose }: { onClose?: () => void }) {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false); // Track searching state

  let menuItemsFiltered = pageLinks;
  if (searchText.length > 0) {
    menuItemsFiltered = pageLinks.filter((item: any) => {
      const label = item.name;
      return (
        label.match(searchText.toLowerCase()) ||
        (label.toLowerCase().match(searchText.toLowerCase()) && label)
      );
    });
  }

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
    return () => {
      inputRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialRecentSearches = [
    'hey how are you?',
    'hey',
    'How do I setup my AI Chatbot?',
    'What are new Lumni AI features?',
    'How do I invite more agents on Lumni?',
  ];

  const frequentSearches = [
    'How can I customize my Chatbox?',
    "What's your pricing?",
    'How do I setup my AI Chatbot?',
    'Can I pay Lumni yearly?',
    'How do I invite more agents on Lumni?',
    'What are new Lumni AI features?',
  ];

  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);

  const { state, applyFilter, clearFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  const { closeDrawer } = useDrawer();

  const handleSearchClick = (search: string) => {
    setSearchText(search); // Update the input field with the selected search term
    setRecentSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter((item) => item !== search);
      return [search, ...updatedSearches];
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // Set searching to true when the input is changed
  };

  const handleSearch = () => {
    setIsSearching(true);
  };

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

  // State to hold the selected font

  return (
    <>
      <div className="flex h-[600px] w-full">
        {/* Sidebar */}
        <div className="w-[30%] max-w-sm overflow-y-auto rounded-md border-r border-gray-200 p-4">
          <svg
            width="120"
            height="50"
            viewBox="0 0 370.00000000000006 69.92222340901692"
            className="looka-1j8o68f"
          >
            <defs id="SvgjsDefs1608"></defs>
            <g
              id="SvgjsG1609"
              transform="matrix(0.7777777777777778,0,0,0.7777777777777778,-3.8888881471421985,-3.888888888888889)"
              fill="purple"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <path d="M78.4,66.5c-5.5,4.8-9.9,15.2-9.9,15.2s-6.9-11.4-12.9-15.3c-9.5-6.1-13.6-6.2-13.6-6.2V65c0,0,7.8,1.2,11.7,4.6   c8.2,7.1,14.8,18.5,14.8,18.5S74.4,75,80.1,70.5C88.1,64.3,95,65,95,65v-4.8C95,60.1,85.1,60.7,78.4,66.5z"></path>
                <path d="M42,80c-6.4-3.6-17.8-4.3-17.8-4.3s8.7-10.1,10.5-17C37.5,47.9,36.2,44,36.2,44l-4.6,1.6c0,0,1.3,7.7-0.6,12.4   c-4.1,9.9-13,19.8-13,19.8s14.6,1.3,20.7,5.1c8.6,5.4,10.2,12,10.2,12l4.6-1.6C53.5,93.4,49.7,84.4,42,80z"></path>
                <path d="M35.3,36.8c11.3-0.9,14.6-3.4,14.6-3.4l-3-3.8c0,0-6.9,3.7-12.1,3.4c-10.9-0.6-23.3-5.6-23.3-5.6s3.5,14,1.8,20.9   C10.9,58.2,5,61.8,5,61.8l3,3.8c0,0,7.5-6.5,9.1-15.1c1.3-7.1-1.7-18-1.7-18S28,37.4,35.3,36.8z"></path>
                <path d="M37.4,17.8c7.3-1.1,16.7-7.4,16.7-7.4s-0.6,13.2,2.4,19.8c4.6,10.2,8,12.5,8,12.5l2.7-4c0,0-5.9-5.2-7.3-10.2   C56.9,18.2,57.7,5,57.7,5s-12.3,7.8-19.5,8.5c-10.2,1-15.6-3.3-15.6-3.3l-2.7,4.1C19.9,14.2,28.6,19.1,37.4,17.8z"></path>
                <path d="M65,60.5c0,0,3.1-7.2,7.4-10.1c9-6.1,21.9-9.7,21.9-9.7s-11.5-8.9-14.5-15.4c-4.2-9.1-1.9-15.6-1.9-15.6l-4.8-1.2   c0,0-1.9,9.6,2.2,17.4c3.4,6.4,12.5,13.2,12.5,13.2S75,42.9,69.6,47.8c-8.3,7.6-9.4,11.5-9.4,11.5L65,60.5z"></path>
              </g>
            </g>
          </svg>
          <div className="space-y-9 overflow-y-auto px-5 py-6">
            <GenderSpecificFilter state={state} applyFilter={applyFilter} />
            <FilterWithSearch
              title="Category"
              name="categories"
              data={categoriesData}
              state={state}
              applyFilter={applyFilter}
              clearFilter={clearFilter}
            />
            <FilterWithSearch
              title="Brand"
              name="brands"
              data={brandsData}
              state={state}
              applyFilter={applyFilter}
              clearFilter={clearFilter}
            />
            <FilterWithSearch
              title="Color"
              name="colors"
              data={colorsData}
              state={state}
              applyFilter={applyFilter}
              clearFilter={clearFilter}
            />
            <PriceFilter state={state} applyFilter={applyFilter} />
            <RatingFilter state={state} applyFilter={applyFilter} />
          </div>

          <div className="flex h-16 flex-shrink-0 items-center justify-center gap-3 bg-white px-5 py-3 dark:bg-gray-100">
            {hasSearchedParams() ? (
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => {
                  reset();
                  closeDrawer();
                }}
              >
                Reset All
              </Button>
            ) : null}
            <Button size="lg" onClick={() => closeDrawer()} className="w-full">
              Show results
            </Button>
          </div>
          {/* <div className="mb-6">
            <h3 className="mb-2 text-xs font-semibold text-gray-700">
              Recent searches
            </h3>
            <ul className="space-y-2">
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchClick(search)}
                  className="flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-200"
                >
                  <AiOutlineArrowLeft className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-800">{search}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold text-gray-700">
              Frequent searches
            </h3>
            <ul className="space-y-2">
              {frequentSearches.map((search, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchClick(search)}
                  className="flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-200"
                >
                  <AiOutlineStar className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-800">{search}</span>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Answers by
              <span className="flex items-center justify-center">
                <svg
                  width="80"
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
              </span>
            </p>
            <button className="mt-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
              Get yours
            </button>
          </div> */}
        </div>

        <div className="w-[70%] p-4">
          <div className="flex items-center px-3 py-2 md:gap-8">
            <div className="flex flex-1 items-center gap-4">
              <Text>Question? Search Anything here</Text>
              <Text className="flex items-center gap-2">
                Work with AI{' '}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 rounded-lg bg-purple-100 px-2 text-purple-600"
                >
                  ✨ AI
                </Button>
              </Text>
            </div>
            <ActionIcon
              variant="text"
              size="sm"
              className="ms-3 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <PiXBold className="h-5 w-5" />
            </ActionIcon>
          </div>
          <div className="flex items-center border-b border-gray-300 px-3 py-2">
            <Input
              variant="text"
              size="md"
              ref={inputRef}
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search here"
              className="flex-1"
              prefix={
                <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
              }
              suffix={
                // <Button
                //   size="sm"
                //   variant="solid"
                //   className="h-auto w-auto px-2 py-2"
                //   onClick={handleSearch}
                // >
                //   Ask your AI
                // </Button>
                <Button
                  variant="solid"
                  size="sm"
                  onClick={handleSearch}
                  className="flex items-center gap-1 rounded-lg px-2"
                >
                  ✨Ask your AI
                </Button>
              }
            />
          </div>
          {isSearching ? (
            <div className="mt-4 w-full px-3">
              <div className="box">Thinking...</div>
              <div className="mt-4 flex w-full items-center justify-between px-3">
                <Text className="text-sm font-bold text-gray-900">
                  Quick Answer
                </Text>
                <div className="mx-3 flex-1 border-t border-gray-300"></div>
                <Text className="text-sm font-bold text-gray-900">
                  How May I help you?
                </Text>
              </div>
              <div className="mt-4 flex w-full flex-col gap-4 px-3">
                <Text className="text-sm font-bold text-gray-900">
                  Generated Answer
                </Text>
                <Text className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore nisi minima corrupti at? Nesciunt obcaecati eaque
                  excepturi molestias magnam. Adipisci quasi unde corporis autem
                  commodi voluptatum voluptates necessitatibus, eum doloribus.
                </Text>
              </div>
            </div>
          ) : (
            <>
              <div className="flex w-full flex-col items-center justify-center px-3 py-4">
                <svg
                  width={150}
                  height={50}
                  viewBox="0 0 370.00000000000006 69.92222340901692"
                  className="mb-2"
                >
                  <defs id="SvgjsDefs1608"></defs>
                  <g
                    id="SvgjsG1609"
                    transform="matrix(0.7777777777777778,0,0,0.7777777777777778,-3.8888881471421985,-3.888888888888889)"
                    fill="purple"
                  >
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path d="M78.4,66.5c-5.5,4.8-9.9,15.2-9.9,15.2s-6.9-11.4-12.9-15.3c-9.5-6.1-13.6-6.2-13.6-6.2V65c0,0,7.8,1.2,11.7,4.6c8.2,7.1,14.8,18.5,14.8,18.5S74.4,75,80.1,70.5C88.1,64.3,95,65,95,65v-4.8C95,60.1,85.1,60.7,78.4,66.5z"></path>
                      <path d="M42,80c-6.4-3.6-17.8-4.3-17.8-4.3s8.7-10.1,10.5-17C37.5,47.9,36.2,44,36.2,44l-4.6,1.6c0,0,1.3,7.7-0.6,12.4c-4.1,9.9-13,19.8-13,19.8s14.6,1.3,20.7,5.1c8.6,5.4,10.2,12,10.2,12l4.6-1.6C53.5,93.4,49.7,84.4,42,80z"></path>
                      <path d="M35.3,36.8c11.3-0.9,14.6-3.4,14.6-3.4l-3-3.8c0,0-6.9,3.7-12.1,3.4c-10.9-0.6-23.3-5.6-23.3-5.6s3.5,14,1.8,20.9C10.9,58.2,5,61.8,5,61.8l3,3.8c0,0,7.5-6.5,9.1-15.1c1.3-7.1-1.7-18-1.7-18S28,37.4,35.3,36.8z"></path>
                      <path d="M37.4,17.8c7.3-1.1,16.7-7.4,16.7-7.4s-0.6,13.2,2.4,19.8c4.6,10.2,8,12.5,8,12.5l2.7-4c0,0-5.9-5.2-7.3-10.2C56.9,18.2,57.7,5,57.7,5s-12.3,7.8-19.5,8.5c-10.2,1-15.6-3.3-15.6-3.3l-2.7,4.1C19.9,14.2,28.6,19.1,37.4,17.8z"></path>
                      <path d="M65,60.5c0,0,3.1-7.2,7.4-10.1c9-6.1,21.9-9.7,21.9-9.7s-11.5-8.9-14.5-15.4c-4.2-9.1-1.9-15.6-1.9-15.6l-4.8-1.2c0,0-1.9,9.6,2.2,17.4c3.4,6.4,12.5,13.2,12.5,13.2S75,42.9,69.6,47.8c-8.3,7.6-9.4,11.5-9.4,11.5L65,60.5z"></path>
                    </g>
                  </g>
                </svg>
                <Text className="mt-2 text-sm">Search Lumni</Text>
                <Text className="mt-2 text-xs">Try these search queries.</Text>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  size="sm"
                  className="border-gradient-to-r mt-2 flex items-center gap-2 rounded-full border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                >
                  Men Fashions
                </Button>
                <Button
                  size="sm"
                  className="border-gradient-to-r mt-2 flex items-center gap-2 rounded-full border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                >
                  Women Fashions
                </Button>
                <Button
                  size="sm"
                  className="border-gradient-to-r mt-2 flex items-center gap-2 rounded-full border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                >
                  Something New
                </Button>
                <Button
                  size="sm"
                  className="border-gradient-to-r mt-2 flex items-center gap-2 rounded-full border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                >
                  Something New
                </Button>
                <Button
                  size="sm"
                  className="border-gradient-to-r mt-2 flex items-center gap-2 rounded-full border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                >
                  Something New
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
