'use client';

import { metaObject } from '@/config/site.config';
import RingBellSolidIcon from '@core/components/icons/ring-bell-solid';
import { BiBell, BiToggleLeft } from 'react-icons/bi';
import { MdOutlineHelp } from 'react-icons/md';
import { ActionIcon, Badge, Button, Switch, Text, Title } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import { useState } from 'react';
import EngageMentGraphCard from './engageMentGraph';

// export const metadata = {
//   ...metaObject('Analytics'),
// };

export default function Engagement() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Title as="h4" className="mb-4">
          Engagement
        </Title>
        <div className="flex items-center gap-2">
          <ActionIcon
            aria-label="Notification"
            variant="text"
            className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
          >
            <RingBellSolidIcon className="h-[18px] w-auto" />
            <Badge
              renderAsDot
              color="warning"
              enableOutlineRing
              className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
            />
          </ActionIcon>
          <Button
            size="sm"
            className="border-gradient-to-r flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
          >
            <MdOutlineHelp className="h-4 w-4" /> Help
          </Button>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <Text as="span" className="font-semibold text-gray-400">
          Here&apos;s how your AI Concierge assisted.
        </Text>

        <div className="flex items-center gap-3">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date!)}
            dateFormat="yyyy"
            placeholderText="Select Year"
            showYearPicker
            maxDate={new Date()}
            inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
            popperPlacement="bottom-end"
            className="w-[100px]"
          />
          <div className="flex w-full items-center justify-between gap-4 rounded-md p-2 shadow-md">
            <span>Compare to previous period</span>
            <Switch />
          </div>
        </div>
      </div>

      <div className="@container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:gap-8">
          <EngageMentGraphCard
            className="col-span-1"
            title="Conversation Rate"
          />
        </div>
      </div>
    </>
  );
}
