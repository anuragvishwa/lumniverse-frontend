'use client';

import { routes } from '@/config/routes';
import { ActionIcon, Button, Checkbox, Tab, Text, Title } from 'rizzui';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { HiMagnifyingGlassCircle } from 'react-icons/hi2';
import FeatureCard from '../ai-powered-search/feature-card';
import welcomeImg from '@public/shop-illustration.png';
import { useRouter } from 'next/navigation';
import { PiBookBold, PiPlayBold, PiStarBold } from 'react-icons/pi';
import { BiSolidSquare } from 'react-icons/bi';
import PageHeader from '@/app/shared/page-header';
import { SiSimpleanalytics } from 'react-icons/si';
import FolderIcon from '@core/components/icons/folder-solid';
import Relevance from './relevance';

const pageHeader = {
  title: (
    <div className="flex items-center gap-2">
      <span>Standard Search</span>
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

const tabHeader = {
  title: 'Relevance Settings',
  breadcrumb: [
    {
      name: 'User guide',
      icon: <PiBookBold />,
    },
    {
      name: 'Analytics',
      icon: <SiSimpleanalytics />,
    },
  ],
};

export default function SearchControl() {
  const route = useRouter();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Title as="h4">{pageHeader.title}</Title>

        <Button
          size="sm"
          className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
          onClick={() => route.push('/search/search-control/test-your-search')}
        >
          <HiMagnifyingGlassCircle className="h-5 w-5" /> Test your search
        </Button>
      </div>
      <Tab vertical className="rounded-md p-4 shadow-lg">
        <Tab.List className="w-1/4 border-r border-gray-200 bg-gray-50">
          <Tab.ListItem
            className={({ selected }) =>
              selected
                ? 'rounded-lg bg-gray-100 p-2 font-bold text-green-600'
                : 'rounded-lg p-2 text-gray-600 hover:bg-gray-100'
            }
          >
            Relevance settings
          </Tab.ListItem>
          <Tab.ListItem
            className={({ selected }) =>
              selected
                ? 'rounded-lg bg-gray-100 p-2 font-bold text-green-600'
                : 'rounded-lg p-2 text-gray-600 hover:bg-gray-100'
            }
          >
            Instant search widget
          </Tab.ListItem>
          <Tab.ListItem
            className={({ selected }) =>
              selected
                ? 'rounded-lg bg-gray-100 p-2 font-bold text-green-600'
                : 'rounded-lg p-2 text-gray-600 hover:bg-gray-100'
            }
          >
            Search results page
          </Tab.ListItem>
          <Tab.ListItem
            className={({ selected }) =>
              selected
                ? 'rounded-lg bg-gray-100 p-2 font-bold text-green-600'
                : 'rounded-lg p-2 text-gray-600 hover:bg-gray-100'
            }
          >
            In-collection search
          </Tab.ListItem>
          <Tab.ListItem
            className={({ selected }) =>
              selected
                ? 'rounded-lg bg-gray-100 p-2 font-bold text-green-600'
                : 'rounded-lg p-2 text-gray-600 hover:bg-gray-100'
            }
          >
            Suggestion dictionary
          </Tab.ListItem>
        </Tab.List>

        <Tab.Panels className="w-3/4">
          <Tab.Panel>
            <PageHeader
              title={tabHeader.title}
              breadcrumb={tabHeader.breadcrumb}
            >
              {' '}
              <Button size="sm" variant="outline">
                Save Settings
              </Button>{' '}
            </PageHeader>
            <div className="mb-10 flex items-center justify-center bg-gray-100">
              <div className="relative flex items-start rounded-lg border border-gray-300 bg-blue-50 p-6 shadow-lg">
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
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    <FolderIcon className="h-5 w-5" /> Customize attributes and
                    set priority for better search relevance
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Enable the below product attribute to make it be searched in
                    a query. You can leverage <strong>High</strong> ,{' '}
                    <strong>Normal</strong> or <strong>Low</strong> to define
                    its priority of affecting search results.
                    <strong>High</strong>
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2">
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
            <Relevance />
          </Tab.Panel>
          <Tab.Panel>
            <PageHeader
              title={tabHeader.title}
              breadcrumb={tabHeader.breadcrumb}
            >
              {' '}
              <Button size="sm" variant="outline">
                Save Settings
              </Button>{' '}
            </PageHeader>
            <div className="mb-10 flex items-center justify-center bg-gray-100">
              <div className="relative flex items-start rounded-lg border border-gray-300 bg-blue-50 p-6 shadow-lg">
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
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    <FolderIcon className="h-5 w-5" /> Customize attributes and
                    set priority for better search relevance
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Enable the below product attribute to make it be searched in
                    a query. You can leverage <strong>High</strong> ,{' '}
                    <strong>Normal</strong> or <strong>Low</strong> to define
                    its priority of affecting search results.
                    <strong>High</strong>
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2">
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
          </Tab.Panel>
          <Tab.Panel>
            <PageHeader
              title={tabHeader.title}
              breadcrumb={tabHeader.breadcrumb}
            >
              {' '}
              <Button size="sm" variant="outline">
                Save Settings
              </Button>{' '}
            </PageHeader>
            <div className="mb-10 flex items-center justify-center bg-gray-100">
              <div className="relative flex items-start rounded-lg border border-gray-300 bg-blue-50 p-6 shadow-lg">
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
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    <FolderIcon className="h-5 w-5" /> Customize attributes and
                    set priority for better search relevance
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Enable the below product attribute to make it be searched in
                    a query. You can leverage <strong>High</strong> ,{' '}
                    <strong>Normal</strong> or <strong>Low</strong> to define
                    its priority of affecting search results.
                    <strong>High</strong>
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2">
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
          </Tab.Panel>
          <Tab.Panel>
            <PageHeader
              title={tabHeader.title}
              breadcrumb={tabHeader.breadcrumb}
            >
              {' '}
              <Button size="sm" variant="outline">
                Save Settings
              </Button>{' '}
            </PageHeader>
            <div className="mb-10 flex items-center justify-center bg-gray-100">
              <div className="relative flex items-start rounded-lg border border-gray-300 bg-blue-50 p-6 shadow-lg">
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
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    <FolderIcon className="h-5 w-5" /> Customize attributes and
                    set priority for better search relevance
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Enable the below product attribute to make it be searched in
                    a query. You can leverage <strong>High</strong> ,{' '}
                    <strong>Normal</strong> or <strong>Low</strong> to define
                    its priority of affecting search results.
                    <strong>High</strong>
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2">
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
          </Tab.Panel>
          <Tab.Panel>
            <PageHeader
              title={tabHeader.title}
              breadcrumb={tabHeader.breadcrumb}
            >
              {' '}
              <Button size="sm" variant="outline">
                Save Settings
              </Button>{' '}
            </PageHeader>
            <div className="mb-10 flex items-center justify-center bg-gray-100">
              <div className="relative flex items-start rounded-lg border border-gray-300 bg-blue-50 p-6 shadow-lg">
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
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                    <FolderIcon className="h-5 w-5" /> Customize attributes and
                    set priority for better search relevance
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Enable the below product attribute to make it be searched in
                    a query. You can leverage <strong>High</strong> ,{' '}
                    <strong>Normal</strong> or <strong>Low</strong> to define
                    its priority of affecting search results.
                    <strong>High</strong>
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2">
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
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}
