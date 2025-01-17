'use client';

import { useForm } from 'react-hook-form';
import FormSummary from './form-summary';
import { useStepperOne } from '@/app/shared/multi-step/multi-step-1';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { Avatar, Dropdown, Select, Text } from 'rizzui';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Bundle from '@/app/(hydrogen)/recommendation/predictive-bundle/bundle';
import Header from '../header';
import cn from '@core/utils/class-names';
import RecommendationType from '@/app/(hydrogen)/recommendation/recommendation-widgets/recommendation-type';
import RecommendationSettings from '@/app/(hydrogen)/recommendation/recommendation-widgets/recommendation-settings-';

interface OptionType {
  label: string;
  value: string;
}

const options: OptionType[] = [
  { label: 'Instant search widget', value: 'instant search widget' },
  { label: 'Search results page', value: 'search results page' },
  { label: 'Product Page', value: 'product Page' },
];

export default function StepOne() {
  const { step, gotoNextStep } = useStepperOne();
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const { data: session } = useSession();

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    e.preventDefault(); // Prevents default form behavior
    dispatch(updateFormField({ field, value: e.target.value }));
  };

  const validateEmail = (email: string) => {
    // Regular expression to check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    if (!formData.email) {
      toast.error('Email is required');
      setEmailError('Email is required');
    } else if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      setEmailError('Invalid email address');
    } else {
      setEmailError(null);
      gotoNextStep(); // Proceed to the next step only if email is valid
    }
  };

  return (
    <>
      <Header />
      <div
        className={cn(
          'place-content-center gap-6 px-5 py-10 @3xl:min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-56'
        )}
      >
        <div className="flex w-full flex-col justify-between gap-12">
          <div className="flex items-center justify-between">
            <FormSummary />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <RecommendationType />
        </div>
      </div>
    </>
  );
}
