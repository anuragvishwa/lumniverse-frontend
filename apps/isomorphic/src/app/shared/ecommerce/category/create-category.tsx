'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import { Button, Input, Text, Textarea, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import { BiDollarCircle, BiPlus } from 'react-icons/bi';
import { useModal } from '../../modal-views/use-modal';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

// Parent category option
const parentCategoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Type option
const typeOption = [
  {
    value: 'fresh vegetables',
    label: 'Fresh Vegetables',
  },
  {
    value: 'diet foods',
    label: 'Diet Foods',
  },
  {
    value: 'green vegetables',
    label: 'Green Vegetables',
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
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function CreateCategory({
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
  const [isOpen, setIsOpen] = useState(true);
  const { closeModal } = useModal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative h-[600px] w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Product recommendation</h2>
          <button
            onClick={() => closeModal()}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex space-x-6 p-6">
          {/* Left Section */}
          <div className="flex-1">
            <div className="mb-4">
              <span className="text-body flex items-center gap-1">
                {' '}
                <BiDollarCircle /> Upskills
              </span>
            </div>
            <div className="mb-4 flex space-x-4">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Use Template
              </button>
              <button className="rounded-lg border px-4 py-2 text-blue-600 hover:bg-blue-100">
                Test it out
              </button>
            </div>
            <div className="mb-4 flex space-x-2">
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                Pre-Sale
              </span>
              <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-600">
                Smart Popups
              </span>
            </div>
            <p className="mb-4 text-gray-700">
              Sell more by recommending hot deals and cross-sell offers.
            </p>
            <h3 className="mb-2 font-semibold">Key features:</h3>
            <ul className="list-inside list-disc space-y-4 text-gray-700">
              <li>
                Starts when a Visitor opens a specific page e.g. product page;
              </li>
              <li>Showcases hot deals & promotions;</li>
              <li>Convinces to the purchase.</li>
            </ul>
            <div className="absolute bottom-4 left-4 mt-4 text-sm text-gray-400">
              11.1K uses
            </div>
          </div>

          <div className="relative flex-1 rounded-lg bg-blue-50">
            <div className="absolute right-4 top-4">
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100">
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Polaroid"
                className="mb-4 h-32 w-32"
              />
              <h4 className="mb-2 font-semibold text-gray-800">
                Special offer for Polaroid!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
