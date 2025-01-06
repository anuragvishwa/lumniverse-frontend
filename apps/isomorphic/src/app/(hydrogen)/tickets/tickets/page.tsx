'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { ActionIcon, Button, Checkbox, Title } from 'rizzui';
import '../../sales/sales.css';
import {
  BiAlarmExclamation,
  BiCart,
  BiDollar,
  BiDollarCircle,
} from 'react-icons/bi';
import CreateCategoryModalView from '../../sales/learn-modal';

import { useModal } from '@/app/shared/modal-views/use-modal';
import CargoPallet from '@core/components/icons/cargo-pallet';
import { BsBack, BsSquareFill, BsTree } from 'react-icons/bs';
import { useState } from 'react';
import SquareBoxIcon from '@core/components/icons/square-box';
import { PiSquareBold, PiTextColumns } from 'react-icons/pi';
import { MdBorderAll } from 'react-icons/md';
import Popover from '@core/ui/carbon-menu/popover/popover';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import LoadingWorkflow from './loading';
import DateFiled from '@/app/shared/controlled-table/date-field';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import MeanLatency from './mean-latency';
import FirstResponse from './first-response';
import ResolutionTime from './resolution-time';

const pageHeader = {
  title: 'Tickets',
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
    title: 'Lead Magnet / Subscribe Form',
    description:
      "Automate your lead generation and collect Visitors' contact information.",
    uses: '29.3K',
  },
  {
    id: 2,
    category: 'Gather',
    title: 'Lead generation bot',
    description:
      'Engage and generate more leads. Collect e-mail addresses or phone numbers.',
    uses: '96.7K',
  },
  {
    id: 3,
    category: 'Nurture',
    title: 'News & Updates',
    description:
      'Keep your visitors up to date with your new offers and upcoming events.',
    uses: '3.1K',
  },
  {
    id: 4,
    category: 'Gather',
    title: 'Order a phone call',
    description:
      'Collect phone numbers to reach your customers by phone call or SMS.',
    uses: '24.8K',
  },
  {
    id: 5,
    category: 'Gather',
    title: 'Appointment booking',
    description: null,
  },
  {
    id: 6,
    category: 'Nurture',
    title: 'Boost Social Media',
    description: null,
  },
  {
    id: 7,
    category: 'Qualify',
    title: 'Lead Gen for Agency',
    description: null,
  },
  {
    id: 8,
    category: 'Qualify',
    title: 'Lead Gen For Beauty',
    description: null,
  },
  {
    id: 9,
    category: 'Gather',
    title: 'Lead Magnet / Subscribe Form',
    description:
      "Automate your lead generation and collect Visitors' contact information.",
    uses: '29.3K',
  },
  {
    id: 10,
    category: 'Gather',
    title: 'Lead generation bot',
    description:
      'Engage and generate more leads. Collect e-mail addresses or phone numbers.',
    uses: '96.7K',
  },
  {
    id: 11,
    category: 'Nurture',
    title: 'News & Updates',
    description:
      'Keep your visitors up to date with your new offers and upcoming events.',
    uses: '3.1K',
  },
  {
    id: 12,
    category: 'Gather',
    title: 'Order a phone call',
    description:
      'Collect phone numbers to reach your customers by phone call or SMS.',
    uses: '24.8K',
  },
  {
    id: 13,
    category: 'Gather',
    title: 'Appointment booking',
    description: null,
  },
  {
    id: 14,
    category: 'Nurture',
    title: 'Boost Social Media',
    description: null,
  },
  {
    id: 15,
    category: 'Qualify',
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
      <div className="mb-4">
        <DateFiled />
      </div>
      <LoadingWorkflow />
      <div className="mt-4 @container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-4 3xl:gap-8">
          <MeanLatency className="@7xl:col-span-2" />
          <FirstResponse className="@7xl:col-span-2" />
        </div>
      </div>{' '}
      <div className="mt-4 @container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-4 3xl:gap-8">
          <ResolutionTime className="@7xl:col-span-2" />
        </div>
      </div>
    </div>
  );
}
