'use client';

import { Text } from 'rizzui';
import WidgetCard from '@core/components/cards/widget-card';
import {
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  BarChart,
  XAxis,
  Bar,
} from 'recharts';
import { useMedia } from 'react-use';
import { RiOpenaiFill } from 'react-icons/ri';
import { BsMicrosoft } from 'react-icons/bs';
import { SiAnthropic, SiAzurefunctions } from 'react-icons/si';
import { PiCoatHangerDuotone } from 'react-icons/pi';
import KeyModal from './keyModal';
import ThreeDotsPopOver from './threedotspopover';
import { useState } from 'react';
import { Input, Title } from 'rizzui';
import Plans from './plans';
import MonthlyUsage from './monthlyUsage';

export default function GeneralSetting({
  className,
  orgName,
  orgId,
}: {
  className?: string;
  orgName: string;
  orgId: string;
}) {
  const isSM = useMedia('(max-width: 640px)', false);
  const isMobile = useMedia('(max-width: 767px)', false);
  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);

  return (
    <div className={className}>
      <div className="mb-4">
        <Title as="h4" className="text-lg font-semibold">
          General Setting
        </Title>
      </div>
      <WidgetCard
        title="Basics"
        titleClassName="font-medium text-sm text-gray-800 mb-2.5 font-inter"
        className={className}
      >
        <div className="mb-4 mt-8 grid items-center gap-4 border-b border-gray-200 pb-4 font-medium last:mb-0 last:border-0 last:pb-0">
          <Text as="span" className="text-xs text-gray-600 dark:text-gray-700">
            Organization Name
          </Text>
          <Input
            size="sm"
            readOnly
            variant="outline"
            placeholder={orgName}
            className="cursor-not-allowed bg-gray-100 text-xs opacity-70"
          />
        </div>
      </WidgetCard>
      <div className="mt-8">
        <div className="mb-4">
          <Title as="h4" className="text-lg font-semibold">
            Plans
          </Title>
          <Text as="span">
            Whether you are starting or scaling, we have got the solution for
            you.
          </Text>
        </div>

        <Plans />
        <MonthlyUsage className="mt-4" />
      </div>
    </div>
  );
}
