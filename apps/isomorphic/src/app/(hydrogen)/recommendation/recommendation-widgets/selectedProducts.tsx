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

interface SelectProductsProps {
  products: Product[];
  isModalOpen: boolean;
  selectedProducts: Product[];
  setIsModalOpen: (open: boolean) => void;
  handleProductToggle: (id: number) => void;
  handleAddProducts: () => void;
  handleRemoveItem: (id: number) => void;
  handleDragEnd: (event: any) => void;
}

export default function SelectProducts({
  products,
  isModalOpen,
  setIsModalOpen,
  handleProductToggle,
  handleAddProducts,
}: SelectProductsProps): JSX.Element {
  return (
    <div>
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
