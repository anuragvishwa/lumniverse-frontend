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
} from 'rizzui';
import { useStepperOne } from '.';
import FormSummary from './form-summary';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Bundle from '@/app/(hydrogen)/recommendation/predictive-bundle/bundle';
import Items from '@/app/(hydrogen)/recommendation/predictive-bundle/items';
import Header from '../header';
import cn from '@core/utils/class-names';

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [urlError, setURLError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    console.log(
      `Handling input change for field: ${field}, value: ${e.target.value}`
    );
    e.preventDefault(); // Prevents default form behavior
    dispatch(updateFormField({ field, value: e.target.value }));
  };

  const { handleSubmit } = useForm();

  // Function to fetch data from the constructed URL
  const fetchData = async () => {
    try {
      let companyURL = formData.companyURL;

      // Check if the URL starts with "https://"
      if (!companyURL.startsWith('https://')) {
        companyURL = `https://${companyURL}`;
      }

      const response = await fetch(`${companyURL}/collections.json`);

      if (!response.ok) {
        throw new Error('Not a valid Shopify URL');
      }

      // Attempt to parse the response as JSON
      const data = await response.json();

      // If data is successfully parsed, proceed to route to the next page (use your routing method here)
      console.log(data, 'fetch');
      gotoNextStep();
    } catch (error) {
      // Show a toast error message if the response is not valid JSON or there is another error
      toast.error('Not a valid Shopify URL');
      console.error('Error fetching data:', error);
    }
  };

  // onSubmit function that checks the URL before fetching
  const onSubmit = () => {
    console.log('Form submitted');

    if (!formData.companyURL) {
      setURLError('URL is required');
      toast.error('URL is required');
      console.log('URL is required');
    } else {
      setURLError(null);

      console.log('URL is valid, fetching data...');
      fetchData(); // Call fetchData if URL is valid
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
          <div className="col-span-full">
            <FormSummary />
          </div>

          <Items />
        </div>
      </div>
    </>
  );
}
