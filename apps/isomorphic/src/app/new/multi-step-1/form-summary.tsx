'use client';

import { stepOneTotalSteps, useStepperOne } from '.';
import cn from '@core/utils/class-names';
import { Input } from 'rizzui';
import './input.css';

interface FormSummaryProps {
  className?: string;
}

export default function FormSummary({ className }: FormSummaryProps) {
  const { step } = useStepperOne();

  return (
    <div className={cn('text-base text-gray-900', className)}>
      <div className="flex">
        <span className="me-2 mt-2.5 h-0.5 w-11 bg-gray-900/[.35]" /> Step{' '}
        {step + 1} of {stepOneTotalSteps - 1}
      </div>
    </div>
  );
}
