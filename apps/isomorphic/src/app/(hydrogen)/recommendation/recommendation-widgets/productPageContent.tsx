import React, { useEffect, useState } from 'react';
import { FaHome, FaShoppingCart, FaTag } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineViewList, MdOutlineVisibility } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { Radio } from 'rizzui';

const recommendationOptions = [
  {
    id: 'frequentlyBought',
    label: 'Frequently bought together',
    description:
      'Recommend products that others bought, based on items added to the customer’s cart.',
    icon: <AiFillLike />,
  },
  {
    id: 'personalized',
    label: 'Personalized recommendation',
    description:
      'Recommend products based on historical data and shopping behavior.',
  },
  {
    id: 'mostViewed',
    label: 'Most viewed',
    description:
      'Recommend the top items that are viewed most by customers in your store within 30 days.',
  },
  {
    id: 'recentlyViewed',
    label: 'Recently viewed',
    description:
      'Recommend products that have been recently viewed by the customer.',
  },
  {
    id: 'newArrivals',
    label: 'Newest arrivals',
    description:
      'Recommend products that have been recently added and published to the store.',
  },
  {
    id: 'bestsellers',
    label: 'Bestsellers',
    description:
      'Recommend the top items that are purchased most by customers in your store within 30 days.',
  },
  {
    id: 'handpicked',
    label: 'Hand-picked products',
    description: 'Recommend products that are manually chosen by the merchant.',
  },
  {
    id: 'trending',
    label: 'Trending products',
    description:
      'Recommend high-demand products your customers viewed or purchased within 7 days.',
  },
];

export default function ProductpageContent() {
  const [selectedRadio, setSelectedRadio] = useState<string>(() => {
    return (
      localStorage.getItem('selectedRadio') || recommendationOptions[0].label
    );
  });

  // Save selected radio to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedRadio', selectedRadio);
  }, [selectedRadio]);

  const handleRadioChange = (label: string) => {
    setSelectedRadio(label);
  };

  return (
    <div className="space-y-4">
      <p className="font-medium">
        2. Select a recommendation type for the widget
      </p>
      <div className="grid grid-cols-2 gap-4">
        {recommendationOptions.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-start space-x-3 rounded-lg border p-4 hover:bg-gray-50"
            onClick={() => handleRadioChange(option.label)} // Update selected radio
          >
            <Radio
              size="sm"
              name="recommendationType"
              className="mt-1"
              checked={selectedRadio === option.label} // Check the radio if it's selected
              onChange={() => handleRadioChange(option.label)}
            />
            <div>
              <div className="flex items-center space-x-2">
                {option.icon}
                <span className="font-medium">{option.label}</span>
              </div>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
