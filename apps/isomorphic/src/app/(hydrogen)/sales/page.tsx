'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { ActionIcon, Button, Checkbox, Title } from 'rizzui';
import './sales.css';
import {
  BiAlarmExclamation,
  BiCart,
  BiDollar,
  BiDollarCircle,
} from 'react-icons/bi';
import CreateCategoryModalView from './learn-modal';

import { useModal } from '@/app/shared/modal-views/use-modal';
import CargoPallet from '@core/components/icons/cargo-pallet';
import { BsBack, BsSquareFill, BsTree } from 'react-icons/bs';
import { useState } from 'react';
import SquareBoxIcon from '@core/components/icons/square-box';
import { PiSquareBold, PiTextColumns } from 'react-icons/pi';
import { MdBorderAll } from 'react-icons/md';
import Popover from '@core/ui/carbon-menu/popover/popover';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';

const pageHeader = {
  title: 'Proactive sales skills',
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

const cardData = [
  {
    id: 1,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Proactive Welcome Message',
    description:
      'Message everyone who enters your site for the first time and increase engagement by 400%.',
  },
  {
    id: 2,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Product Recommendation',
    description: 'Sell more by recommending hot deals and cross-sell offers.',
  },
  {
    id: 3,
    category: 'Close Deals',
    icon: <BiCart />,
    title: 'Cart Booster',
    description:
      'Convince your customers to buy with a small discount in the cart.',
  },
  {
    id: 4,
    category: 'Win Back',
    icon: <BsBack />,
    title: 'Customer Winback',
    description: "Reach out to customers who haven't visited in a while.",
  },
  {
    id: 5,
    category: 'Rearrange',
    icon: <BsTree />,
    title: 'Reorder Reminder',
    description: 'Remind customers to reorder their favorite items.',
  },
  {
    id: 6,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Proactive Welcome Message',
    description:
      'Message everyone who enters your site for the first time and increase engagement by 400%.',
  },
  {
    id: 7,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Product Recommendation',
    description: 'Sell more by recommending hot deals and cross-sell offers.',
  },
  {
    id: 8,
    category: 'Close Deals',
    icon: <BiCart />,
    title: 'Cart Booster',
    description:
      'Convince your customers to buy with a small discount in the cart.',
  },
  {
    id: 9,
    category: 'Win Back',
    icon: <BsBack />,
    title: 'Customer Winback',
    description: "Reach out to customers who haven't visited in a while.",
  },
  {
    id: 10,
    category: 'Rearrange',
    icon: <BsTree />,
    title: 'Reorder Reminder',
    description: 'Remind customers to reorder their favorite items.',
  },
  {
    id: 11,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Proactive Welcome Message',
    description:
      'Message everyone who enters your site for the first time and increase engagement by 400%.',
  },
  {
    id: 12,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Product Recommendation',
    description: 'Sell more by recommending hot deals and cross-sell offers.',
  },
  {
    id: 13,
    category: 'Close Deals',
    icon: <BiCart />,
    title: 'Cart Booster',
    description:
      'Convince your customers to buy with a small discount in the cart.',
  },
  {
    id: 14,
    category: 'Win Back',
    icon: <BsBack />,
    title: 'Customer Winback',
    description: "Reach out to customers who haven't visited in a while.",
  },
  {
    id: 15,
    category: 'Rearrange',
    icon: <BsTree />,
    title: 'Reorder Reminder',
    description: 'Remind customers to reorder their favorite items.',
  },
  {
    id: 16,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Proactive Welcome Message',
    description:
      'Message everyone who enters your site for the first time and increase engagement by 400%.',
  },
  {
    id: 17,
    category: 'Upskills',
    icon: <BiDollarCircle />,
    title: 'Product Recommendation',
    description: 'Sell more by recommending hot deals and cross-sell offers.',
  },
  {
    id: 18,
    category: 'Close Deals',
    icon: <BiCart />,
    title: 'Cart Booster',
    description:
      'Convince your customers to buy with a small discount in the cart.',
  },
  {
    id: 19,
    category: 'Win Back',
    icon: <BsBack />,
    title: 'Customer Winback',
    description: "Reach out to customers who haven't visited in a while.",
  },
  {
    id: 20,
    category: 'Rearrange',
    icon: <BsTree />,
    title: 'Reorder Reminder',
    description: 'Remind customers to reorder their favorite items.',
  },
];

export default function SearchTablePage() {
  const [filter, setFilter] = useState('All');

  const filteredData =
    filter === 'All'
      ? cardData
      : cardData.filter((card) => card.category === filter);

  const { openModal } = useModal();
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            size="sm"
            className="border-gradient-to-r mt-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
          >
            Help
          </Button>
        </div>
      </PageHeader>

      <div className="mb-6 flex flex-col items-start justify-start space-y-4 md:flex-row md:space-y-0">
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-start gap-4">
          {[
            { name: 'All', icon: <MdBorderAll /> },
            { name: 'Upskills', icon: <BiDollarCircle /> },
            { name: 'Close Deals', icon: <BiCart /> },
            { name: 'Win Back', icon: <BsBack /> },
            { name: 'Rearrange', icon: <BsTree /> },
          ].map((category) => (
            <Button
              size="sm"
              key={category.name}
              className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${
                filter === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setFilter(category.name)}
            >
              {category.icon && <span>{category.icon}</span>}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Popover for Toggle Columns */}
      </div>

      <div className="mb-6">
        <EcommerceDashboard />
      </div>
      {/* <div className="dynamic-card mb-6">
        <div className="card-details">
          <p className="absolute left-6 top-4">
            <span className="text-body flex items-center gap-1">
              <BiDollarCircle /> Upskills
            </span>
          </p>
          <p className="text-title">Dynamic product recommendations</p>
          <p className="text-body">
            Boost sales by suggesting related products to items recently added
            to the cart.
          </p>
        </div>
        <button
          className="card-button"
          onClick={() => {
            openModal({
              view: <CreateCategoryModalView />,
              customSize: '720px',
            });
          }}
        >
          Learn More
        </button>
      </div> */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {filteredData.map((card) => (
          <div className="card relative rounded-md border p-4" key={card.id}>
            {/* Optionally adjust absolute positioning if needed for responsiveness */}
            <div className="card-details mb-4">
              <p className="absolute left-4 top-4">
                <span className="text-body flex items-center gap-1">
                  {card.icon} {card.category}
                </span>
              </p>
              <p className="text-title mt-10">{card.title}</p>
              <p className="text-body mt-2">{card.description}</p>
            </div>
            <button
              className="card-button rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              onClick={() => {
                openModal({
                  view: <CreateCategoryModalView />,
                  customSize: '720px',
                });
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* 
      <BasicTableWidget
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        searchPlaceholder="Search order..."
        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      /> */}
    </div>
  );
}
