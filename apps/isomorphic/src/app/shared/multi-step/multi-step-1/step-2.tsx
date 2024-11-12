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
import {
  formDataAtom,
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
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

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
      <div className="flex w-full flex-col items-center justify-between gap-12 xl:flex-row">
        <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
          <FormSummary
            title="Store URL"
            description="Your preferences, needs, and unique qualities matter to us, and we're excited to create an experience that's tailored just for you."
            formData={formData.companyURL}
            handleInputChange={(e) => handleInputChange(e, 'companyURL')}
          />
        </div>

        <form id={`rhf-${step.toString()}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="content">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <BiSolidMessageRounded className="h-4 w-4" />
                <p className="underline">{formData.companyURL}</p>
              </div>
              <div className="mb-4 mt-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0">
                <div className="flex items-center justify-start gap-2">
                  <Avatar
                    name={'Full Name'}
                    className="rounded-lg text-white"
                    size="sm"
                  />
                  <Text as="span" className="font-lexend text-xs font-medium">
                    Full Name
                  </Text>
                </div>
                <Text as="span">{session?.user.name}</Text>
              </div>
              <div className="mb-4 mt-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0">
                <div className="flex items-center justify-start gap-2">
                  <Avatar
                    name={'Email'}
                    className="rounded-lg text-white"
                    size="sm"
                  />
                  <Text as="span" className="font-lexend text-xs font-medium">
                    {session?.user.email}
                  </Text>
                </div>
                <Text as="span">{formData.email}</Text>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
