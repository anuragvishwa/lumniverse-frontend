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
  Button,
  ActionIcon,
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
import {
  BiFirstAid,
  BiFoodMenu,
  BiFootball,
  BiHome,
  BiLogoShopify,
} from 'react-icons/bi';
import Image from 'next/image';
import ShopIcon from '@core/components/icons/shop';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  MdAutoMode,
  MdDevicesOther,
  MdDomainDisabled,
  MdGames,
  MdMedicalServices,
  MdToys,
} from 'react-icons/md';
import { FcElectronics } from 'react-icons/fc';
import { PiApproximateEquals, PiBaby, PiBooks } from 'react-icons/pi';
import { LuDog } from 'react-icons/lu';
import { RiExchangeBoxLine, RiWomenFill } from 'react-icons/ri';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
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

export default function StepFive() {
  const { step, gotoNextStep } = useStepperOne();
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    dispatch(updateFormField({ field, value: e.target.value }));
  };

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    gotoNextStep();
  };

  return (
    <>
      <div
        className="col-span-full flex flex-col px-24"
        id={`rhf-${step.toString()}`}
        onClick={handleSubmit(onSubmit)}
      >
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
              What kind of products do you sell?
            </h1>
          </article>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Jewellery', icon: MdDomainDisabled },
            { label: 'Medical & RX', icon: MdMedicalServices },
            { label: 'Electronics', icon: FcElectronics },
            { label: 'Auto', icon: MdAutoMode },
            { label: 'Baby Products', icon: PiBaby },
            { label: 'Apparel', icon: PiApproximateEquals },
            { label: 'Games & Media', icon: MdGames },
            { label: 'Sports & Outdoor', icon: BiFootball },
            { label: 'Products for Pets', icon: LuDog },
            { label: 'Art & Craft', icon: RiExchangeBoxLine },
            { label: 'Beauty & Skincare', icon: RiWomenFill },
            { label: 'Health & Wellness', icon: BiFirstAid },
            { label: 'Home & Garden', icon: BiHome },
            { label: 'Toys', icon: MdToys },
            { label: 'Food & Grocery', icon: BiFoodMenu },
            { label: 'Books', icon: PiBooks },
            { label: 'Other', icon: MdDevicesOther },
          ].map((item) => (
            <Button
              key={item.label}
              className="item-center mt-4 flex gap-2"
              size="sm"
              variant="outline"
              onClick={() =>
                handleInputChange(
                  {
                    target: { value: item.label },
                  } as React.ChangeEvent<HTMLInputElement>,
                  'productType'
                )
              }
            >
              <ActionIcon size="sm" variant="text">
                <item.icon className="h-4 w-4" />
              </ActionIcon>
              {item.label}
            </Button>
          ))}
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
