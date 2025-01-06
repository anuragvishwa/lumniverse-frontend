'use client';
import Popover from '@core/ui/carbon-menu/popover/popover';
import RangeSlider from '@core/ui/range-slider';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button, Input, Select, Text } from 'rizzui';

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

const LayoutPage = ({
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
  console.log(buttonColor);
  return (
    <div className="mt-6 flex min-h-screen rounded-md border-2 border-gray-50 bg-gray-50 p-4 shadow-lg">
      {/* Sidebar */}
      <aside className="w-1/4 border-r border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-medium text-gray-800">
            POPULAR SUGGESTIONS
          </h3>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-2/3 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-medium text-gray-800">
            COLLECTIONS
          </h3>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-4 w-2/3 rounded bg-gray-300"></div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium text-gray-800">PAGES</h3>
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-4 w-2/3 rounded bg-gray-300"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6">
        {/* Products Section */}
        <section>
          <h3 className="mb-4 text-sm font-medium text-gray-800">PRODUCTS</h3>
          <div className="mb-8 grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex h-32 items-center justify-center rounded bg-gray-200"
              >
                <div className="h-10 w-10 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Buy More and Save Section */}
        <section>
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

          <div className="mt-6 flex flex-col items-center">
            {/* Products Bundle */}
            <div className="flex items-center gap-6">
              {/* Product 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-md bg-gray-200" />
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Citrus & Sage Candle + French Vanilla Candle
                </p>
                <p className="text-sm font-semibold text-gray-900">Rs. 0.00</p>
              </div>

              {/* Plus Sign */}
              <span className="text-2xl font-semibold text-gray-700">+</span>

              {/* Product 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-md bg-gray-200" />
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Citrus & Sage Fragrance + 5g Swastika coin
                </p>
                <p className="text-sm font-semibold text-gray-900">Rs. 0.00</p>
              </div>
            </div>

            {/* Total Price */}
            <div className="mt-6 w-full border-t border-gray-300 pt-4 text-center">
              <p className="text-lg font-semibold text-gray-700">
                Total price: <span className="text-gray-900">Rs. 0</span>
              </p>
            </div>

            {/* Buttons Section */}
            <div className="mt-6 flex w-full items-center justify-between">
              {/* View All Products */}
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:underline"
              >
                View all 24 products &rarr;
              </a>

              {/* Add to Cart Button */}
              <button
                className={`rounded-full bg-[${buttonColor}] px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800`}
                style={{ background: buttonColor, color: buttonTextColor }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LayoutPage;
