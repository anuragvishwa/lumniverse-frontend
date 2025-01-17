import { useState, useEffect } from 'react';
import { FaHome, FaShoppingCart, FaTag } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import HomepageContent from './homePageContent';
import ProductpageContent from './productPageContent';

export default function RecommendationType() {
  const tabs = [
    {
      id: 'Homepage',
      label: 'Homepage',
      icon: <FaHome />,
      content: <HomepageContent />,
    },
    {
      id: 'Product page',
      label: 'Product page',
      icon: <FaTag />,
      content: <ProductpageContent />,
    },
    {
      id: 'Collection page',
      label: 'Collection page',
      icon: <FiShoppingBag />,
      content: <HomepageContent />,
    },
    {
      id: 'cartpage',
      label: 'Cart page',
      icon: <FaShoppingCart />,
      content: <ProductpageContent />,
    },
  ];

  // Initialize the selectedTab from localStorage or set to the first tab by default
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return localStorage.getItem('selectedTab') || 'Homepage';
  });

  // Sync selectedTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);

  // Handle tab click and update selected tab
  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="rounded-md border-2 border-gray-100 p-8 shadow-xl">
      <div className="w-full space-y-4">
        <p className="font-medium">
          1. Select a page type to set up the widget
        </p>

        <div className="flex w-full space-x-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)} // Update localStorage on click
              className={`flex h-24 flex-grow cursor-pointer flex-col items-center justify-center rounded-lg border ${
                selectedTab === tab.id
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-200 bg-white'
              } transition duration-150 hover:bg-blue-50`}
            >
              <div
                className={`text-2xl ${
                  selectedTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`mt-2 ${
                  selectedTab === tab.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
          {tabs.find((tab) => tab.id === selectedTab)?.content}
        </div>
      </div>
    </div>
  );
}
