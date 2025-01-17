import { BsArrowDown, BsEyeSlash, BsPinAngle, BsXLg } from 'react-icons/bs';
import { IoPinOutline } from 'react-icons/io5';
import { PiMagnifyingGlass, PiNeedle } from 'react-icons/pi';
import {
  ActionIcon,
  Button,
  Checkbox,
  Input,
  Select,
  Tab,
  Tooltip,
} from 'rizzui';
import DraggableProductList from './draggableProductList';
import { BiArrowToTop, BiQuestionMark } from 'react-icons/bi';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const options = [
  { label: 'Product 1', value: 'product1' },
  { label: 'Product 2', value: 'product2' },
  { label: 'Product 3', value: 'product3' },
  { label: 'Product 4', value: 'product4' },
];

const buttonSize = [
  { label: 'Specific search terms', value: 'specific_search_terms' },
];
// components/BoostSidebar.tsx
const DemoteSidebar = ({
  setActiveButton,
}: {
  setActiveButton: Dispatch<SetStateAction<null>>;
}) => {
  const [terms, setTerms] = useState<string[]>(['']); // Initialize with one empty term
  const [isError, setIsError] = useState<boolean[]>([false]); // Error state per term

  const handleAddTerm = () => {
    setTerms([...terms, '']);
    setIsError([...isError, false]); // Add new error state for the new term
  };

  const handleRemoveTerm = (index: number) => {
    const newTerms = terms.filter((_, i) => i !== index);
    const newErrors = isError.filter((_, i) => i !== index);
    setTerms(newTerms);
    setIsError(newErrors);
  };

  return (
    <div className="w-full border-l border-gray-300">
      <div className="flex items-center justify-between border-b border-gray-200 p-5 pb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-400">
          <BsArrowDown className="h-5 w-5" />
          Demote
        </h2>
        <ActionIcon
          onClick={() => setActiveButton(null)}
          variant="text"
          className="font-semibold text-gray-400"
        >
          {' '}
          <BsXLg className="h-5 w-5" />
        </ActionIcon>
      </div>
      <div className="p-5">
        <p className="mb-1 text-sm text-gray-500">
          Push the products that meet the following conditions closer to the
          bottom of the product list. This option can be used to demote products
          with bad reviews, underperforming products.
        </p>
        <Tab>
          <Tab.List>
            <Tab.ListItem>By product items</Tab.ListItem>
            <Tab.ListItem>By attributes and metrics</Tab.ListItem>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="w-full">
                <label className="mb-4 block text-xs leading-none text-gray-500">
                  Select up to 3 products to Boost.
                </label>
                <Select
                  size="sm"
                  className="mb-4 w-full"
                  options={options}
                  //  value={product}
                  //  onChange={(newValue) => onChange(id, newValue)}
                />{' '}
                <Select
                  size="sm"
                  className="mb-4 w-full"
                  options={options}
                  //  value={product}
                  //  onChange={(newValue) => onChange(id, newValue)}
                />{' '}
                <Select
                  size="sm"
                  className="w-full"
                  options={options}
                  //  value={product}
                  //  onChange={(newValue) => onChange(id, newValue)}
                />
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-700">
                  Apply To
                </label>
                <div className="flex items-center space-x-2">
                  <Select
                    size="sm"
                    value="Specific search terms"
                    className="w-2/3" // Set more width for the first select
                    options={buttonSize}
                  />

                  <Select
                    size="sm"
                    className="w-1/3" // Set smaller width for the second select
                    options={buttonSize}
                  />
                </div>
              </div>

              {terms.map((term, index) => (
                <div key={index} className="relative mb-4">
                  <div className="flex items-center space-x-2">
                    {/* <select
                        className="block w-24 rounded-md border bg-gray-100 p-2 text-gray-700"
                        value="Are"
                        disabled
                      >
                        <option value="Are">Are</option>
                      </select>

                      <input
                        type="text"
                        value={term}
                        onChange={(e) =>
                          handleTermChange(index, e.target.value)
                        }
                        className={`block w-full rounded-md border p-2 focus:outline-none focus:ring-2 ${
                          isError[index]
                            ? 'border-red-500 focus:ring-red-500'
                            : 'focus:ring-blue-500'
                        }`}
                        placeholder="Enter term"
                      /> */}

                    <Input
                      size="sm"
                      prefix="Are"
                      prefixClassName="bg-gray-100 text-gray-700"
                    />

                    {/* Trash icon to remove the term */}
                    <ActionIcon
                      size="md"
                      variant="text"
                      onClick={() => handleRemoveTerm(index)}
                    >
                      <FiTrash2 size={20} />
                    </ActionIcon>
                  </div>

                  {isError[index] && (
                    <p className="mt-1 text-sm text-red-500">
                      This field can&apos;t be empty
                    </p>
                  )}

                  {/* Connecting line between the inputs */}
                  {index < terms.length - 1 && (
                    <div className="absolute left-0 right-0 mt-2 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}

              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleAddTerm}
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  <span className="mr-2">+</span> Add more terms
                </button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab>

        {/* <DraggableProductList /> */}
      </div>
    </div>
  );
};

export default DemoteSidebar;
