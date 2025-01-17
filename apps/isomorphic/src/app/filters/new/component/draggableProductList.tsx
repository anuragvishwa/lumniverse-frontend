'use client';

import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Select, Text } from 'rizzui'; // Importing RizzUI Select component
import { FaGripVertical } from 'react-icons/fa';
import { recommendationProducts } from '@/data/shop-products';
import { Collection } from '@/types';

const options = [
  { label: 'Product 1', value: 'product1' },
  { label: 'Product 2', value: 'product2' },
  { label: 'Product 3', value: 'product3' },
  { label: 'Product 4', value: 'product4' },
];

const SortableProductItem = ({
  id,
  index,
  product,
  onChange,
  pinnedProducts,
  handlePinProduct,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the collections data
    const fetchCollections = async () => {
      try {
        const response = await fetch('https://giva.co/collections.json');
        const data: any = await response.json();
        setCollections(data.collections);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mt-4 flex items-center space-x-4"
    >
      {/* Drag Handle */}
      <div className="mt-4 flex w-8 cursor-grab items-center justify-center">
        <FaGripVertical className="text-gray-500" size={20} />
      </div>

      {/* Position and Product Selector */}
      <div className="flex w-full items-center space-x-6">
        {/* Position */}
        <div className="w-16 text-center">
          <p className="mb-1 text-xs text-gray-500">Position</p>
          <span className="block rounded bg-gray-300 py-2 leading-none">
            {index + 1}
          </span>
        </div>

        {/* Product Selector */}
        <div className="w-full">
          <label
            className="mb-1 mt-4 block text-xs leading-none text-gray-500"
            htmlFor={`product-select-${id}`}
          >
            Pin a product
          </label>

          <select
            onChange={(e) => handlePinProduct(Number(e.target.value))}
            className="mb-4 mt-1 w-full rounded-md border p-2 text-xs"
            defaultValue=""
          >
            <option value="" disabled className="text-xs">
              Select a product to pin
            </option>
            {collections.map((product) => (
              <option key={product.id} value={product.id} className="text-xs">
                {product.title}
                {pinnedProducts.includes(product.id) && ' (Pinned)'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const DraggableProductList = ({
  pinnedProducts,
  handlePinProduct,
}: {
  pinnedProducts: any;
  handlePinProduct: (id: number) => void;
}) => {
  const [items, setItems] = useState([
    { id: '1', product: null },
    { id: '2', product: null },
    { id: '3', product: null },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleProductChange = (id: string, selectedProduct: any) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, product: selectedProduct } : item
    );
    setItems(updatedItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableProductItem
            key={item.id}
            id={item.id}
            index={index}
            product={item.product}
            onChange={handleProductChange}
            pinnedProducts={pinnedProducts}
            handlePinProduct={handlePinProduct}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DraggableProductList;
