'use client';

import { useForm } from 'react-hook-form';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { useStepperOne } from '@/app/shared/multi-step/multi-step-1';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { Avatar, Text } from 'rizzui';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
      <div className="flex w-full flex-col items-center justify-between gap-12 xl:flex-row">
        <div className="col-span-full @4xl:col-span-5">
          <FormSummary
            descriptionClassName="@7xl:me-10"
            title="Let's get your email first"
            description="email"
            formData={formData.email}
            handleInputChange={(e) => handleInputChange(e, 'email')}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>

        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className=""
        >
          <div className="card">
            <div className="content">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <BiSolidMessageRounded className="h-4 w-4" />
                <p className="heading text-center text-xl font-bold leading-6">
                  Lumniverse
                </p>
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
