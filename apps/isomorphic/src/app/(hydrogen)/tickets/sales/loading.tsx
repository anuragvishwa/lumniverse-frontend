'use client';

import cn from '@core/utils/class-names';
import { useMedia } from 'react-use';
import widgetCard from '@core/components/cards/widget-card';
import WidgetCard from '@core/components/cards/widget-card';
import { BiQuestionMark } from 'react-icons/bi';
import { PiQuestionMarkBold, PiQuestionMarkThin } from 'react-icons/pi';

const incomingVehicles = [
  {
    count: 0,
    label: 'Sales Assisted',
  },
  {
    count: 0,
    label: 'AOV',
  },
  {
    count: 0,
    label: 'Orders',
  },
];

export default function LoadingWorkflow({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <div className="col-span-full grid grid-cols-2 gap-4">
      <div className="col-span-full grid grid-cols-3 gap-3 rounded-md border border-gray-300 p-4">
        {incomingVehicles.map((vehicle, index) => (
          <Card key={index} {...vehicle} />
        ))}
      </div>
    </div>
  );
}

export function Card({ count, label }: { count: any; label: string }) {
  return (
    <div className="border-l-2 border-secondary ps-2 text-xs">
      <p className="text-md flex items-center gap-2">
        {label} <PiQuestionMarkBold />
      </p>
      <h2 className="text-md font-semibold text-gray-900">{count}</h2>{' '}
    </div>
  );
}
