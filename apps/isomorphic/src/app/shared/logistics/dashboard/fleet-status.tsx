'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Title, Text } from 'rizzui';
import cn from '@core/utils/class-names';
import HourGlassIcon from '@core/components/icons/hour-glass';
import WeighingScale from '@core/components/icons/weighing-scale';
import TestNTrainChatbot from '@/app/(hydrogen)/ai-training/train/testNTrainChatbot';
import PersonalityChatbot from '@/app/(hydrogen)/ai-training/ai-personality/personality';

const data = [
  { name: 'Available:', value: 20, color: '#3872FA' },
  { name: 'In Maintenance:', value: 18, color: '#eab308' },
  { name: 'On the Move:', value: 35, color: '#10b981' },
];

export default function FleetStatus({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-5 border-0 p-0 lg:p-0', className)}>
      <div className="grid items-start rounded-lg border border-muted p-3 @xl:grid-cols-2 lg:p-3">
        <Title
          as="h3"
          className="col-span-full mb-8 text-base font-semibold sm:text-lg"
        >
          AI Personality
        </Title>

        <PersonalityChatbot />
      </div>
    </div>
  );
}
