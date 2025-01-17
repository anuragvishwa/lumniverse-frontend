'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Text } from 'rizzui';
import CreateCategory from './filter-tree-modal';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function CreateCategoryModalView() {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <CreateCategory isModalView={false} />
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
