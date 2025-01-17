import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import { Person } from '@/data/tan-table-data';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Badge, Checkbox, Switch, Text, Tooltip } from 'rizzui';
import { RowDragHandleCell } from '../custom-table-components';

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Switch />
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Switch />
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Switch />
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Switch />
        </div>
      );
  }
}

const columnHelper = createColumnHelper<Person>();

export const defaultColumns = [
  columnHelper.accessor('avatar', {
    id: 'expandedHandler',
    size: 60,
    header: '',
    cell: ({ row }) => <RowDragHandleCell rowId={row.original.id} />,
    enableSorting: false,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 140,
    header: 'Status',
    filterFn: 'statusFilter' as any,
    cell: (info) => getStatusBadge(info.renderValue()!),
  }),

  columnHelper.accessor('name', {
    id: 'name',
    size: 240,
    header: 'Filter Tree',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Collections',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('userName', {
    id: 'userName',
    size: 160,
    header: 'Actions',
    enableSorting: false,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <>
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip
            size="sm"
            content={'Edit Invoice'}
            placement="top"
            color="invert"
          >
            <Link
              href={routes.invoice.edit(row.original.id)}
              aria-label="Edit Invoice"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'View Invoice'}
            placement="top"
            color="invert"
          >
            <Link
              href={routes.invoice.details(row.original.id)}
              aria-label="View Invoice"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the invoice`}
            description={`Are you sure you want to delete this #${row.id} invoice?`}
            onDelete={() =>
              meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
            }
          />
        </div>
      </>
    ),
  }),
];
