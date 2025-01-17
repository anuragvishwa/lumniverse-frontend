'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';
import {
  ActionIcon,
  Button,
  Checkbox,
  Input,
  Tab,
  Text,
  Textarea,
  Title,
} from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import { BiDollarCircle, BiPlus } from 'react-icons/bi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiMagnifyingGlass, PiXBold } from 'react-icons/pi';
import { Select } from 'rizzui';
import RangeSlider from '@core/ui/range-slider';
import PriceFilter from '@/app/shared/explore-flight/listing-filters/time-filter';
import { useFilterControls } from '@core/hooks/use-filter-control';
import { initialState } from '@/data/flight-filter-data';
// Parent category option
const options = [
  { label: 'Collection', value: 'collection' },
  { label: 'Title', value: 'title' },
  { label: 'Size', value: 'size' },
  { label: 'Color', value: 'color' },
  { label: "Variants' price", value: 'variants_price' },
  { label: 'Percent Sale', value: 'percent_sale' },
  { label: 'Review Ratings', value: 'review_ratings' },
  { label: 'Price', value: 'price' },
  { label: 'Stock Status', value: 'stock_status' },
  { label: 'Tag', value: 'tag' },
  { label: 'Multi-level tags', value: 'multi_level_tags' },
  { label: 'Weight', value: 'weight' },
  { label: 'Custom Range Slider', value: 'custom_range_slider' },
  {
    label: 'Custom Variant Range Slider 1 (manual custom with fee)',
    value: 'custom_variant_range_slider_1',
  },
  { label: 'Metafield', value: 'metafield' },
];

const optionsDisplay = [
  { label: 'List', value: 'list' },
  { label: 'Box', value: 'box' },
  { label: 'Swatch', value: 'swatch' },
];

const optionsSelect = [
  { label: 'Single', value: 'single' },
  { label: 'Multiple', value: 'multiple' },
];

const optionsValues = [
  { label: 'All Color Values', value: 'all_color_values' },
  { label: 'Mannual', value: 'mannual' },
];

const colors = [
  { color: 'black', hex: '#000000' },
  { color: 'blue', hex: '#0000FF' },
  { color: 'maroon', hex: '#800000' },
  { color: 'gray', hex: '#808080' },
  { color: 'green', hex: '#008000' },
  { color: 'orange', hex: '#FFA500' },
  { color: 'pink', hex: '#FFC0CB' },
  { color: 'purple', hex: '#800080' },
  { color: 'red', hex: '#FF0000' },
  { color: 'white', hex: '#FFFFFF' },
  { color: 'yellow', hex: '#FFFF00' },
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [value, setValue] = useState<{ label: string; value: string } | null>(
    options[0]
  );
  const [optionDisplay, setOptionDisplay] = useState<{
    label: string;
    value: string;
  } | null>(optionsDisplay[0]);

  const [optionSelect, setOptionSelect] = useState<{
    label: string;
    value: string;
  } | null>(optionsSelect[0]);

  const [optionValue, setOptionVal] = useState<{
    label: string;
    value: string;
  } | null>(optionsValues[0]);

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

  const { state, applyFilter, clearFilter } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative h-[600px] w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="m-auto px-5 pt-5 @lg:pt-6 @2xl:px-7">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2 font-semibold">
            <Title as="h4" className="font-semibold">
              Add
            </Title>
            <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
        </div>

        {/* Body */}
        <div className="flex space-x-6 p-6">
          {/* Left Section */}
          <div className="flex-1 border-r border-gray-300 pr-6">
            <Tab className="">
              <Tab.List>
                <Tab.ListItem>General</Tab.ListItem>
                <Tab.ListItem>Advanced</Tab.ListItem>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  {' '}
                  <div className="text-left">
                    <div className="mt-4">
                      <div className="mb-4">
                        <Select
                          label="Option Type"
                          options={options}
                          value={value}
                          size="sm"
                          onChange={setValue}
                          clearable={value !== null}
                          onClear={() => setValue(null)}
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          label="Option label"
                          labelClassName="block text-sm font-medium text-gray-700"
                          type="text"
                          size="sm"
                          value={value ? value.label : ''}
                          id="optionLabel"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      {value?.value === 'color' && (
                        <div>
                          <div className="mb-4">
                            <Select
                              label="Option Display"
                              options={optionsDisplay}
                              value={optionDisplay}
                              size="sm"
                              onChange={setOptionDisplay}
                              clearable={value !== null}
                              onClear={() => setOptionDisplay(null)}
                            />
                          </div>{' '}
                          <div className="mb-4">
                            <Select
                              label="Option Select"
                              options={optionsSelect}
                              value={optionSelect}
                              size="sm"
                              onChange={setOptionSelect}
                              clearable={value !== null}
                              onClear={() => setOptionSelect(null)}
                            />
                          </div>
                          <div className="mb-4">
                            <Select
                              label="Option Values"
                              options={optionsValues}
                              value={optionValue}
                              size="sm"
                              onChange={setOptionVal}
                              clearable={value !== null}
                              onClear={() => setOptionVal(null)}
                            />
                          </div>
                        </div>
                      )}
                      {value?.value === 'stock_status' && (
                        <div>
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Checkbox />
                              <span> In Stock</span>
                            </div>
                            <Input
                              className="flex-1"
                              size="sm"
                              value="In Stock"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Checkbox />
                              <span>Out of Stock</span>
                            </div>
                            <Input
                              className="flex-1"
                              size="sm"
                              value="Out of Stock"
                            />
                          </div>
                        </div>
                      )}
                      {value?.value === 'percent_sale' && (
                        <div>
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              Above
                              <span className="font-semibold">50</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              From
                              <span className="font-semibold">25</span>
                            </div>
                            to
                            <Input size="sm" value="50" />
                            <Button variant="outline">+</Button>
                            <Button variant="outline">-</Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              From
                              <span className="font-semibold">0</span>
                            </div>
                            to
                            <Input size="sm" value="25" />
                            <Button variant="outline">+</Button>
                            <Button variant="outline">-</Button>
                          </div>
                        </div>
                      )}
                      {value?.value === 'size' && (
                        <div>
                          <div className="mb-4">
                            <Select
                              label="Option Display"
                              options={optionsDisplay}
                              value={optionDisplay}
                              size="sm"
                              onChange={setOptionDisplay}
                              clearable={value !== null}
                              onClear={() => setOptionDisplay(null)}
                            />
                          </div>{' '}
                          <div className="mb-4">
                            <Select
                              label="Option Select"
                              options={optionsSelect}
                              value={optionSelect}
                              size="sm"
                              onChange={setOptionSelect}
                              clearable={value !== null}
                              onClear={() => setOptionSelect(null)}
                            />
                          </div>
                          <div className="mb-4">
                            <Select
                              label="Option Select"
                              options={optionsValues}
                              value={optionValue}
                              size="sm"
                              onChange={setOptionVal}
                              clearable={value !== null}
                              onClear={() => setOptionVal(null)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  {' '}
                  abc
                  {/* {data.map((item) => (
                    <Accordion key={item.title} className="mx-4">
                      <Accordion.Header>
                        {({ open }) => (
                          <div className="flex w-full cursor-pointer items-center justify-between py-5 text-sm font-semibold">
                            {item.title}
                            <BiChevronDown
                              className={cn(
                                'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                                open && '-rotate-0'
                              )}
                            />
                          </div>
                        )}
                      </Accordion.Header>
                      <Accordion.Body className="mb-7">
                        {item.content}
                      </Accordion.Body>
                    </Accordion>
                  ))} */}
                </Tab.Panel>
                <Tab.Panel>
                  {' '}
                  <div className="p-8 text-center">
                    <PiMagnifyingGlass className="mx-auto h-6 w-6" />
                    <h2 className="text-lg font-semibold text-gray-700">
                      Widget that you archived will appear here
                    </h2>
                    <p className="text-gray-500">
                      Archived widget can still be restored when you need it
                    </p>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab>
          </div>

          {/* Right Section */}
          <div className="relative flex-1 pl-6">
            <div>
              <h2 className="mb-4 text-sm font-medium text-gray-700">
                Preview
              </h2>
              <div className="rounded-md border p-4">
                <div className="mb-4 flex justify-between">
                  <button className="rounded-md border p-2 focus:outline-none">
                    <span role="img" aria-label="desktop">
                      💻
                    </span>
                  </button>
                  <button className="rounded-md border p-2 focus:outline-none">
                    <span role="img" aria-label="tablet">
                      📱
                    </span>
                  </button>
                  <button className="rounded-md border p-2 focus:outline-none">
                    <span role="img" aria-label="grid">
                      🔲
                    </span>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Before saving the changes made in the filter option General
                  and Advanced settings, please choose a display device and
                  filter layout to have an idea of what it should look like in
                  the storefront.
                </p>
              </div>
              {value?.value === 'color' && (
                <div className="mt-4 w-full rounded-md border p-4 shadow-sm">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    COLOR
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((colorObj) => (
                      <div
                        key={colorObj.color}
                        onClick={() => setSelectedColor(colorObj.hex)}
                        className={`h-8 w-8 cursor-pointer rounded-full border-2 ${selectedColor === colorObj.hex ? 'border-blue-500' : 'border-gray-300'}`}
                        style={{ backgroundColor: colorObj.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {value?.value === 'stock_status' && (
                <div className="mt-4 w-full rounded-md border p-4 shadow-sm">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Stock Status
                  </label>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span> In Stock</span>
                      </div>
                      (11)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Out of Stock</span>
                      </div>
                      (68)
                    </div>
                  </div>
                </div>
              )}

              {value?.value === 'size' && (
                <div className="mt-4 w-full rounded-md border p-4 shadow-sm">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Size
                  </label>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">6</div>
                      (78)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">6.5</div>
                      (20)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">7</div>
                      (89)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">7.5</div>
                      (95)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">8</div>
                      (55)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">8.5</div>
                      (60)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">9</div>
                      (30)
                    </div>
                  </div>
                </div>
              )}

              {value?.value === 'price' && (
                <div className="mt-4 w-full rounded-md border p-4 shadow-sm">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    PRICE
                  </label>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Input value={0} size="sm" /> -
                      </div>
                      <Input value={1000} size="sm" />
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <PriceFilter state={state} applyFilter={applyFilter} />
                    </div>
                  </div>
                </div>
              )}

              {value?.value === 'percent_sale' && (
                <div className="mt-4 w-full rounded-md border p-4 shadow-sm">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Percent Sale
                  </label>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Above 50%</span>
                      </div>
                      (10)
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>25% - 50%</span>
                      </div>
                      (64)
                    </div>{' '}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Under 25%</span>
                      </div>
                      (36)
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className={cn(
                'flex-end sticky bottom-0 z-40 flex items-end justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
                isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
              )}
            >
              <Button
                size="sm"
                variant="outline"
                className="border-gradient-to-r flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white @xl:w-auto"
              >
                Preview
              </Button>
              <Button
                size="sm"
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-lg transition-transform hover:scale-105 @xl:w-auto"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
