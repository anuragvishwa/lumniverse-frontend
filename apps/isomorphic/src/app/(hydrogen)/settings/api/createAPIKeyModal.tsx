import React from 'react';
import { Title, Button } from 'rizzui';
import { ActionIcon } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import KeyModalView from './keyModalView';
import { BiPlus } from 'react-icons/bi';
import CreateAPIKeyModalView from './createAPIKeyModalView';

// Update the type to accept a React component
type PageHeaderTypes = {
  className?: string;
  orgName: string;
  orgId: string;
};

export function CreateCategoryModalView({ orgName, orgId }: PageHeaderTypes) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="flex items-center gap-2 font-semibold">
          Create API Key
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <CreateAPIKeyModalView
        isModalView={false}
        orgName={orgName}
        orgId={orgId}
      />
    </div>
  );
}

export default function CreateAPIKeyModal({
  className,
  orgName,
  orgId,
}: PageHeaderTypes) {
  const { openModal } = useModal();
  return (
    <Button
      size="sm"
      variant="solid"
      className="flex cursor-pointer items-center gap-2 p-2 text-xs"
      onClick={() =>
        openModal({
          view: <CreateCategoryModalView orgName={orgName} orgId={orgId} />,
          customSize: '520px',
        })
      }
    >
      <BiPlus className="h-4 w-4" />
      Create new API Key
    </Button>
  );
}
