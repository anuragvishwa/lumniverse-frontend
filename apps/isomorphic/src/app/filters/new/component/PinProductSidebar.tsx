import { BsPinAngle, BsXLg } from 'react-icons/bs';
import { IoPinOutline } from 'react-icons/io5';
import { PiNeedle } from 'react-icons/pi';
import { ActionIcon, Button, Checkbox, Tooltip } from 'rizzui';
import DraggableProductList from './draggableProductList';
import { BiQuestionMark } from 'react-icons/bi';
import { Dispatch, SetStateAction } from 'react';

// components/PinProductSidebar.tsx
const PinProductSidebar = ({
  pinnedProducts,
  handlePinProduct,
  setActiveButton,
}: {
  pinnedProducts: any;
  handlePinProduct: (id: number) => void;
  setActiveButton: Dispatch<SetStateAction<null>>;
}) => {
  return (
    <div className="w-full border-l border-gray-300">
      <div className="flex items-center justify-between border-b border-gray-200 p-5 pb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-400">
          <BsPinAngle className="h-5 w-5" />
          Pin Product
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
          This option is useful for <strong>highlighting</strong> products that
          are part of your campaign.
        </p>
        <p className="text-sm text-gray-500">
          You can pin up to <strong>7 products</strong> to the top of your
          product list, drag and drop to rearrange.
        </p>
        <label className="mt-8 flex items-start gap-2">
          <Checkbox size="sm" className="mr-2" />
          <span>
            Products must match customer&apos;s search term to be displayed &
            pinned up.{' '}
            <span className="inline-flex items-center bg-white">
              {/* Tooltip with limited width and inline behavior */}
              <Tooltip
                className="bg-white"
                size="sm"
                content={
                  <span className="block w-72 bg-white text-center text-gray-900">
                    This setting ensures that products are only displayed and
                    pinned up when they match the specified search terms
                    you&apos;ve set. If you turn off this setting, the products
                    will always be shown and pinned up, regardless of whether
                    they match the customer&apos;s search term or not.
                  </span>
                }
                placement="top"
              >
                <ActionIcon variant="outline" size="sm">
                  <BiQuestionMark />
                </ActionIcon>
              </Tooltip>
            </span>
          </span>
        </label>

        <DraggableProductList
          pinnedProducts={pinnedProducts}
          handlePinProduct={handlePinProduct}
        />
      </div>
    </div>
  );
};

export default PinProductSidebar;
