'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { ActionIcon, Button, Checkbox, Title } from 'rizzui';
import '../sales/sales.css';
import {
  BiAlarmExclamation,
  BiBookmarkAlt,
  BiCart,
  BiDollar,
  BiDollarCircle,
} from 'react-icons/bi';
import CreateCategoryModalView from '../sales/learn-modal';

import { useModal } from '@/app/shared/modal-views/use-modal';
import CargoPallet from '@core/components/icons/cargo-pallet';
import { BsBack, BsSquareFill, BsTree, BsTriangle } from 'react-icons/bs';
import { useState } from 'react';
import SquareBoxIcon from '@core/components/icons/square-box';
import { PiHandWavingBold, PiSquareBold, PiTextColumns } from 'react-icons/pi';
import { MdBorderAll } from 'react-icons/md';
import Popover from '@core/ui/carbon-menu/popover/popover';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { FcSelfServiceKiosk, FcServiceMark } from 'react-icons/fc';

const pageHeader = {
  title: 'Support  Flows',
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
    category: 'Triage',
    icon: <BsTriangle />,
    title: 'Handle missed conversations',
    description:
      'Never leave anyone without a reply. Build trust, and your mailing list.',
    uses: '48.6K',
    sampleMessage:
      "Sorry for keeping you waiting, we'll get back to you as soon as possible. Thank you for your patience.",
  },
  {
    id: 2,
    category: 'Self-service',
    icon: <FcServiceMark />,
    title: 'AI Responder',
    description:
      'Automate up to 75% repetitive questions like "hi", "where can I ..." to save time.',
    uses: '31.3K',
  },
  {
    id: 3,
    category: 'Triage',
    icon: <BsTriangle />,
    title: 'Respond to greetings (AI)',
    description: 'Set up automatic greeting messages & say hello to everyone.',
    uses: '15.7K',
  },
  {
    id: 4,
    category: 'Self-service',
    icon: <FcServiceMark />,
    title: 'Automate Repetitive Answers',
    description: null,
  },
  {
    id: 5,
    category: 'Initiate',
    icon: <PiHandWavingBold />,
    title: 'Reactive Welcome Message',
    description: null,
  },
  {
    id: 6,
    category: 'Initiate',
    icon: <PiHandWavingBold />,
    title: 'Leaving the page',
    description:
      'Be sure your buyers gets the answers they need before leaving.',
  },
  {
    id: 7,
    category: 'Deflect',
    icon: <BiBookmarkAlt />,
    title: 'FAQ for Online Store',
    description: 'Provide answers to frequently asked questions.',
  },
  {
    id: 8,
    category: 'Triage',
    icon: <BsTriangle />,
    title: 'Handle missed conversations',
    description:
      'Never leave anyone without a reply. Build trust, and your mailing list.',
    uses: '48.6K',
    sampleMessage:
      "Sorry for keeping you waiting, we'll get back to you as soon as possible. Thank you for your patience.",
  },
  {
    id: 9,
    category: 'Triage',
    icon: <BsTriangle />,
    title: 'Handle missed conversations',
    description:
      'Never leave anyone without a reply. Build trust, and your mailing list.',
    uses: '48.6K',
    sampleMessage:
      "Sorry for keeping you waiting, we'll get back to you as soon as possible. Thank you for your patience.",
  },
  {
    id: 10,
    category: 'Self-service',
    icon: <FcServiceMark />,
    title: 'AI Responder',
    description:
      'Automate up to 75% repetitive questions like "hi", "where can I ..." to save time.',
    uses: '31.3K',
  },
  {
    id: 11,
    category: 'Triage',
    icon: <BsTriangle />,
    title: 'Respond to greetings (AI)',
    description: 'Set up automatic greeting messages & say hello to everyone.',
    uses: '15.7K',
  },
  {
    id: 12,
    category: 'Self-service',
    icon: <FcServiceMark />,
    title: 'Automate Repetitive Answers',
    description: null,
  },
  {
    id: 13,
    category: 'Initiate',
    icon: <PiHandWavingBold />,
    title: 'Reactive Welcome Message',
    description: null,
  },
  {
    id: 14,
    category: 'Initiate',
    icon: <PiHandWavingBold />,
    title: 'Leaving the page',
    description:
      'Be sure your buyers gets the answers they need before leaving.',
  },
  {
    id: 15,
    category: 'Deflect',
    icon: <BiBookmarkAlt />,
    title: 'FAQ for Online Store',
    description: 'Provide answers to frequently asked questions.',
  },
  {
    id: 16,
    category: 'Triage',
    icon: <BsTriangle />,
    title: 'Handle missed conversations',
    description:
      'Never leave anyone without a reply. Build trust, and your mailing list.',
    uses: '48.6K',
    sampleMessage:
      "Sorry for keeping you waiting, we'll get back to you as soon as possible. Thank you for your patience.",
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

      <div className="mb-6 flex items-center justify-between">
        <div className="flex justify-center space-x-4">
          {[
            { name: 'All', icon: <MdBorderAll /> },
            { name: 'Deflect', icon: <BiBookmarkAlt /> },
            { name: 'Initiate', icon: <PiHandWavingBold /> },
            { name: 'Triage', icon: <BsTriangle /> },
            { name: 'Self-service', icon: <FcServiceMark /> },
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
        <Popover>
          <Popover.Trigger>
            <ActionIcon
              variant="outline"
              title={'Toggle Columns'}
              className="h-auto w-auto p-1"
            >
              <PiTextColumns strokeWidth={3} className="size-6" />
            </ActionIcon>
          </Popover.Trigger>
          <Popover.Content className="z-0">
            <div className="p-2 text-left rtl:text-right">
              <Title as="h6" className="mb-6 px-0.5 text-sm font-semibold">
                Toggle Columns
              </Title>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'All', icon: <MdBorderAll /> },
                  { name: 'Deflect', icon: <BiBookmarkAlt /> },
                  { name: 'Initiate', icon: <PiHandWavingBold /> },
                  { name: 'Triage', icon: <BsTriangle /> },
                  { name: 'Self-service', icon: <FcServiceMark /> },
                ].map((category) => (
                  <Checkbox
                    key={category.name}
                    label={
                      <div className="flex items-center space-x-2">
                        {category.icon && <span>{category.icon}</span>}
                        <span>{category.name}</span>
                      </div>
                    }
                    checked={filter === category.name}
                    onChange={() => setFilter(category.name)}
                  />
                ))}
              </div>
            </div>
          </Popover.Content>
        </Popover>
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {filteredData.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-details">
              <p className="absolute left-6 top-4">
                <span className="text-body flex items-center gap-1">
                  {card.icon} {card.category}
                </span>
              </p>
              <p className="text-title">{card.title}</p>
              <p className="text-body">{card.description}</p>
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
