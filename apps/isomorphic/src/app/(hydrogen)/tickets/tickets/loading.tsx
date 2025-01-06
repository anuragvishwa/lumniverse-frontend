'use client';

import cn from '@core/utils/class-names';
import { useMedia } from 'react-use';
import widgetCard from '@core/components/cards/widget-card';
import WidgetCard from '@core/components/cards/widget-card';

const incomingVehicles = [
  {
    count: 0,
    label: 'All Tickets',
    equal: 'Equal',
  },
  {
    count: 5,
    label: 'Handled Tickets',
    equal: 'Equal',
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

export function Card({
  count,
  label,
  equal,
}: {
  count: any;
  label: string;
  equal: string;
}) {
  return (
    <div className="border-l-2 border-secondary ps-2 text-xs">
      <p className="text-md">{label}</p>
      <h2 className="text-md font-semibold text-gray-900">{count}</h2>{' '}
      <p className="text-md font-semibold text-gray-900">{equal}</p>
    </div>
  );
}
