import { AdvancedCheckbox, Text } from 'rizzui';
import ecommerce from '@public/web-shopping.svg';
import shopping from '@public/undraw_shopping-app_b80f.svg';
import shopping2 from '@public/undraw_shopping_a55o.svg';
import shopping3 from '@public/undraw_send-gift_jl1z.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function Bundle() {
  const [selectedCurrency, setSelectedCurrency] = useState(
    'Buy more and save 20%'
  );

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <div className="grid grid-cols-1 gap-6 rounded-md border-2 border-gray-100 p-8 shadow-xl sm:grid-cols-2">
      {/* Card 1 */}
      <AdvancedCheckbox
        name="currency"
        value="Buy more and save 20%"
        alignment="left"
        checked={selectedCurrency === 'Buy more and save 20%'}
        onChange={() => handleCurrencyChange('Buy more and save 20%')}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6 shadow-md transition hover:shadow-lg ${
          selectedCurrency === 'Buy more and save 20%'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300'
        }`}
      >
        <div className="relative">
          <span className="absolute -right-10 -top-4 rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
            20% OFF
          </span>
          <Image
            src={ecommerce}
            alt="ecommerce"
            className="mb-4 h-32 w-auto object-contain"
          />
        </div>
        <Text className="text-lg font-semibold text-gray-800">
          Classic Bundle
        </Text>
        <Text className="mt-2 text-center text-sm text-gray-500">
          Offer a discount when buying a group of specific products.
        </Text>
      </AdvancedCheckbox>

      {/* Card 2 */}

      <AdvancedCheckbox
        disabled
        name="currency"
        value="Frequently bought together"
        alignment="left"
        checked={selectedCurrency === 'Frequently bought together'}
        onChange={() => handleCurrencyChange('Frequently bought together')}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6 shadow-md transition hover:shadow-lg ${
          selectedCurrency === 'Frequently bought together'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300'
        }`}
      >
        <div className="relative">
          <span className="absolute -right-10 -top-4 rounded-full bg-gray-50 px-2 py-1 text-sm font-semibold text-gray-400">
            Frequently bought together
          </span>

          <Image
            src={shopping}
            alt="shopping"
            className="mb-4 h-32 w-auto object-contain"
          />
        </div>
        <Text className="text-lg font-semibold text-gray-800">
          AI Frequently bought together
        </Text>
        <Text className="mt-2 text-center text-sm text-gray-500">
          Sell products that are frequently bought together with a discount.
        </Text>
      </AdvancedCheckbox>

      {/* Card 3 */}
      <AdvancedCheckbox
        disabled
        name="currency"
        value="Related Items"
        alignment="left"
        checked={selectedCurrency === 'Related Items'}
        onChange={() => handleCurrencyChange('Related Items')}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6 shadow-md transition hover:shadow-lg ${
          selectedCurrency === 'Related Items'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300'
        }`}
      >
        <div className="relative">
          <span className="absolute -right-10 -top-4 rounded-full bg-gray-50 px-2 py-1 text-sm font-semibold text-gray-400">
            Related Items
          </span>

          <Image
            src={shopping2}
            alt="shopping2"
            className="mb-4 h-32 w-auto object-contain"
          />
        </div>
        <Text className="text-lg font-semibold text-gray-800">
          AI related Items
        </Text>
        <Text className="mt-2 text-left text-sm text-gray-500">
          Recommended alternative and complementary products with a discount.
        </Text>
      </AdvancedCheckbox>

      {/* Card 4 */}
      <AdvancedCheckbox
        disabled
        name="currency"
        value="Personalization"
        alignment="left"
        checked={selectedCurrency === 'Personalization'}
        onChange={() => handleCurrencyChange('Personalization')}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6 shadow-md transition hover:shadow-lg ${
          selectedCurrency === 'Personalization'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300'
        }`}
      >
        <div className="relative">
          <span className="absolute -right-10 -top-4 rounded-full bg-gray-50 px-2 py-1 text-sm font-semibold text-gray-400">
            Personalization
          </span>

          <Image
            src={shopping3}
            alt="shopping3"
            className="mb-4 h-32 w-auto object-contain"
          />
        </div>
        <Text className="text-lg font-semibold text-gray-800">
          AI Personalized bundle
        </Text>
        <Text className="mt-2 text-left text-sm text-gray-500">
          Recommended Personalized bundles with a discount based on
          shopper&rsquo;s history.
        </Text>
      </AdvancedCheckbox>
    </div>
  );
}
