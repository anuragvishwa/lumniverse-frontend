'use client';

import BackButton from '@/app/shared/support/inbox/back-button';
import FolderIcon from '@core/components/icons/folder-solid';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { BiLock, BiPlus } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { Button, Input, Tab, Title } from 'rizzui';

const pageHeader = {
  title: 'Merchandising',
};

const Merchandising = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const route = useRouter();

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between">
        <Title as="h2">{pageHeader.title}</Title>
        <Button
          size="md"
          className="flex items-center gap-1"
          onClick={() => route.push('/filters/new')}
        >
          <BiPlus className="h-5 w-5" /> Add new rule
        </Button>
      </div>

      {isVisible && (
        <div className="relative mb-6 mt-6 flex items-start justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
          {/* Icon */}
          <div className="flex items-start">
            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600">
              <FolderIcon />
            </div>
            {/* Content */}
            <div>
              <Title as="h4" className="mb-2 font-semibold text-gray-900">
                How Merchandising effectively impact your business?
              </Title>
              <p className="mb-4 text-sm text-gray-800">
                Merchandising allows you to control how your products are
                displayed in instant search widget, search results page and
                collection pages. You can use Merchandising strategies (Pin,
                Boost, Demote, Hide, Filter) to create rules that match your
                sales plan.
              </p>
              <Button variant="outline" size="md">
                Learn more
              </Button>
            </div>
          </div>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
      )}

      <Tab className="border-2 border-gray-50 p-4 shadow-lg">
        <Tab.List>
          <Tab.ListItem>Commerce Search</Tab.ListItem>
          <Tab.ListItem>
            <BiLock className="h-5 w-5" /> Collection Page
          </Tab.ListItem>
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
                onClick={() => route.push('/filters/new')}
              >
                <BiPlus className="mr-1 h-5 w-5" /> Add new rule
              </Button>
            </div>
          </Tab.Panel>
          <Tab.Panel>abc</Tab.Panel>
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
};

export default Merchandising;
