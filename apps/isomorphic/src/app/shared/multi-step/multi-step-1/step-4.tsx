'use client';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import RangeSlider, { RangeSliderProps } from '@core/ui/range-slider';
import { toCurrency } from '@core/utils/to-currency';
import {
  Loader,
  Input,
  Text,
  Tooltip,
  RadioGroup,
  AdvancedRadio,
} from 'rizzui';
import {
  formDataAtom,
  stepOneTotalSteps,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import {
  formStep7Schema,
  FormStep7Schema,
} from '@/validators/multistep-form.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import {
  PropertyTypeSchema,
  propertyTypeSchema,
} from '@/validators/multistep-form.schema';
import {
  SiBigcommerce,
  SiSalesforce,
  SiShopify,
  SiWoocommerce,
} from 'react-icons/si';
import { BiLogoShopify } from 'react-icons/bi';
import Image from 'next/image';
import ShopIcon from '@core/components/icons/shop';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateFormField } from '@/redux/slices/stepSlice';
import cn from '@core/utils/class-names';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[169px] place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const properties: { name: string; label: string }[] = [
  {
    name: '10,000',
    label: 'Below 10,000',
  },
  {
    name: '10,000 - 25,000',
    label: '10,000 - 25,000',
  },
  {
    name: '25,000 - 50,000',
    label: '25,000 - 50,000',
  },
  {
    name: '50,000 - 100,000',
    label: '50,000 - 100,000',
  },
  {
    name: '100,000 - 200,000',
    label: '100,000 - 200,000',
  },
  { name: 'Above 200,000', label: 'Above 200,000' },
];

export default function StepFour() {
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
      propertyType: formData.visitors,
    },
  });

  useEffect(() => {
    if (errors.propertyType) {
      toast.error(errors.propertyType.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<PropertyTypeSchema> = (data) => {
    dispatch(updateFormField({ field: 'visitors', value: data.propertyType }));

    gotoNextStep();
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
                Your monthly website visitors:
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
            <>
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
                        className="[&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6"
                        inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                      >
                        <span className="font-semibold">{property.label}</span>
                      </AdvancedRadio>
                    ))}
                  </RadioGroup>
                )}
              />
            </>
          </form>
        </div>
      </div>
    </>
  );
}

const RangeSliderWithTooltip = ({
  ...props
}: RangeSliderProps & {
  tipFormatter?: (value: number) => React.ReactNode;
}) => {
  const tipHandleRender: RangeSliderProps['handleRender'] = (
    node,
    handleProps
  ) => {
    return (
      <Tooltip content={toCurrency(handleProps.value, true)} placement="top">
        {node}
      </Tooltip>
    );
  };

  return <RangeSlider {...props} handleRender={tipHandleRender} />;
};
