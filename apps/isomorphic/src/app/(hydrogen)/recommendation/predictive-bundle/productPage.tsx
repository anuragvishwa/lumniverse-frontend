'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Checkbox, Text } from 'rizzui';
import noImage from '@public/no-image-svgrepo-com.svg';

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

interface SidebarProps {
  headerFontSize: number;
  headerTitle: string;
  headerFont: string;
  buttonText: string;
  headerTextTransform: TextTransform;
  setHeaderFontSize: React.Dispatch<React.SetStateAction<number>>;
  buttonColor: string;
  setButtonColor: React.Dispatch<React.SetStateAction<string>>;
  buttonTextColor: string;
  setButtonTextColor: React.Dispatch<React.SetStateAction<string>>;
  headerTextColor: string;
  setHeaderTextColor: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const ProductPage = ({
  headerFontSize,
  headerTitle,
  headerTextTransform,
  headerFont,
  buttonText,
  setHeaderFontSize,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
  headerTextColor,
  setHeaderTextColor,
  className,
}: SidebarProps) => {
  const [checkedItems, setCheckedItems] = useState([true, true]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="mt-6 flex flex-col gap-6">
      <section className="w-full rounded-md border-2 border-gray-50 bg-gray-50 p-4 shadow-lg">
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

        <div className="mt-6 flex items-center gap-6">
          {/* Products Bundle */}
          <div className="flex items-center gap-6">
            {/* Product 1 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src={noImage}
                alt="noImage"
                className={`h-20 w-20 rounded-md transition-opacity duration-300 ${
                  checkedItems[0]
                    ? 'border-2 border-gray-200 bg-gray-200'
                    : 'opacity-50'
                }`}
              />
              <p className="mt-3 w-32 text-sm font-medium text-gray-700">
                <strong>This Item:</strong>
                Citrus & Sage Candle + French Vanilla Candle
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Checkbox
                  size="sm"
                  checked={checkedItems[0]}
                  onChange={() => handleCheckboxChange(0)}
                />
                Rs. 0.00
              </p>
            </div>

            {/* Second Product */}

            {/* Plus Sign */}
            <span className="text-2xl font-semibold text-gray-700">+</span>

            {/* Product 2 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src={noImage}
                alt="noImage"
                className={`h-20 w-20 rounded-md transition-opacity duration-300 ${
                  checkedItems[1]
                    ? 'border-2 border-gray-200 bg-gray-200'
                    : 'opacity-50'
                }`}
              />
              <p className="mt-3 w-32 text-sm font-medium text-gray-700">
                Citrus & Sage Fragrance + 5g Swastika Coin
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Checkbox
                  size="sm"
                  checked={checkedItems[1]}
                  onChange={() => handleCheckboxChange(1)}
                />
                Rs. 0.00
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Total price: <span className="text-gray-900">Rs. 0</span>
            </p>
            <Button
              size="md"
              variant="solid"
              style={{ background: buttonColor, color: buttonTextColor }}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </section>

      <div>
        <Text as="strong">Note:</Text>
        <Text as="span" className="ml-2">
          Preview shows sample data. Bundles in the storefront will display
          according to shopper&apos;s search terms if a product in the bundle
          appears in the search results.
        </Text>
      </div>
    </div>
  );
};

export default ProductPage;
