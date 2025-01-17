import { useState } from 'react';
import { Accordion, Button, Input, Title } from 'rizzui';
import { BiChevronDown } from 'react-icons/bi';
import cn from '@core/utils/class-names';
import { FiDelete } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import SelectProducts from './selectedProducts';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';

interface RuleGroup {
  id: number;
  title: string;
  content: string;
}

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

export default function RecommendationSettings({
  radio,
  tab,
}: {
  radio: string;
  tab: string;
}) {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([
    { id: 1, title: '1. Rule Group', content: '' },
  ]);

  const addNewGroup = () => {
    const newId = ruleGroups.length + 1;
    setRuleGroups([
      ...ruleGroups,
      { id: newId, title: ` ${newId}. Rule Group`, content: '' },
    ]);
  };

  const deleteGroup = (id: number) => {
    setRuleGroups(ruleGroups.filter((group) => group.id !== id));
  };

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
    <div className="w-full rounded-md border-2 border-gray-50 p-4 shadow-lg">
      <Title as="h2" className="mb-4 text-2xl font-semibold">
        Recommendation settings
      </Title>
      <div className="mb-4 flex gap-2">
        <button className="rounded-md bg-gray-200 px-3 py-1">{tab}</button>
        <button className="rounded-md bg-gray-200 px-3 py-1">{radio}</button>
      </div>
      <p className="mb-4">
        Define filter criteria for main products and recommended products
      </p>

      {ruleGroups.map((group) => (
        <Accordion
          key={group.id}
          className="mb-2 w-full rounded-md border-2 border-gray-100 p-2 text-sm font-semibold"
        >
          <Accordion.Header>
            {({ open }) => (
              <div
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between py-4 text-sm font-semibold',
                  open && 'border-b border-gray-300'
                )}
              >
                {group.title}
                <div className="flex items-center space-x-2">
                  <RiDeleteBin6Line
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGroup(group.id);
                    }}
                  />
                  <BiChevronDown
                    className={cn(
                      'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                      open && '-rotate-0'
                    )}
                  />
                </div>
              </div>
            )}
          </Accordion.Header>

          <Accordion.Body className="mb-7">
            <div className="space-y-4 bg-white p-4">
              <div className="space-y-2">
                <p className="font-medium">Conditions</p>
                <div className="flex items-center space-x-2">
                  <div className="w-24">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-yellow-800">
                      If
                    </span>
                  </div>

                  <Input
                    type="text"
                    size="sm"
                    placeholder="Product ID"
                    className="w-96"
                  />
                  <div className="w-full">
                    <Input
                      id="search-products"
                      placeholder="Search product"
                      readOnly
                      size="sm"
                      className="w-full"
                      onClick={() => setIsModalOpen(true)}
                    />
                    <SelectProducts
                      products={products}
                      isModalOpen={isModalOpen}
                      selectedProducts={selectedProducts}
                      setIsModalOpen={setIsModalOpen}
                      handleProductToggle={handleProductToggle}
                      handleAddProducts={handleAddProducts}
                      handleRemoveItem={handleRemoveItem}
                      handleDragEnd={handleDragEnd}
                    />
                  </div>
                </div>
              </div>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
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
              <div className="space-y-2">
                <p className="font-medium">Consequences</p>
                <div className="flex items-center space-x-2">
                  <div className="w-24">
                    <span className="rounded-full bg-teal-100 px-2 py-1 text-teal-800">
                      Then
                    </span>
                  </div>
                  <Input
                    type="text"
                    size="sm"
                    placeholder="Product ID"
                    className="w-96"
                  />
                  <div className="w-full">
                    <Input
                      id="search-products"
                      placeholder="Search product"
                      readOnly
                      size="sm"
                      className="w-full"
                      onClick={() => setIsModalOpen(true)}
                    />
                    <SelectProducts
                      products={products}
                      isModalOpen={isModalOpen}
                      selectedProducts={selectedProducts}
                      setIsModalOpen={setIsModalOpen}
                      handleProductToggle={handleProductToggle}
                      handleAddProducts={handleAddProducts}
                      handleRemoveItem={handleRemoveItem}
                      handleDragEnd={handleDragEnd}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion>
      ))}

      <Button
        size="md"
        variant="solid"
        className="mb-4 mt-4"
        onClick={addNewGroup}
      >
        Add new group
      </Button>
    </div>
  );
}
