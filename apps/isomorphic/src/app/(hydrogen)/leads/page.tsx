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
  BiCart,
  BiDollar,
  BiDollarCircle,
} from 'react-icons/bi';
import CreateCategoryModalView from '../sales/learn-modal';

import { useModal } from '@/app/shared/modal-views/use-modal';
import CargoPallet from '@core/components/icons/cargo-pallet';
import {
  BsBack,
  BsPersonBadgeFill,
  BsSquareFill,
  BsTree,
} from 'react-icons/bs';
import { useState } from 'react';
import SquareBoxIcon from '@core/components/icons/square-box';
import { PiHandHeartBold, PiSquareBold, PiTextColumns } from 'react-icons/pi';
import { MdBorderAll, MdHighQuality } from 'react-icons/md';
import Popover from '@core/ui/carbon-menu/popover/popover';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';

const pageHeader = {
  title: 'Leads Flow',
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
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Lead Magnet / Subscribe Form',
    description:
      "Automate your lead generation and collect Visitors' contact information.",
    uses: '29.3K',
  },
  {
    id: 2,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Lead generation bot',
    description:
      'Engage and generate more leads. Collect e-mail addresses or phone numbers.',
    uses: '96.7K',
  },
  {
    id: 3,
    category: 'Nurture',
    icon: <PiHandHeartBold />,
    title: 'News & Updates',
    description:
      'Keep your visitors up to date with your new offers and upcoming events.',
    uses: '3.1K',
  },
  {
    id: 4,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Order a phone call',
    description:
      'Collect phone numbers to reach your customers by phone call or SMS.',
    uses: '24.8K',
  },
  {
    id: 5,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Appointment booking',
    description: null,
  },
  {
    id: 6,
    category: 'Nurture',
    icon: <PiHandHeartBold />,
    title: 'Boost Social Media',
    description: null,
  },
  {
    id: 7,
    category: 'Qualify',
    icon: <MdHighQuality />,
    title: 'Lead Gen for Agency',
    description: null,
  },
  {
    id: 8,
    category: 'Qualify',
    icon: <MdHighQuality />,
    title: 'Lead Gen For Beauty',
    description: null,
  },
  {
    id: 9,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Lead Magnet / Subscribe Form',
    description:
      "Automate your lead generation and collect Visitors' contact information.",
    uses: '29.3K',
  },
  {
    id: 10,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Lead generation bot',
    description:
      'Engage and generate more leads. Collect e-mail addresses or phone numbers.',
    uses: '96.7K',
  },
  {
    id: 11,
    category: 'Nurture',
    icon: <PiHandHeartBold />,
    title: 'News & Updates',
    description:
      'Keep your visitors up to date with your new offers and upcoming events.',
    uses: '3.1K',
  },
  {
    id: 12,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Order a phone call',
    description:
      'Collect phone numbers to reach your customers by phone call or SMS.',
    uses: '24.8K',
  },
  {
    id: 13,
    category: 'Gather',
    icon: <BsPersonBadgeFill />,
    title: 'Appointment booking',
    description: null,
  },
  {
    id: 14,
    category: 'Nurture',
    icon: <PiHandHeartBold />,
    title: 'Boost Social Media',
    description: null,
  },
  {
    id: 15,
    category: 'Qualify',
    icon: <MdHighQuality />,
    title: 'Lead Gen for Agency',
    description: null,
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
            { name: 'Gather', icon: <BsPersonBadgeFill /> },
            { name: 'Nurture', icon: <PiHandHeartBold /> },
            { name: 'Qualify', icon: <MdHighQuality /> },
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
                  { name: 'Gather', icon: <BsPersonBadgeFill /> },
                  { name: 'Nurture', icon: <PiHandHeartBold /> },
                  { name: 'Qualify', icon: <MdHighQuality /> },
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
