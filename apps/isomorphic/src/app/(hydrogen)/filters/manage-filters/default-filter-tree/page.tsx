'use client';

import BackButton from '@/app/shared/support/inbox/back-button';
import TableRowDnd from './table';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Button, Input, Title } from 'rizzui';

const pageHeader = {
  title: 'Default Filter Tree',
};

const DefaultFilterTree = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-2">
        {' '}
        <BackButton />
      </div>

      <div className="flex items-center justify-between">
        <Title as="h2">{pageHeader.title}</Title>
        <Button size="md">Save</Button>
      </div>

      {isVisible && (
        <div className="relative mb-6 mt-6 flex items-start justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
          {/* Icon */}
          <div className="flex items-start">
            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10A8 8 0 11.999 10 8 8 0 0118 10zm-8-3a1 1 0 10-2 0v4a1 1 0 102 0V7zm0 6a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Content */}
            <div>
              <Title as="h4" className="mb-2 font-semibold text-blue-900">
                Did you know?
              </Title>
              <p className="mb-2 text-sm text-blue-800">
                To create custom filter options by tag with prefix, please see{' '}
                <a href="#" className="text-blue-600 underline">
                  this guide
                </a>
                .
              </p>
              <p className="mb-2 text-sm text-blue-800">
                You can even add color swatches display to your filter by
                following the instruction in{' '}
                <a href="#" className="text-blue-600 underline">
                  this guide
                </a>
                .
              </p>
              <p className="text-sm text-blue-800">
                In order to manually sort the filter options order (so they
                don&apos;t follow any default or alphabetical orders), please
                see{' '}
                <a href="#" className="text-blue-600 underline">
                  this guide
                </a>
                .
              </p>
            </div>
          </div>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-blue-600 hover:text-blue-800"
            aria-label="Close"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mb-6 mt-6 rounded-md border bg-white p-4 shadow-sm">
        <Title as="h4" className="mb-4 text-lg font-semibold">
          Filter tree information
        </Title>
        <div className="mb-4">
          <Input
            label="Name"
            labelClassName="block text-sm font-medium text-gray-700"
            type="text"
            id="filterTreeName"
            size="md"
            className="w-full"
            defaultValue="Default filter tree"
          />
        </div>
        <p className="text-sm text-gray-500">
          Default filter is applied to all collection pages. You can create a
          filter tree for specific collection
          <a href="#" className="text-blue-600 underline hover:text-blue-500">
            here
          </a>
          .
        </p>
      </div>

      <TableRowDnd />
    </div>
  );
};

export default DefaultFilterTree;
