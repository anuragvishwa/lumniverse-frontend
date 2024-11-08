'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import { Text, Title } from 'rizzui';
import { Form } from '@core/components/form';
import cn from '@core/utils/class-names';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import {
  CardDetails,
  CurrentPlans,
} from '@/app/shared/account-settings/billing-settings';

// Parent category option
const parentCategoryOption = [
  {
    value: 'fruits',
    name: 'Fruits',
  },
  {
    value: 'grocery',
    name: 'Grocery',
  },
  {
    value: 'meat',
    name: 'Meat',
  },
  {
    value: 'cat food',
    name: 'Cat Food',
  },
];

// Type option
const typeOption = [
  {
    value: 'fresh vegetables',
    name: 'Fresh Vegetables',
  },
  {
    value: 'diet foods',
    name: 'Diet Foods',
  },
  {
    value: 'green vegetables',
    name: 'Green Vegetables',
  },
];

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className
        // isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-1 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-1 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function PlanModalView({
  id,
  category,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  category?: CategoryFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CategoryFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createCategory data ->', data);
      setReset({
        name: '',
        slug: '',
        type: '',
        parentCategory: '',
        description: '',
        images: '',
      });
    }, 600);
  };

  return (
    <div className="w-full @container">
      <HorizontalFormBlockWrapper
        title={<div className="text-sm">Current Plan</div>}
        description={
          <div className="text-xs">
            We’ll credit your account if you need to downgrade during the
            billing cycle.
          </div>
        }
      >
        <div>
          <CurrentPlans />
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title={<div className="text-sm">Card Details</div>}
        description={
          <div className="text-xs">
            Update your billing details and address.
          </div>
        }
        className="mt-4"
      >
        <CardDetails />
      </HorizontalFormBlockWrapper>
    </div>
  );
}
