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
import cn from '@core/utils/class-names';
import { formatNumber } from '@core/utils/format-number';
import {
  PROJECT_STATISTICS_COLORS,
  projectStatisticsDailyData,
  projectStatisticsMonthlyData,
  projectStatisticsTicketStatus,
  projectStatisticsViewOptions,
} from '@/data/project-dashboard';
import { BiBell, BiNotification } from 'react-icons/bi';
import { Text, Title } from 'rizzui';
import PDFIcon from '@core/components/icons/pdf-solid';
import { PiFileCsv } from 'react-icons/pi';

export default function ProjectStatistics({
  className,
}: {
  className?: string;
}) {
  const [data, setData] = useState(projectStatisticsDailyData);
  const isTab = useMedia('(max-width: 768px)', false);

  function handleChange(viewType: string) {
    if (viewType === 'month') {
      setData(projectStatisticsMonthlyData);
    } else {
      setData(projectStatisticsDailyData);
    }
  }

  return (
    <WidgetCard
      title={
        <div className="flex items-center gap-2">
          <BiBell className="h-4 w-4" /> File uploading guidelines
        </div>
      }
      className={cn('dark:bg-gray-100/50', className)}
      titleClassName="text-base lg:text-xl font-semibold"
    >
      <ul className="mt-8 flex list-disc flex-col gap-2 border-b border-gray-300 pb-4 pl-4 font-semibold text-gray-400">
        <li>
          Treat your AI like a new employee. If the content isn&apos;t
          human-readable, the AI cannot understand it.
        </li>
        <li>
          Write a title in the document that explains what the document is
          about. The file name is NOT read by the AI, so it is meaningless.
        </li>
        <li>Try to keep the files short—5 to 6 paragraphs at most.</li>
        <li>A single file should not contain more than 800 words.</li>
        <li>
          A file should only cover a single topic. Split it into multiple files
          if necessary.
        </li>
        <li>We only support PDF, TXT, and CSV files.</li>
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <Title as="h4">Not sure how the files should look like?</Title>
          <Text as="span" className="font-semibold text-gray-400">
            Here are some templates to use
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex w-32 items-center gap-2 rounded-md border-2 border-gray-200 p-2 text-xs">
            <PDFIcon className="h-7 w-7" /> PDF Example
          </span>
          <span className="flex w-32 items-center gap-2 rounded-md border-2 border-gray-200 p-2 text-xs">
            <PiFileCsv className="h-7 w-7" /> CSV Example
          </span>
        </div>
      </div>
    </WidgetCard>
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-start gap-3 text-xs @3xl:text-sm lg:gap-4',
        className
      )}
    >
      {projectStatisticsTicketStatus.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: PROJECT_STATISTICS_COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
