'use client';

import { useState } from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import { DatePicker } from '@core/ui/datepicker';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { useMedia } from '@core/hooks/use-media';
import SimpleBar from '@core/ui/simplebar';
import { Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';

const data = [
  {
    month: 'Jan',
    creationTime: 4,
    responseTime: 5,
  },
  {
    month: 'Feb',
    creationTime: 2,
    responseTime: 3,
  },
  {
    month: 'Mar',
    creationTime: 3,
    responseTime: 2,
  },
  {
    month: 'Apr',
    creationTime: 4,
    responseTime: 3,
  },
  {
    month: 'May',
    creationTime: 4,
    responseTime: 3,
  },
  {
    month: 'Jun',
    creationTime: 6,
    responseTime: 5,
  },
  {
    month: 'Jul',
    creationTime: 3,
    responseTime: 2,
  },
  {
    month: 'Aug',
    creationTime: 4,
    responseTime: 3,
  },
  {
    month: 'Sep',
    creationTime: 5,
    responseTime: 4,
  },
  {
    month: 'Oct',
    creationTime: 5,
    responseTime: 4,
  },
  {
    month: 'Nov',
    creationTime: 6,
    responseTime: 5,
  },
  {
    month: 'Dec',
    creationTime: 7,
    responseTime: 6,
  },
];

const metricsData = [
  {
    title: 'Engagement',
    value: '4.66%',
    description:
      'Disengaged visitors that had a conversation with the AI Concierge',
    previousPeriod: '29 Jul 2024-11 Aug 2024',
    chartData: [
      { date: '05 Aug', value: 4.5 },
      { date: '07 Aug', value: 4.7 },
      { date: '09 Aug', value: 4.3 },
      { date: '11 Aug', value: 4.6 },
    ],
  },
  {
    title: '100% AI Conversations',
    value: '5928',
    description:
      'Meaningful conversations between customers and the AI Concierge - No human CS involved',
    previousPeriod: '29 Jul 2024-11 Aug 2024',
    chartData: [
      { date: '05 Aug', value: 1000 },
      { date: '07 Aug', value: 1100 },
      { date: '09 Aug', value: 1200 },
      { date: '11 Aug', value: 1300 },
    ],
  },
  {
    title: 'Leads collected',
    value: '216',
    description: 'Emails or phone numbers collected by the AI Concierge',
    previousPeriod: '29 Jul 2024-11 Aug 2024',
    chartData: [
      { date: '05 Aug', value: 40 },
      { date: '07 Aug', value: 50 },
      { date: '09 Aug', value: 45 },
      { date: '11 Aug', value: 60 },
    ],
  },
];

export default function EngageMentGraphCard({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <>
      {metricsData.map((metric, index) => (
        <div
          className={cn(
            'grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9',
            className
          )}
          key={index}
        >
          <WidgetCard
            className={className}
            title={
              <div className="flex items-center justify-between">
                <Title as="h6">{metric.title}</Title>
                {/* <Text className="text-xs font-semibold text-gray-600">
                  Lift
                </Text> */}
              </div>
            }
            description={
              <div className="w-full">
                <Text as="span">{metric.value}</Text>
              </div>
            }
            descriptionClassName="text-gray-500 mt-1.5"
          >
            <div className="mb-2 mt-5 flex items-start">
              <div className="flex items-start">
                <div>
                  <Text className="text-gray-500">{metric.description}</Text>
                </div>
              </div>
            </div>
            <SimpleBar>
              <div className="h-56 w-full pt-2">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  {...(isTablet && { minWidth: '700px' })}
                >
                  <AreaChart
                    data={metric.chartData}
                    margin={{
                      left: -5,
                      right: 5,
                      bottom: 10,
                    }}
                    className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
                  >
                    <defs>
                      <linearGradient
                        id="newCustomer"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ffdadf"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="oldCustomer"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#dbeafe"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3872FA"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="8 10"
                      strokeOpacity={0.435}
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={20}
                    />
                    <YAxis axisLine={false} tickLine={false} tickMargin={20} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#newCustomer)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </SimpleBar>
            <div className="mt-6 flex justify-end">
              <div className="flex flex-col gap-4">
                <div className="border-l-2 border-secondary ps-2 text-xs">
                  5 Aug 2024-11 Aug 2024
                </div>
                <div className="border-l-2 border-gray-300 ps-2 text-xs">
                  29 Jul 2024-11 Aug 2024
                </div>
                <div className="flex justify-end text-xs text-gray-400">
                  See conversations
                </div>
              </div>
            </div>
          </WidgetCard>
        </div>
      ))}
    </>
  );
}
