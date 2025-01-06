'use client';

import { routes } from '@/config/routes';
import { ActionIcon, Button, Checkbox, Input, Text, Title } from 'rizzui';
import noImage from '@public/no-image-svgrepo-com.svg';
import { PiFileMagnifyingGlassBold, PiMagnifyingGlass } from 'react-icons/pi';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function AIPoweredSearch() {
  return (
    <div>
      <div className="rounded-md border-2 border-gray-100 p-4 shadow-lg">
        <div className="mb-8 flex items-center justify-between rounded-md bg-pink-50 p-2">
          <Title as="h4" className="text-sm">
            ✨ Get AI-powered Search to return semantic suggestions, up-rank
            bestsellers, broaden synonym pools, and more.
          </Title>
          <Button size="sm">Unlock with a free trial</Button>
        </div>
        <Text as="p" className="flex items-center gap-2">
          <PiFileMagnifyingGlassBold className="h-5 w-5" /> Discover the impact
          of search features on your results by enter a search term below and
          see how dynamically they work.
        </Text>
        <div className="mb-2 border-b border-gray-200 pb-8 pt-4">
          <div className="relative ml-auto w-full">
            <Input
              variant="outline"
              prefix={<FaSearch />}
              size="sm"
              type="text"
              placeholder="Search by name or ID"
            />
          </div>
          <Text className="mt-2">
            Your recent updates will be applied after the sync is complete. You
            can see the latest changes below in a few minutes.
          </Text>
        </div>
        <div className="p-8 text-center">
          <Text className="text-left">
            Showing {Array.from({ length: 100 }).length} Results
          </Text>

          <div className="mt-6 grid w-full grid-cols-5 gap-6">
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={noImage}
                  alt="noImage"
                  className={`h-32 w-32 rounded-md opacity-50 transition-opacity duration-300 hover:border-2 hover:border-gray-200 hover:bg-gray-200 hover:opacity-100`}
                />
                <p className="mt-3 w-32 text-sm font-medium text-gray-700">
                  Citrus & Sage Candle + French Vanilla Candle
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  Rs. 0.00
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
