'use client';

import {
  stepOneTotalSteps,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import cn from '@core/utils/class-names';
import { Input } from 'rizzui';
import './input.css';
import FormGroup from '../../form-group';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';

interface FormState {
  email: string;
  name: string;
  lastname: string;
  companyName: string;
  companyURL: string;
  companyType: string;
  visitors: string;
}

interface FormSummaryProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  formData: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormSummary({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  formData,
  handleInputChange,
}: FormSummaryProps) {
  const { step } = useStepperOne();

  return (
    <div className={cn('text-base text-gray-900', className)}>
      <div className="flex">
        <span className="me-2 mt-2.5 h-0.5 w-11 bg-gray-900/[.35]" /> Step{' '}
        {step + 1} of {stepOneTotalSteps - 1}
      </div>
      <article className="mt-4 @3xl:mt-9">
        <h1
          className={cn(
            'text-xl text-gray-900 @3xl:text-2xl @7xl:text-3xl @[113rem]:text-4xl',
            titleClassName
          )}
        >
          {title}
        </h1>

        <Input
          value={formData}
          onChange={handleInputChange}
          className="col-span-full mt-4 focus:bg-transparent focus:outline-none focus:ring-0"
          prefix={
            description === 'email' ? (
              <PiEnvelopeSimple className="h-6 w-6" />
            ) : (
              ''
            )
          }
          type="email"
          placeholder="type here"
        />
      </article>
    </div>
  );
}
