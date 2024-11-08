'use client';

import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  AdvancedRadio,
  RadioGroup,
  FieldError,
  Radio,
  Text,
  Avatar,
  Loader,
  ActionIcon,
} from 'rizzui';
import {
  formDataAtom,
  stepOneTotalSteps,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import UserFamilyColorIcon from '@core/components/icons/user-family-color';
import QuantityInput from '@/app/shared/multi-step/quantity-input';
import UsersColorIcon from '@core/components/icons/users-color';
import UserColorIcon from '@core/components/icons/user-color';
import {
  FormStep5Schema,
  formStep5Schema,
} from '@/validators/multistep-form.schema';
import homeFront from '@public/home-front.png';
import Image from 'next/image';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import cn from '@core/utils/class-names';
const projects = [
  {
    id: 1,
    name: 'Full Name',
    budget: 'Naman Jain',
    color: '#FCB03D',
  },
  {
    id: 2,
    name: 'Mail',
    budget: 'naman@gmail.com',
    color: '#11A849',
  },
  {
    id: 3,
    name: 'Ecommerce',
    budget: 'Shopify',
    color: '#FF1A1A',
  },
  {
    id: 4,
    name: 'Visitors',
    budget: '5000 - 10000',
    color: '#8A63D2',
  },
];

export default function StepSix() {
  const { step, gotoNextStep } = useStepperOne();
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [urlError, setURLError] = useState<string | null>(null);
  const { data: session } = useSession();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    dispatch(updateFormField({ field, value: e.target.value }));
  };

  const { handleSubmit } = useForm();

  const validateURL = (url: string): boolean => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol (http or https)
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|localhost)' + // domain name or localhost
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-zA-Z\\d_]*)?$',
      'i'
    );
    return !!urlPattern.test(url);
  };

  const onSubmit = () => {
    if (!formData.companyURL) {
      setURLError('URL is required');
      toast.error('URL is required');
    } else if (!validateURL(formData.companyURL)) {
      setURLError('Please enter a valid URL');
      toast.error('Please enter a valid URL');
    } else {
      setURLError(null);
      gotoNextStep(); // Go to the next step if the URL is valid
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-12 xl:flex-row">
        <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
          <div className={cn('text-base text-gray-900')}>
            <div className="flex">
              <span className="me-2 mt-2.5 h-0.5 w-11 bg-gray-900/[.35]" /> Step{' '}
              {step + 1} of {stepOneTotalSteps - 1}
            </div>
            <article className="mt-4 @3xl:mt-9">
              <h1
                className={cn(
                  'text-xl text-gray-900 @3xl:text-2xl @7xl:text-3xl @[113rem]:text-4xl'
                )}
              >
                Now booting your simulation environment
              </h1>
              <Text className="mt-4 font-semibold text-gray-400">
                Your concierge is reading your website so it get to your store
                better and this might take a few minutes. You can leave this tab
                open.
              </Text>
            </article>
          </div>
        </div>

        <form id={`rhf-${step.toString()}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="content">
              <div className="flex items-center justify-center">
                <div
                  className="inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>

              <div>
                <h4 className="mt-8 text-center text-white">0</h4>
                <h4 className="mt-4 text-white">
                  Products and 4 collections have been scannned
                </h4>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
