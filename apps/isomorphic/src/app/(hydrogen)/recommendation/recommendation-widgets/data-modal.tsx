'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Text } from 'rizzui';
import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CorrectAIModalView from './faqModalView';

interface Product {
  id: number;
  name: string;
  selected: boolean;
}

interface SelectProductsProps {
  products: Product[];

  selectedProducts: Product[];

  handleProductToggle: (id: number) => void;
  handleAddProducts: () => void;
  handleRemoveItem: (id: number) => void;
  handleDragEnd: (event: any) => void;
}

export default function CreateCategoryModalView({
  products,

  handleProductToggle,
  handleAddProducts,
  selectedProducts,
  handleRemoveItem,
  handleDragEnd,
}: SelectProductsProps) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Select products
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          className="mb-4 border-b-2 border-gray-300 pb-2"
          onClick={() => closeModal()}
        >
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <CorrectAIModalView
        isModalView={false}
        products={products}
        selectedProducts={selectedProducts}
        handleProductToggle={handleProductToggle}
        handleAddProducts={handleAddProducts}
        handleRemoveItem={handleRemoveItem}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
}
