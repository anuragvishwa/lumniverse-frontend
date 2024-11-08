import React from 'react';
import { Title, Button, ActionIcon } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import KeyModalView from './keyModalView';

// Update the type to accept a React component
export function CreateCategoryModalView({
  title,
  icon: Icon,
  orgId,
  orgName,
  name,
  link,
}: {
  title: string;
  icon: any;
  orgName: string;
  orgId: string;
  name: string;
  link: string;
}) {
  const { closeModal } = useModal();
  console.log(name, 'key');
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="flex items-center gap-2 font-semibold">
          <Icon className="h-5 w-5" /> {/* Use the component */}
          {title}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <KeyModalView
        isModalView={false}
        title={title}
        orgName={orgName}
        orgId={orgId}
        name={name}
        link={link}
      />
    </div>
  );
}

type PageHeaderTypes = {
  className?: string;
  title: string;
  icon: React.ComponentType;
  orgName: string;
  orgId: string;
  name: string;
  link: string;
};

export default function KeyModal({
  className,
  title,
  icon: Icon,
  orgName,
  orgId,
  name,
  link,
}: PageHeaderTypes) {
  const { openModal } = useModal();
  return (
    <Button
      size="sm"
      variant="outline"
      className="flex w-16 cursor-pointer items-center gap-2 p-2 text-xs"
      onClick={() =>
        openModal({
          view: (
            <CreateCategoryModalView
              title={title}
              icon={Icon}
              orgName={orgName}
              orgId={orgId}
              name={name}
              link={link}
            />
          ),
          customSize: '520px',
        })
      }
    >
      Set Up
    </Button>
  );
}
