'use client';

import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button, Input, Tab } from 'rizzui';
import { RiGuideLine } from 'react-icons/ri';
import {
  PiBookBold,
  PiMagnifyingGlass,
  PiPause,
  PiPlayBold,
  PiStar,
  PiStarBold,
} from 'react-icons/pi';
import { BiSolidSquare, BiSquare } from 'react-icons/bi';
import { FaFilter, FaSearch, FaSyncAlt } from 'react-icons/fa';
import { Accordion } from 'rizzui';
import { BiChevronDown } from 'react-icons/bi';
import cn from '@core/utils/class-names';
import BasicTableWidget from './table';
import { orderData } from '@/data/order-data';
import { getColumns as getOrderColumns } from './getColumns';
import ProductCard from './product-card';

const pageHeader = {
  title: 'Recommendation widgets',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Video tutorials',
      icon: <PiPlayBold />,
    },
    {
      name: 'User guide',
      icon: <PiBookBold />,
    },
    {
      name: 'Best practices',
      icon: <PiStarBold />,
    },
    {
      name: 'How to add widget to theme',
      icon: <BiSolidSquare />,
    },
  ],
};
const data = [
  {
    title: 'Homepage',
    content: (
      <BasicTableWidget
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getOrderColumns}
        enableSearch={false}
      />
    ),
  },
  {
    title: 'Product Page',
    content: (
      <BasicTableWidget
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getOrderColumns}
        enableSearch={false}
      />
    ),
  },
  {
    title: 'Collection Page',
    content: (
      <BasicTableWidget
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getOrderColumns}
        enableSearch={false}
      />
    ),
  },
  {
    title: 'Cart Page',
    content: (
      <BasicTableWidget
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getOrderColumns}
        enableSearch={false}
      />
    ),
  },
];

export default function RecommendationWidgets() {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className="inline-flex">
            <Button as="span"> Add new widget</Button>
          </Button>
        </div>
      </PageHeader>
      <div className="my-4">
        <ProductCard />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-96">
          <Input
            variant="outline"
            prefix={<FaSearch />}
            size="sm"
            type="text"
            placeholder="Search by Widget name or Widget ID"
            // className="w-full rounded-lg border py-2 pl-10 pr-4 shadow-sm focus:border-blue-300 focus:outline-none focus:ring"
          />
          {/* <FaSearch className="absolute left-3 top-2.5 text-gray-400" /> */}
        </div>

        <div className="flex space-x-4">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            <FaFilter className="mr-2" /> Filter
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            <FaSyncAlt className="mr-2" /> Refresh
          </Button>
        </div>
      </div>
      <Tab className="border-2 border-gray-50 p-4 shadow-lg">
        <Tab.List>
          <Tab.ListItem>Live</Tab.ListItem>
          <Tab.ListItem>Draft</Tab.ListItem>
          <Tab.ListItem>Archive</Tab.ListItem>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {' '}
            <div className="p-8 text-center">
              <PiMagnifyingGlass className="mx-auto h-6 w-6" />
              <h2 className="text-lg font-semibold text-gray-700">
                You have not launched any widgets yet
              </h2>
              <p className="text-gray-500">
                Start creating and launching them to your stores now!
              </p>
              <Button
                size="sm"
                variant="solid"
                rounded="md"
                className="mt-4 px-4 py-2"
              >
                Add new widget
              </Button>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            {' '}
            {data.map((item) => (
              <Accordion key={item.title} className="mx-4">
                <Accordion.Header>
                  {({ open }) => (
                    <div className="flex w-full cursor-pointer items-center justify-between py-5 text-sm font-semibold">
                      {item.title}
                      <BiChevronDown
                        className={cn(
                          'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                          open && '-rotate-0'
                        )}
                      />
                    </div>
                  )}
                </Accordion.Header>
                <Accordion.Body className="mb-7">{item.content}</Accordion.Body>
              </Accordion>
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {' '}
            <div className="p-8 text-center">
              <PiMagnifyingGlass className="mx-auto h-6 w-6" />
              <h2 className="text-lg font-semibold text-gray-700">
                Widget that you archived will appear here
              </h2>
              <p className="text-gray-500">
                Archived widget can still be restored when you need it
              </p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}
