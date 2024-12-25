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

  const questions = [
    'Are there any discounts available for group bookings on the website?',
    'What are the key features and services offered by the website?',
    'How can I manage my bookings on the website?',
  ];

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
        <TestNTrainChatbot />
        <div className="col-span-full @[59rem]:col-span-4 @[80rem]:col-span-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-5">
              <Title as="h4">Test Lumi with your knowledge</Title>

              <Button
                size="sm"
                className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
              >
                <BiReset className="h-5 w-5" /> Reset Test
              </Button>
            </div>
            <Text className="font-semibold text-gray-400">
              Type a question or try following examples too see how Lyro
              responds. Feel free, test questions do not count toward the Lumi’s
              conversations limit.
            </Text>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="inline-block cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-gray-800 shadow-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md"
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
