'use client';

import cn from '@core/utils/class-names';
import { useMedia } from '@core/hooks/use-media';
import WidgetCard from '@core/components/cards/widget-card';

const incomingVehicles = [
  {
    count: 10,
    label: 'in 12 hrs',
  },
  {
    count: 25,
    label: 'in 24 hrs',
  },
  {
    count: 60,
    label: 'in 48 hrs',
  },
];
const atParking = [
  {
    count: 10,
    label: 'Parking 1',
  },
  {
    count: 25,
    label: 'Parking 1',
  },
];
const atDock = [
  {
    count: 10,
    label: 'Dock 1',
  },
  {
    count: 25,
    label: 'Dock 1',
  },
];

export default function LoadingWorkflow({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      title="Settings"
      // description={
      //   <p>
      //     <span className="font-lexend text-xl font-semibold text-gray-900 2xl:text-2xl">
      //  Settong
      //     </span>{' '}
      //     Truck Loads
      //   </p>
      // }
      titleClassName="font-semibold text-gray-800 text-md sm:text-sm 2xl:text-base font-inter"
      headerClassName="col-span-full"
      // descriptionClassName=" mt-2"
      className={cn(
        'relative place-content-between gap-5 pb-0 @2xl:gap-8 @3xl:gap-5 lg:pb-0',
        className
      )}
    >
      <div className="col-span-full mt-4 gap-4">
        <div className="col-span-full rounded-md border border-muted p-4">
          <p className="col-span-full">
            Describe your brand&apos;s tone of voice
          </p>
          <div className="mt-4 border-l-2 border-secondary ps-2 text-xs">
            Call our customers bestie, babe and love when you answer their
            questions Match the tone of the customer while being friendly and
            upbeat, le professional, kind and understanding in the face of
            negative or harsh comments.
          </div>
        </div>
        <div className="col-span-full mt-4 rounded-md border border-muted p-4 sm:col-span-1">
          <p className="col-span-full"> Describe your brand</p>

          <div className="mt-4 border-l-2 border-secondary ps-2 text-xs">
            Our brand is bold, chic, trendsetting, fashion forward, edgy,
            upbeat, supportive, inclusive, diverse and kind. People, planet and
            peace are at the core of what we do We strive to build quality
            relationships and foster community with our customers. We stand by
            our product and our service to ensure that the experience is always.
            to
          </div>
        </div>
        <div className="col-span-full mt-4 rounded-md border border-muted p-4 sm:col-span-1">
          <p className="col-span-full"> Describe your customers</p>

          <div className="mt-4 border-l-2 border-secondary ps-2 text-xs">
            Our customers are fleshionistas, dancers, entertainers,
            professionals, executives, heel lovers. They are fierce and bold and
            want to make a statement with their footwear. They want to step out
            in style without compromising comfort. They are comfortable in their
            skin and keep up with fashion bends. They are also conscious
            consumers that expect brands they shop with to practice ethical and
            sustainable business
          </div>
        </div>
      </div>
      <div className="col-span-full -mx-5 rounded-b-lg bg-gray-50 p-5 font-semibold text-gray-700 lg:-mx-7 lg:p-7">
        <p>How detailed will the response be?</p>
      </div>
    </WidgetCard>
  );
}

function Card({ count, label }: { count: number; label: string }) {
  return (
    <div className="border-l-2 border-secondary ps-2 text-xs">
      <p className="font-semibold text-gray-900">{count}</p>
      Call our customers bestie, babe and love when you answer their questions
      Match the tone of the customer while being friendly and upbeat, le
      professional, kind and understanding in the face of negative or harsh
      comments
    </div>
  );
}
