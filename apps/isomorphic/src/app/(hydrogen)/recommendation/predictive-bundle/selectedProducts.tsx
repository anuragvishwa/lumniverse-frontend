'use client';

import { useState } from 'react';
import { Button, Checkbox, Input } from 'rizzui';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  selected: boolean;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Citrus & Sage Candle', selected: false },
  { id: 2, name: 'French Vanilla Candle', selected: false },
  { id: 3, name: 'Citrus Fragrance', selected: false },
  { id: 4, name: 'Perfume Trio Set', selected: false },
  { id: 5, name: 'Love Constellation Set', selected: false },
];

// Sortable Item Component
const SortableItem = ({
  product,
  removeItem,
}: {
  product: Product;
  removeItem: (id: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between rounded border bg-white p-2"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex items-center space-x-3">
        <span className="cursor-grab">☰</span>
        <span className="text-sm">{product.name}</span>
      </div>
      <button className="text-red-500" onClick={() => removeItem(product.id)}>
        🗑️
      </button>
    </motion.div>
  );
};

export default function SelectProducts(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleProductToggle = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const handleAddProducts = () => {
    const selected = products.filter((product) => product.selected);
    setSelectedProducts(selected);
    setIsModalOpen(false);
  };

  const handleRemoveItem = (id: number) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedProducts((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="search-products"
          className="mb-2 block text-sm font-medium"
        >
          1. Bundled products
        </label>
        <Input
          id="search-products"
          placeholder="Search product"
          readOnly
          onClick={() => setIsModalOpen(true)}
        />
        <p className="mt-1 text-xs text-gray-500">
          Add products you want to sell together, up to 4 products in a bundle.
        </p>
      </div>

      {/* Selected Products */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={selectedProducts.map((product) => product.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
            {selectedProducts.map((product) => (
              <SortableItem
                key={product.id}
                product={product}
                removeItem={handleRemoveItem}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* Modal Header */}
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-medium">Select products</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-500">
              You can add <strong>maximum 4 products</strong>.
            </p>

            <Input
              type="text"
              placeholder="Search"
              size="sm"
              variant="outline"
            />

            <div className="max-h-64 overflow-y-auto">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 border-b py-2 last:border-b-0"
                >
                  <Checkbox
                    size="sm"
                    checked={product.selected}
                    disabled={
                      !product.selected &&
                      products.filter((p) => p.selected).length >= 4
                    }
                    onChange={() => handleProductToggle(product.id)}
                  />
                  <span className="text-sm">{product.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {products.filter((product) => product.selected).length}/4
                products selected
              </p>
              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" variant="solid" onClick={handleAddProducts}>
                  Add product
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
