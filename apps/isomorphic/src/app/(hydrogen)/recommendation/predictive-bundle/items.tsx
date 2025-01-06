import { AdvancedCheckbox, Text } from 'rizzui';
import ecommerce from '@public/web-shopping.svg';
import shopping from '@public/undraw_shopping-app_b80f.svg';
import shopping2 from '@public/undraw_shopping_a55o.svg';
import shopping3 from '@public/undraw_send-gift_jl1z.svg';
import Image from 'next/image';
import { useState } from 'react';
import { Select, Input, Checkbox } from 'rizzui';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';
import SelectProducts from './selectedProducts';

type PlacementKeys = 'searchWidget' | 'searchResults' | 'productPage';

export default function Items() {
  const [selectedCurrency, setSelectedCurrency] = useState(
    'Buy more and save 20%'
  );

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const [selectedDiscount, setSelectedDiscount] = useState('No discount');
  const [placements, setPlacements] = useState<{
    searchWidget: boolean;
    searchResults: boolean;
    productPage: boolean;
  }>({
    searchWidget: false,
    searchResults: false,
    productPage: false,
  });

  const togglePlacement = (key: PlacementKeys) => {
    setPlacements((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <>
      <div className="rounded-lg border-2 border-gray-100 bg-white p-8 shadow-xl">
        {/* Section 1: Bundled Products */}
        <div className="mb-6">
          {' '}
          <SelectProducts />
        </div>

        {/* Section 2: Discount */}
        <div className="mb-6">
          <label
            htmlFor="discount-type"
            className="mb-2 block text-sm font-medium"
          >
            2. Discount
          </label>
          <select
            id="discount-type"
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
            className="w-96 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="No discount">No discount</option>
            <option value="Percentage">Percentage</option>
            <option value="Fixed amount">Fixed amount</option>
          </select>
        </div>

        {/* Section 3: Placements */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            3. Placements
          </label>
          <div className="space-y-2">
            <Checkbox
              checked={placements.searchWidget}
              onChange={() => togglePlacement('searchWidget')}
              label="Instant search widget"
            />
            <Checkbox
              checked={placements.searchResults}
              onChange={() => togglePlacement('searchResults')}
              label="Search results page"
            />
            <Checkbox
              checked={placements.productPage}
              onChange={() => togglePlacement('productPage')}
              label="Product page"
            />
          </div>
        </div>
        <div className="mb-6">
          {' '}
          <label
            htmlFor="discount-type"
            className="mb-2 flex items-center gap-2 text-sm font-medium"
          >
            Choose how the bundle is displayed in search results.
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Card 1 */}

            <AdvancedCheckbox
              name="currency"
              value="At the bottom of the search result list"
              alignment="left"
              checked={
                selectedCurrency === 'At the bottom of the search result list'
              }
              onChange={() =>
                handleCurrencyChange('At the bottom of the search result list')
              }
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6 shadow-md transition hover:shadow-lg ${
                selectedCurrency === 'At the bottom of the search result list'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <div className="relative">
                <Image
                  src={ecommerce}
                  alt="ecommerce"
                  className="mb-4 h-32 w-auto object-contain"
                />
              </div>
              <Text className="mt-2 text-center text-sm text-gray-500">
                At the bottom of the search result list
              </Text>
            </AdvancedCheckbox>
            {/* Card 2 */}
            <AdvancedCheckbox
              disabled
              name="currency"
              value="As a product in the search result list"
              alignment="left"
              checked={
                selectedCurrency === 'As a product in the search result list'
              }
              onChange={() =>
                handleCurrencyChange('As a product in the search result list')
              }
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6 shadow-md transition hover:shadow-lg ${
                selectedCurrency === 'As a product in the search result list'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <div className="relative">
                <Image
                  src={shopping}
                  alt="shopping"
                  className="mb-4 h-32 w-auto object-contain"
                />
              </div>

              <Text className="mt-2 text-center text-sm text-gray-500">
                As a product in the search result list
              </Text>
            </AdvancedCheckbox>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="discount-type"
            className="mb-2 flex items-center gap-2 text-sm font-medium"
          >
            4. Bundle Status <HiMiniQuestionMarkCircle className="h-5 w-5" />
          </label>
          <select
            id="discount-type"
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
            className="w-96 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="No discount">Active</option>
            <option value="Percentage">Paused</option>
          </select>
        </div>
      </div>
    </>
  );
}
