'use client';

import { routes } from '@/config/routes';
import { ActionIcon, Button, Checkbox, Text, Title } from 'rizzui';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { HiMagnifyingGlassCircle } from 'react-icons/hi2';
import FeatureCard from '../ai-powered-search/feature-card';
import welcomeImg from '@public/shop-illustration.png';
import { useRouter } from 'next/navigation';
import TableRowDnd from './table';
import FeatureTable from './featureTable';
const pageHeader = {
  title: (
    <div className="flex items-center gap-2">
      <span>Search Control</span>
    </div>
  ),
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Search',
    },
  ],
};

const features = [
  {
    title: 'Personalization (Professional plans)',
    description:
      "Show results dedicated to shoppers' preferences and make them feel appreciated.",
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'Product performance ranking',
    description:
      'Automatically spotlight your winning products to boost click rates and engagement.',
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'Semantic search',
    description:
      'Decode the meaning and context of the search terms to return the most relevant results.',
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'AI synonyms',
    description:
      'Expand search with auto-generated synonyms, ensuring "no results" is a thing of the past.',
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'Scoped suggestion',
    description:
      'Suggest results within collections, vendors, or categories for a faster, more efficient search.',
    image: '../../../../public/shop-illustration.png',
  },
];

export default function SearchControl() {
  const route = useRouter();
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Title as="h4">{pageHeader.title}</Title>
        <Button
          size="sm"
          className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
          onClick={() => route.push('/search/search-control/test-your-search')}
        >
          <HiMagnifyingGlassCircle className="h-5 w-5" /> Test your search
        </Button>
      </div>
      <div className="mb-10">
        <Text as="p">
          AI-powered site search solutions that deliver a seamless and
          personalized shopping experience.
        </Text>
      </div>

      <div className="mb-10 flex items-center justify-center bg-gray-100">
        <div className="relative flex items-start rounded-lg border border-gray-300 bg-yellow-100 p-6 shadow-lg">
          {/* Close Icon */}
          <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="flex-grow">
            <h2 className="mb-2 text-xl font-bold">
              🚀 Unleash the AI beast to achieve greater business success!
            </h2>
            <p className="mb-4 text-gray-700">
              It&apos;s time to let your customers{' '}
              <strong>search with their natural language</strong>.
            </p>
            <p className="mb-4 text-gray-700">
              Cutting-edge AI search with{' '}
              <strong>performance re-ranking</strong>,{' '}
              <strong>semantic search</strong>,{' '}
              <strong>auto-generated synonyms</strong>, and more ensures your
              customers easily find what they need, with{' '}
              <strong>minimal management required</strong> from your end.
            </p>
            <p className="mb-6 text-gray-700">
              Harness AI auto-configuration and see sales rise, costs reduced,
              and a boost in customer satisfaction.
            </p>

            {/* Button */}
            <div className="flex items-center gap-2">
              <button className="flex items-center rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlock with a free trial
              </button>

              {/* Learn More */}
              <a href="#" className="ml-4 text-blue-500 hover:underline">
                Learn more
              </a>
            </div>
          </div>

          {/* Image on the Right */}
          <div className="ml-6"></div>
        </div>
      </div>
      <p className="text-md mb-6 font-semibold">
        Here are the features that impact the search engine on your storefront.
      </p>
      <FeatureTable />
    </div>
  );
}
