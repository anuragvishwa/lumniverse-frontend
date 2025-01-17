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
import { useModal } from '@/app/shared/modal-views/use-modal';
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

interface Product {
  id: number;
  name: string;
  selected: boolean;
}

interface SelectProductsProps {
  id?: string;
  isModalView?: boolean;
  category?: CategoryFormInput;
  products: Product[];

  selectedProducts: Product[];

  handleProductToggle: (id: number) => void;
  handleAddProducts: () => void;
  handleRemoveItem: (id: number) => void;
  handleDragEnd: (event: any) => void;
}

// main category form component for create and update category
export default function CorrectAIModalView({
  id,
  category,
  isModalView = true,
  products,

  handleProductToggle,
  handleAddProducts,
}: SelectProductsProps) {
  const { closeModal } = useModal();
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
              <p className="mb-4 text-sm text-gray-500">
                You can add <strong>maximum 4 products</strong>.
              </p>

              <Input
                type="text"
                placeholder="Search"
                size="sm"
                variant="outline"
              />

              <div className="max-h-64 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 border-b py-2 last:border-b-0"
                  >
                    <Checkbox
                      size="sm"
                      checked={product.selected}
                      disabled={
                        !product.selected &&
                        products.filter((p) => p.selected).length >= 4
                      }
                      onChange={() => handleProductToggle(product.id)}
                    />
                    <span className="text-sm">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {products.filter((product) => product.selected).length}/4 products
              selected
            </p>
            <div className="space-x-2">
              <Button size="sm" variant="outline" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleAddProducts}>
                Add product
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
}
