'use client';

import { useState } from 'react';
import { PiChecksBold, PiFilesBold, PiXBold } from 'react-icons/pi';
import { RgbaColorPicker } from 'react-colorful';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Input, Button, Tooltip, ActionIcon, Title } from 'rizzui';
import { useCopyToClipboard } from '@core/hooks/use-copy-to-clipboard';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/validators/create-role.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cancel from '@public/cancel.svg';
import address from '@public/address.svg';
import status from '@public/status.svg';
import subscribe from '@public/subscribe.svg';
import notFound from '@public/not-found.svg';
import cn from '@core/utils/class-names';
import Image from 'next/image';
// main category form component for create and update category
export default function CreateRole() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();

  console.log('state', state);

  const onSubmit: SubmitHandler<CreateRoleInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      console.log('data', data);
      setLoading(false);
      setReset({
        roleName: '',
        roleColor: '',
      });
      closeModal();
    }, 600);
  };

  const handleCopyToClipboard = (rgba: string) => {
    copyToClipboard(rgba);

    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000); // 3 seconds
  };

  return (
    <Form<CreateRoleInput>
      // resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createRoleSchema}
      className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        const getColor = watch('roleColor');
        const colorCode = `rgba(${getColor?.r ?? 0}, ${getColor?.g ?? 0}, ${
          getColor?.b ?? 0
        }, ${getColor?.a ?? 0})`;
        return (
          <div className="h-[500px] overflow-auto">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                  Support Skills
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>
              <div className="my-6 grid flex-1 grid-cols-2 gap-4 overflow-auto">
                <div className="relative flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-gray-100 p-4 hover:border-blue-500">
                  {/* Green Active Pill */}
                  <div className="absolute left-2 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    Active
                  </div>

                  <Image alt="cancel" src={cancel} className="mx-auto mt-6" />
                  <span className="text-center text-sm font-bold text-gray-500">
                    Order Cancel
                  </span>
                  <span className="text-center text-xs font-semibold text-gray-400">
                    When a customer asks to cancel their orders, the AI will
                    facilitate the request based on the pre-defined settings.
                  </span>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      color="danger"
                      className="w-24 items-center"
                      variant="flat"
                    >
                      Edit Settings
                    </Button>
                  </div>
                </div>

                <div className="relative flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-gray-100 p-4 hover:border-blue-500">
                  {/* Gray Pill */}
                  <div className="absolute right-2 top-4 rounded-full bg-gray-400 px-3 py-1 text-xs font-semibold text-white">
                    Coming Soon
                  </div>

                  <Image alt="address" src={address} className="mx-auto mt-6" />
                  <span className="text-center text-sm font-bold text-gray-500">
                    Change Order Address
                  </span>
                  <span className="text-center text-xs font-semibold text-gray-400">
                    When a customer asks the AI to change their order address.
                  </span>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      className="w-24 items-center"
                      variant="flat"
                    >
                      Activate
                    </Button>
                  </div>
                </div>
                <div className="relative flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-gray-100 p-4 hover:border-blue-500">
                  <div className="absolute left-2 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    Active
                  </div>

                  <Image alt="address" src={status} className="mx-auto mt-8" />
                  <span className="text-center text-sm font-bold text-gray-500">
                    Order Status
                  </span>
                  <span className="text-center text-xs font-semibold text-gray-400">
                    When customer asks the AI {'Where is my Order?'}
                  </span>
                  <div className="flex justify-center">
                    <Button
                      color="danger"
                      size="sm"
                      className="w-24 items-center"
                      variant="flat"
                    >
                      Edit Settings
                    </Button>
                  </div>
                </div>
                <div className="relative flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-gray-100 p-4 hover:border-blue-500">
                  {/* Gray Pill */}
                  <div className="absolute right-2 top-4 rounded-full bg-gray-400 px-3 py-1 text-xs font-semibold text-white">
                    Coming Soon
                  </div>

                  <Image
                    alt="address"
                    src={subscribe}
                    className="mx-auto mt-8"
                  />
                  <span className="text-center text-sm font-bold text-gray-500">
                    Subscriptions
                  </span>
                  <span className="text-center text-xs font-semibold text-gray-400">
                    When customer ask AI to make change to their ongoing
                    subscription.
                  </span>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      className="w-24 items-center"
                      variant="flat"
                    >
                      Activate
                    </Button>
                  </div>
                </div>
                <div className="relative flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-gray-100 p-4 hover:border-blue-500">
                  {/* Gray Pill */}
                  <div className="absolute right-2 top-4 rounded-full bg-gray-400 px-3 py-1 text-xs font-semibold text-white">
                    Coming Soon
                  </div>

                  <Image
                    alt="address"
                    src={notFound}
                    className="mx-auto mt-8"
                  />
                  <span className="text-center text-sm font-bold text-gray-500">
                    Can&apos;t find what you looking for?
                  </span>
                  <span className="text-center text-xs font-semibold text-gray-400">
                    You can request it here.
                  </span>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      className="w-24 items-center"
                      variant="flat"
                    >
                      Activate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="w-full @xl:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto"
                >
                  Create Role
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    </Form>
  );
}
