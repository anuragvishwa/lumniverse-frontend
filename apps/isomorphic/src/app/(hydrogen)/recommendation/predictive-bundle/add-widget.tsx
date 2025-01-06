import { Accordion, AdvancedCheckbox, Button, Text } from 'rizzui';
import ecommerce from '@public/web-shopping.svg';
import shopping from '@public/undraw_shopping-app_b80f.svg';
import shopping2 from '@public/undraw_shopping_a55o.svg';
import shopping3 from '@public/undraw_send-gift_jl1z.svg';
import Image from 'next/image';
import { useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

const steps = [
  {
    title: 'Enable Boost Core',
    content: (
      <div className="flex items-start justify-between">
        <div className="w-2/3 pr-4">
          <p className="text-sm text-gray-600">
            The widgets will be visible on your storefront only when the Boost
            Core (New) is enabled.
          </p>
          <Button className="mt-4">Enable Boost Core</Button>
        </div>
        <div className="mt-4 flex w-1/3 justify-end">
          <Image
            src={ecommerce}
            alt="Instant Search Example"
            width={300}
            height={150}
            className="rounded object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Add bundle widget in Instant Search widget',
    content: (
      <div className="flex items-start justify-between">
        <div className="w-2/3 pr-4">
          <p className="text-sm text-gray-600">
            Please enable app embed Instant Search (New) to display the bundle
            in Instant search widget.
          </p>
          <Button className="mt-4">Enable Instant Search</Button>
        </div>
        <div className="mt-4 flex w-1/3 justify-end">
          <Image
            src={shopping}
            alt="Instant Search Example"
            width={300}
            height={150} // Adjusted the height for consistency
            className="rounded object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Add bundle widget in Search results page',
    content: (
      <div className="flex items-start justify-between">
        <div className="w-2/3 pr-4">
          <p>
            Please add the app block <strong>Products & Filters (New)</strong>{' '}
            to the Search page.
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Then hide the theme&apos;s default Search results by clicking the
            eye icon. This step is essential to avoid having two of the same
            search results when using Boost widgets, as we replace them with our
            Products & Filters (New) widget.
          </p>
          <Button className="mt-4">Add App Block</Button>
        </div>
        <div className="mt-4 flex w-1/3 justify-end">
          <Image
            src={shopping2}
            alt="Instant Search Example"
            width={300}
            height={150} // Adjusted the height for consistency
            className="rounded object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Add bundle widget in Product page',
    content: (
      <div className="flex items-start justify-between">
        <div className="w-2/3 pr-4">
          <p className="text-sm text-gray-600">
            Please add the app block Predictive Bundle to the page.
          </p>
          <Button className="mt-4">Add App Block</Button>
        </div>
        <div className="mt-4 flex w-1/3 justify-end">
          <Image
            src={shopping3}
            alt="Instant Search Example"
            width={300}
            height={150} // Adjusted the height for consistency
            className="rounded object-cover"
          />
        </div>
      </div>
    ),
  },
];

export default function AddWidget() {
  return (
    <div className="rounded-md border-2 border-gray-100 p-8 shadow-xl">
      <div className="w-full">
        {/* Progress tracker */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">
            Follow these steps to display bundle in your storefront
          </h2>
          <span className="text-gray-500">0/4 completed</span>
        </div>

        {/* Accordion */}
        {steps.map((step, index) => (
          <Accordion key={index} className="border-b last-of-type:border-b-0">
            <Accordion.Header>
              {({ open }) => (
                <div className="flex w-full cursor-pointer items-center justify-between py-5 text-sm font-semibold">
                  {step.title}
                  <IoChevronDownCircleOutline
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                      open ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </div>
              )}
            </Accordion.Header>
            <Accordion.Body className="mb-7">{step.content}</Accordion.Body>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
