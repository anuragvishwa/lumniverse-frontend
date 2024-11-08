'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Text } from 'rizzui';
import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CorrectAIModalView from './faqModalView';

export default function CreateCategoryModalView() {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Edit an FAQ
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Text className="mb-4 border-b-2 border-gray-300 pb-2 font-semibold">
        Everytime a customer asks a question.&quot;What are your shirts made
        of?&quot; or any other form of this question, the answer below will be
        used as response.
      </Text>

      <CorrectAIModalView isModalView={false} />
    </div>
  );
}

type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

// export default function CategoryPageHeader() {
//   const { openModal } = useModal();
//   return (
//     <>
//       <Button
//         as="span"
//         className="mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto"
//         onClick={() =>
//           openModal({
//             view: <CreateCategoryModalView />,
//             customSize: '720px',
//           })
//         }
//       >
//         <PiPlusBold className="me-1 h-4 w-4" />
//         Add Category
//       </Button>
//     </>
//   );
// }
