'use client';

import PageHeader from '@/app/shared/page-header';
import { Button, Switch, Text, Title } from 'rizzui';
import { PiBookBold, PiStarBold } from 'react-icons/pi';
import ProductCard from './product-card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const pageHeader = {
  title: 'General settings',
  breadcrumb: [
    {
      name: 'User guide',
      icon: <PiBookBold />,
    },
    {
      name: 'Best practices',
      icon: <PiStarBold />,
    },
  ],
};

export default function GeneralSettings() {
  const route = useRouter();

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className="inline-flex">
            <Button as="span" onClick={() => route.push('/new')}>
              Save Settings
            </Button>
          </Button>
        </div>
      </PageHeader>
      <div className="my-4">
        <ProductCard />
      </div>{' '}
      <div className="p-6">
        {/* Section 1: Exclude currently viewed products */}
        <div className="mb-6 flex items-center justify-between">
          {/* Left section with title and description */}
          <div className="w-full max-w-lg">
            <Title as="h6">Exclude currently viewed products</Title>
            <p className="mb-2 text-sm text-gray-500">
              The product currently being viewed will not appear in the
              recommendations on the same product page.
            </p>
          </div>

          {/* Right section with switch and toggle description */}
          <div className="ml-2 flex flex-1 items-start gap-6 rounded-md bg-white p-4 shadow-lg">
            {' '}
            {/* Adjusted gap to 6 for more space */}
            <Switch defaultChecked />
            <div className="ml-2 flex max-w-xs flex-col gap-2 text-sm font-medium">
              {' '}
              {/* Added max-w-xs for better wrapping */}
              <span>Enable Exclude currently viewed products</span>
              <span className="text-gray-400">
                This toggle is only applicable to product pages.
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6 flex items-center justify-between">
          {/* Left section with title and description */}
          <div className="w-full max-w-lg">
            <Title as="h6">Exclude out-of-stock products</Title>
            <p className="mb-2 text-sm text-gray-500">
              All out-of-stock products will not appear in all recommendations.
            </p>
          </div>

          {/* Right section with switch and toggle description */}
          <div className="ml-2 flex flex-1 items-start gap-6 rounded-md bg-white p-4 shadow-lg">
            {' '}
            {/* Adjusted gap to 6 for more space */}
            <Switch defaultChecked />
            <div className="ml-2 flex max-w-xs flex-col gap-2 text-sm font-medium">
              {' '}
              {/* Added max-w-xs for better wrapping */}
              <span> Enable Exclude out-of-stock products</span>
              <span className="text-gray-400">
                This toggle is only applicable to product pages.
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6 flex items-center justify-between">
          {/* Left section with title and description */}
          <div className="w-full max-w-lg">
            <Title as="h6">Exclude products</Title>
            <p className="mb-2 text-sm text-gray-500">
              Exclude products with poor reviews or low conversion rates from
              all recommendations.
            </p>
          </div>

          {/* Right section with switch and toggle description */}
          <div className="ml-2 flex-1 gap-6 rounded-md bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <Text>Exclude Products</Text>
              <Button>Add Products</Button>
            </div>
            <div className="w-full rounded-md border border-gray-300 p-3">
              <p className="text-gray-500">No product.</p>
            </div>
          </div>
        </div>{' '}
        <div className="mb-6 flex items-center justify-between">
          {/* Left section with title and description */}
          <div className="w-full max-w-lg">
            <Title as="h6">Include products</Title>
            <p className="mb-2 text-sm text-gray-500">
              Include products with good reviews or high conversion rates in
              your recommendations.
            </p>
          </div>

          {/* Right section with switch and toggle description */}
          <div className="ml-2 flex-1 gap-6 rounded-md bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <Text>Include products</Text>
              <Button>Add Products</Button>
            </div>
            <div className="w-full rounded-md border border-gray-300 p-3">
              <p className="text-gray-500">No product.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-6">
        <div className="inline-flex">
          <Button size="md" variant="outline">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
