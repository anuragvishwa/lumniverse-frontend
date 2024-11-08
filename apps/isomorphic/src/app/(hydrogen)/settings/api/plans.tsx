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
import GoogleIcon from '@core/components/icons/google';
import { RiOpenaiFill } from 'react-icons/ri';
import { BsMicrosoft } from 'react-icons/bs';
import { SiAnthropic, SiAzurefunctions } from 'react-icons/si';
import { PiCoatHangerDuotone } from 'react-icons/pi';
import KeyModal from './keyModal';
import ThreeDotsPopOver from './threedotspopover';
import { useState } from 'react';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';

const platforms = [
  {
    id: 1,
    name: 'Open AI',
    followers: '235K',
    icon: RiOpenaiFill,
  },
  {
    id: 2,
    name: 'Anthropic',
    followers: '408k',
    icon: SiAnthropic,
  },
  {
    id: 3,
    name: 'Cohere',
    followers: '379K',
    icon: PiCoatHangerDuotone,
  },
  {
    id: 4,
    name: 'Azure OpenAI',
    followers: '379K',
    icon: SiAzurefunctions,
  },
  {
    id: 5,
    name: 'Google',
    followers: '379K',
    icon: GoogleIcon,
  },
];

export default function Plans({ className }: { className?: string }) {
  const isSM = useMedia('(max-width: 640px)', false);
  const isMobile = useMedia('(max-width: 767px)', false);
  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);

  const handleEdit = (platformKey: string) => {
    setCurrentPlatform(platformKey);
  };

  const handleDelete = () => {
    setCurrentPlatform(null); // Reset the current platform after deletion
  };

  function barSize() {
    if (is2XL) return 24;
    if (isLg || isMobile) return 32;
    if (isTab) return 40;
  }

  return (
    <div className={className}>
      <div className="mt-2">
        {' '}
        <WidgetCard
          title=""
          titleClassName="font-medium text-sm text-gray-800 mb-2.5 font-inter"
        >
          <div>
            <div className="mb-4 mt-2 grid grid-cols-[2fr_2fr_2fr] items-center gap-4 font-medium last:mb-0 last:border-0 last:pb-0">
              <Text
                as="span"
                className="text-sm text-gray-600 dark:text-gray-700"
              >
                Current plan
              </Text>
              <Text as="span">Term</Text>
              <Text as="span">Reviews</Text>
            </div>

            <div className="mb-4 grid grid-cols-[2fr_2fr_2fr] items-center gap-4 last:mb-0 last:border-0 last:pb-0">
              <Text
                as="span"
                className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                Free
              </Text>

              <Text as="span" className="truncate">
                Monthly
              </Text>

              <Text as="span">2024/09/20</Text>
            </div>
            <Text as="span">To change your plan, please message us</Text>
          </div>
        </WidgetCard>{' '}
      </div>
    </div>
  );
}
