'use client';

import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '@/redux/slices/stepSlice';
import { AppDispatch, RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import { RadioGroup, AdvancedRadio } from 'rizzui';
import {
  PropertyTypeSchema,
  propertyTypeSchema,
} from '@/validators/multistep-form.schema';
import {
  useStepperOne,
  stepOneTotalSteps,
} from '@/app/shared/multi-step/multi-step-1';
import {
  SiBigcommerce,
  SiSalesforce,
  SiShopify,
  SiWoocommerce,
} from 'react-icons/si';
import ShopIcon from '@core/components/icons/shop';
import cn from '@core/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import megento from './magento-2-logo-svgrepo-com.svg';
import woo from './woocommerce-icon-svgrepo-com.svg';
import shopify from './shopify-color-svgrepo-com.svg';
import salesforce from './salesforce-svgrepo-com.svg';

import Image from 'next/image';

const properties = [
  {
    name: 'shopify',
    label: 'Shopify',
    icon: <Image src={shopify} className="h-8 w-8" alt="Shopify" />,
  },
  {
    name: 'megento',
    label: 'Megento',
    icon: <Image src={megento} className="h-8 w-8" alt="Megento" />,
  },
  {
    name: 'woo',
    label: 'WooCommerce',
    icon: <Image src={woo} className="h-8 w-8" alt="WooCommerce" />,
  },
  {
    name: 'salesforce',
    label: 'Salesforce',
    icon: <Image src={salesforce} className="h-8 w-8" alt="Salesforce" />,
  },
  {
    name: 'bigCommerce',
    label: 'BigCommerce',
    icon: <SiBigcommerce className="h-8 w-8" />,
  },
  { name: 'other', label: 'Other', icon: <ShopIcon className="h-8 w-8" /> },
];

export default function StepThree() {
  const { step, gotoNextStep } = useStepperOne();
  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PropertyTypeSchema>({
    resolver: zodResolver(propertyTypeSchema),
    defaultValues: {
      propertyType: 'shopify', // Set Shopify as the default value
    },
  });

  useEffect(() => {
    if (errors.propertyType) {
      toast.error(errors.propertyType.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<PropertyTypeSchema> = (data) => {
    dispatch(updateFormField({ field: 'companyType', value: 'shopify' }));

    gotoNextStep();
  };

  console.log(formData, 'formData');

  return (
    <div className="flex w-full flex-col items-center justify-between gap-12 xl:flex-row">
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-4 @6xl:col-span-5">
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
              Let us know what your place has to offer!
            </h1>
          </article>
        </div>
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <Controller
            name="propertyType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                value={value}
                setValue={onChange}
                className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @6xl:grid-cols-3"
              >
                {properties.map((property) => (
                  <AdvancedRadio
                    key={property.name}
                    value={property.name}
                    className={cn(
                      '[&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6',
                      property.name !== 'shopify'
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    )}
                    inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                    disabled={property.name !== 'shopify'} // Disable non-Shopify options
                  >
                    <span className="mb-4 block h-8 w-8 [&_svg]:w-8">
                      {property.icon}
                    </span>
                    <span className="font-semibold">{property.label}</span>
                  </AdvancedRadio>
                ))}
              </RadioGroup>
            )}
          />
        </form>
      </div>
    </div>
  );
}
