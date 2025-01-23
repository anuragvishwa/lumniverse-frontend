'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@core/components/cards/widget-card';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { Person, defaultData } from '@/data/tan-table-data';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DragAbleRowWrapper } from '@/app/shared/tan-table/custom-table-components';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import { Button, Input } from 'rizzui';
import { BiPlus } from 'react-icons/bi';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function TableRowDnd() {
  const { table, sensors, dataIds, setData, columnOrder, handleDragEndRow } =
    useTanStackTable<Person>({
      tableData: defaultData,
      columnConfig: defaultColumns,
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 8,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setData((prev) => prev.filter((r) => r.id !== row.id));
          },
        },
        getRowId: (row) => row.id,
        enableColumnResizing: false,
      },
    });

  const { openModal } = useModal();

  return (
    <>
      <WidgetCard
        title={
          'Here are the features that impact the search engine on your storefront.'
        }
        // action={
        //   <Button
        //     onClick={() => {
        //       openModal({
        //         view: <CreateCategoryModalView />,
        //         customSize: '540px',
        //       });
        //     }}
        //     size="md"
        //     className="flex items-center gap-1"
        //   >
        //     <BiPlus className="h-5 w-5" /> Add filter option
        //   </Button>
        // }
        className="flex flex-col gap-4"
      >
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEndRow}
          sensors={sensors}
        >
          <MainTable
            table={table}
            dataIds={dataIds}
            columnOrder={columnOrder}
            variant={'minimal'}
            classNames={{
              container: 'overflow-y-hidden',
            }}
            components={{
              bodyRow: DragAbleRowWrapper,
            }}
          />
        </DndContext>
      </WidgetCard>
    </>
  );
}
