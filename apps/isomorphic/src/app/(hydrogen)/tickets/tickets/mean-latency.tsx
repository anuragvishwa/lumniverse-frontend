'use client';

import cn from '@core/utils/class-names';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import { Button, Dropdown } from 'rizzui';
import { BiChevronDownCircle } from 'react-icons/bi';
import { useState } from 'react';
import { LuMinus } from 'react-icons/lu';
import { PiQuestionMarkThin } from 'react-icons/pi';

const data = [
  {
    day: 'Mon',
    expansions: 2,
    cancellations: 13,
  },
  {
    day: 'Tue',
    expansions: 27,
    cancellations: 39,
  },
  {
    day: 'Thu',
    expansions: 21,
    cancellations: 32,
  },
  {
    day: 'Wed',
    expansions: 45,
    cancellations: 25,
  },
  {
    day: 'Fri',
    expansions: 36,
    cancellations: 25,
  },
  {
    day: 'Sun',
    expansions: 50,
    cancellations: 31,
  },
];

const viewOptions = [
  { value: 'day', name: 'Day' },
  { value: 'day&days=7', name: 'Week' },
  { value: 'month', name: 'Month' },
  // { value: 'day&days=90', name: 'Last 90 Days' },
];

export default function MeanLatency({ className }: { className?: string }) {
  const [selectedOption, setSelectedOption] = useState('Daily');

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    console.log('Selected option:', option); // You can perform any action here
  };
  return (
    <WidgetCard
      title={
        <div className="flex items-center gap-2">
          Tickets <PiQuestionMarkThin />
        </div>
      }
      description={
        <div className="mb-4 mt-4">
          <p className="text-md">On Average</p>
          <h2 className="text-md font-semibold text-gray-900">0</h2>
          <p className="text-md flex items-center gap-2 text-gray-900">
            <LuMinus /> Equal
          </p>
        </div>
      }
      rounded="lg"
      descriptionClassName="text-gray-500 mt-1.5"
      className={cn('grid grid-cols-1', className)}
      action={
        <Dropdown>
          <Dropdown.Trigger>
            <Button as="span" variant="outline">
              {selectedOption} <BiChevronDownCircle className="ml-2 w-5" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSelect('Daily')}>
              Daily
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect('Monthly')}>
              Monthly
            </Dropdown.Item>
          </Dropdown.Menu>
          {selectedOption && <p>Selected: {selectedOption}</p>}
        </Dropdown>
      }
    >
      <div className="h-72 w-full @sm:pt-3 @lg:pt-4 @xl:pt-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              left: -30,
            }}
          >
            <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
            <XAxis dataKey="day" tickLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="natural"
              dataKey="expansions"
              stroke="#5451FD"
              fill="#5451FD"
              strokeWidth={2.3}
              fillOpacity={0.05}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
