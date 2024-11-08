'use client';

import { useState } from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@core/components/charts/custom-yaxis-tick';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@core/hooks/use-media';
import SimpleBar from '@core/ui/simplebar';
import DropdownAction from '@core/components/charts/dropdown-action';
import { Title, Text, Button } from 'rizzui';
import cn from '@core/utils/class-names';
import TrendingUpIcon from '@core/components/icons/trending-up';
import { formatNumber } from '@core/utils/format-number';
import Chatbot from '@/app/(hydrogen)/integrations/[id]/chatbot';
import TestNTrainChatbot from '@/app/(hydrogen)/ai-training/train/testNTrainChatbot';
import { BiPlus, BiReset } from 'react-icons/bi';

const dailyData = [
  {
    label: 'Sat',
    activeJobs: 9800,
    onHold: 8000,
    shortlisted: 1800,
  },
  {
    label: 'Sun',
    activeJobs: 8700,
    onHold: 4900,
    shortlisted: 1600,
  },
  {
    label: 'Mon',
    activeJobs: 5000,
    onHold: 8600,
    shortlisted: 3200,
  },
  {
    label: 'Tue',
    activeJobs: 4500,
    onHold: 6800,
    shortlisted: 1200,
  },
  {
    label: 'Wed',
    activeJobs: 2500,
    onHold: 3800,
    shortlisted: 1000,
  },
  {
    label: 'Thu',
    activeJobs: 8000,
    onHold: 5900,
    shortlisted: 1200,
  },
  {
    label: 'Fri',
    activeJobs: 8700,
    onHold: 4800,
    shortlisted: 1600,
  },
];

const monthlyData = [
  {
    label: 'Jan',
    activeJobs: 5650,
    onHold: 4540,
    shortlisted: 3200,
  },
  {
    label: 'Feb',
    activeJobs: 1890,
    onHold: 5510,
    shortlisted: 680,
  },
  {
    label: 'Mar',
    activeJobs: 4300,
    onHold: 3000,
    shortlisted: 1500,
  },
  {
    label: 'Apr',
    activeJobs: 5710,
    onHold: 5830,
    shortlisted: 2300,
  },
  {
    label: 'May',
    activeJobs: 5710,
    onHold: 5830,
    shortlisted: 2300,
  },
  {
    label: 'Jun',
    activeJobs: 5710,
    onHold: 5830,
    shortlisted: 2300,
  },
];

const ticketStatus = [
  { name: 'Active Job' },
  { name: 'On Hold' },
  { name: 'Shortlisted' },
];

const COLORS = ['#3962F7', '#2750AF', '#BBD6FF'];

const viewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export default function JobOverview({ className }: { className?: string }) {
  const [data, setData] = useState(dailyData);
  const isTab = useMedia('(max-width: 768px)', false);

  function handleChange(viewType: string) {
    if (viewType === 'month') {
      setData(monthlyData);
    } else {
      setData(dailyData);
    }
  }

  return (
    <WidgetCard title="" className={cn('min-h-[28rem]', className)}>
      <div className="grid grid-cols-6 gap-6 @container">
        {' '}
        <TestNTrainChatbot />
        <div className="col-span-full @[59rem]:col-span-4 @[80rem]:col-span-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-5">
              <Title as="h4">Test your AI Concierge</Title>

              <Button
                size="sm"
                className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
              >
                <BiReset className="h-5 w-5" /> Reset Test
              </Button>
            </div>
            <Text className="font-semibold text-gray-400">
              Type in any question to test out how your AI respond, Easily
              suggest corrections if you are not satisfied with the existing
              responses.
            </Text>

            <div className="flex items-center justify-center gap-4 py-8">
              <Button
                size="sm"
                className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
              >
                Tell me about yourself?
              </Button>{' '}
              <Button
                size="sm"
                className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
              >
                Tell me about yourself?
              </Button>{' '}
            </div>

            <div className="flex flex-col gap-4 rounded-sm bg-gray-100 p-4">
              <Title as="h4">Train your AI</Title>
              <div className="flex items-start justify-between">
                <Text as="span" className="flex-1 text-left text-sm">
                  Manage the extended AI knowledge and corrections to responses.
                  Add more FAQs and instructions to optimize your account.
                </Text>

                <div className="ml-4 flex items-center justify-end">
                  <Button
                    size="sm"
                    className="border-gradient-to-r flex items-center gap-2 whitespace-nowrap border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
                  >
                    <BiPlus className="h-5 w-5" />
                    Add FAQs
                  </Button>
                </div>
              </div>
              <div className="my-4 flex items-center justify-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 font-bold text-gray-900">Or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              <Title as="h6">AI Instructions</Title>
              <div className="flex flex-col gap-4 rounded-sm bg-gray-50 p-4">
                <Text className="font-semibold text-gray-400">
                  How should your AI concierge behave? What should it avoid
                  doing?
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
