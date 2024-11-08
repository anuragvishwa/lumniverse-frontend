'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Title, Button, ActionIcon } from 'rizzui';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import PlanModalView from './planModalView';

function CreateCategoryModalView() {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Plans
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <PlanModalView isModalView={false} />
    </div>
  );
}

type PageHeaderTypes = {
  className?: string;
};

export default function PlanModal({ className }: PageHeaderTypes) {
  const { openModal } = useModal();
  return (
    <>
      <Button
        size="sm"
        variant="solid"
        className="mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        onClick={() =>
          openModal({
            view: <CreateCategoryModalView />,
            customSize: '720px',
          })
        }
      >
        Change Plan
      </Button>
    </>
  );
}
