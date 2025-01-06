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
import { orderData } from '@/data/order-data';
import ProductCard from './product-card';
import { MdAnalytics } from 'react-icons/md';

import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateCategoryModalView from '../../ai-training/faq/faqModal';
import Bundle from './bundle';

const pageHeader = {
  title: 'Predictive bundles',
  breadcrumb: [
    {
      name: 'User guide',
      icon: <PiBookBold />,
    },
    {
      name: 'Analytics',
      icon: <MdAnalytics />,
    },
  ],
};

export default function PredictiveBundle() {
  const { openModal } = useModal();
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className="inline-flex">
            <Button
              as="span"
              onClick={() => {
                openModal({
                  view: <CreateCategoryModalView />,
                  customSize: '720px',
                });
              }}
            >
              {' '}
              Add new bundle
            </Button>
          </Button>
        </div>
      </PageHeader>
      <div className="my-4 mt-8">
        <ProductCard />
        <Bundle />
      </div>

      <div className="rounded-md border-2 border-gray-100 shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2 pt-4">
          <div className="relative ml-auto w-96">
            <Input
              variant="outline"
              prefix={<FaSearch />}
              size="sm"
              type="text"
              placeholder="Search by name or ID"
            />
          </div>
        </div>
        <div className="p-8 text-center">
          <PiMagnifyingGlass className="mx-auto h-6 w-6" />
          <h2 className="text-lg font-semibold text-gray-700">
            You have not created any bundles yet
          </h2>
          <p className="text-gray-500">
            Start creating bundle offers today to attract more customers and
            increase your revenue.
          </p>
          <Button
            size="sm"
            variant="solid"
            rounded="md"
            className="mt-4 px-4 py-2"
          >
            Add new bundle
          </Button>
        </div>
      </div>
    </div>
  );
}
