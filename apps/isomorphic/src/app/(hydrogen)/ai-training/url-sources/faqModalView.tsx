'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import { Button, Checkbox, Input, Radio, Text, Textarea, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import { BiPlus } from 'react-icons/bi';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

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
export default function CorrectAIModalView({
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
    <Form<CategoryFormInput>
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: category,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                'grid grid-cols-1',
                isModalView
                  ? 'grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                  : 'gap-5'
              )}
            >
              <HorizontalFormBlockWrapper
                title={'Add new category:'}
                description={'Edit your category information from here'}
                isModalView={isModalView}
              >
                {/* <Input
                  label="Category Name"
                  placeholder="category name"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Slug"
                  placeholder="slug"
                  {...register('slug')}
                  error={errors.slug?.message}
                />
                <Controller
                  name="parentCategory"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-0"
                      options={parentCategoryOption}
                      value={value}
                      onChange={onChange}
                      label="Parent Category"
                      error={errors?.parentCategory?.message as string}
                      getOptionValue={(option) => option.label}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-0"
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Display Type"
                      error={errors?.type?.message as string}
                      getOptionValue={(option) => option.label}
                    />
                  )}
                /> */}

                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value="What are your shirts made off?"
                        onChange={onChange}
                        label="Question"
                        className="font-bold text-gray-900 [&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="font-semibold text-gray-400 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Answer"
                        className="font-bold text-gray-900 [&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="font-semibold text-gray-400 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </div>
              </HorizontalFormBlockWrapper>
              <div className="mb-7 flex flex-col gap-2">
                <Title as="h4" className="font-semibold">
                  After giving an answer (optional)
                </Title>
                <div className="flex flex-col gap-4">
                  <span className="flex items-center gap-2">
                    {' '}
                    <Radio className="h-5 w-5" /> Offer further assistance
                  </span>
                  <span className="flex items-center gap-2">
                    {' '}
                    <Radio className="h-5 w-5" /> Recomment a Product
                  </span>{' '}
                  <span className="flex items-center gap-2">
                    {' '}
                    <Radio className="h-5 w-5" /> Recomment a Collection
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'sticky bottom-0 z-40 flex items-center justify-between gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button
              size="sm"
              variant="outline"
              className="border-gradient-to-r flex w-full items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white @xl:w-auto"
            >
              Preview
            </Button>
            <Button
              size="sm"
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-lg transition-transform hover:scale-105 @xl:w-auto"
            >
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
