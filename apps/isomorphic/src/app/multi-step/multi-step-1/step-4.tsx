'use client';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import RangeSlider, { RangeSliderProps } from '@core/ui/range-slider';
import { toCurrency } from '@core/utils/to-currency';
import {
  Loader,
  Input,
  Text,
  Tooltip,
  RadioGroup,
  AdvancedRadio,
  Button,
  Accordion,
} from 'rizzui';
import { formDataAtom, stepOneTotalSteps, useStepperOne } from '.';
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
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import FormSummary from './form-summary';
import Header from '../header';
import AddWidget from '@/app/(hydrogen)/recommendation/predictive-bundle/add-widget';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[169px] place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const steps = [
  {
    title: 'Enable Boost Core',
    content: (
      <div>
        <p className="text-sm text-gray-600">
          Please enable Boost Core to proceed with the bundle setup.
        </p>
        <Button className="mt-4">Enable Boost Core</Button>
      </div>
    ),
  },
  {
    title: 'Add bundle widget in Instant Search widget',
    content: (
      <div>
        <p className="text-sm text-gray-600">
          Please enable app embed Instant Search (New) to display the bundle in
          Instant search widget.
        </p>
        <Button className="mt-4">Enable Instant Search</Button>
        {/* Image showing an example of the Instant Search UI */}
        <div className="mt-4">
          <Image
            src="/images/instant-search-example.png" // Replace with your image path
            alt="Instant Search Example"
            width={300}
            height={200}
            className="rounded"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Add bundle widget in Search results page',
    content: (
      <div>
        <p className="text-sm text-gray-600">
          Instructions to add the bundle widget in search results page.
        </p>
      </div>
    ),
  },
  {
    title: 'Add bundle widget in Product page',
    content: (
      <div>
        <p className="text-sm text-gray-600">
          Instructions to add the bundle widget in product page.
        </p>
      </div>
    ),
  },
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
          <AddWidget />
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
