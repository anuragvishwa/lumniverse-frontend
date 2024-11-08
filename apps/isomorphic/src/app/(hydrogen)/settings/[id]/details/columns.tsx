// 'use client';

// import Link from 'next/link';
// import { type Invoice } from './dummyData';
// import { routes } from '@/config/routes';
// import { Title, Text } from '@/components/ui/text';
// import { Badge } from '@/components/ui/badge';
// import { Tooltip } from '@/components/ui/tooltip';
// import { HeaderCell } from '@/components/ui/table';
// import { Checkbox } from '@/components/ui/checkbox';
// import { ActionIcon } from '@/components/ui/action-icon';
// import EyeIcon from '@/components/icons/eye';
// import PencilIcon from '@/components/icons/pencil';
// import AvatarCard from '@/components/ui/avatar-card';
// import DateCell from '@/components/ui/date-cell';
// import DeletePopover from '@/app/shared/delete-popover';
// import { Progressbar } from '@/components/ui/progressbar';

// function getStatusBadge(clusterStatus: string) {
//   switch (clusterStatus?.toLowerCase()) {
//     case 'pending':
//       return (
//         <div className="flex items-center">
//           <Badge color="warning" renderAsDot />
//           <Text className="ms-2 font-medium text-orange-dark">
//             {clusterStatus}
//           </Text>
//         </div>
//       );
//     case 'paid':
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">
//             {clusterStatus}
//           </Text>
//         </div>
//       );
//     case 'overdue':
//       return (
//         <div className="flex items-center">
//           <Badge color="danger" renderAsDot />
//           <Text className="ms-2 font-medium text-red-dark">
//             {clusterStatus}
//           </Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">
//             {clusterStatus}
//           </Text>
//         </div>
//       );
//   }
// }

// function getStockStatus(status: number) {
//   if (status === 0) {
//     return (
//       <>
//         <Progressbar
//           value={status}
//           color="danger"
//           label={'out of stock'}
//           className="h-1.5 w-24 bg-red/20"
//         />
//         <Text className="pt-1.5 text-[13px] text-gray-500">out of stock </Text>
//       </>
//     );
//   } else if (status <= 20) {
//     return (
//       <>
//         <Progressbar
//           value={status}
//           color="warning"
//           label={'low stock'}
//           className="h-1.5 w-24 bg-orange/20"
//         />
//         <Text className="pt-1.5 text-[13px] text-gray-500">
//           {status} low stock
//         </Text>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <Progressbar
//           value={status}
//           color="success"
//           label={'stock available'}
//           className="h-1.5 w-24 bg-green/20"
//         />
//         <Text className="pt-1.5 text-[13px] text-gray-500">
//           {status} in stock
//         </Text>
//       </>
//     );
//   }
// }
// console.log('From Workloads');
// type Columns = {
//   data: any[];
//   sortConfig?: any;
//   handleSelectAll: any;
//   checkedItems: string[];
//   onDeleteItem: (id: string) => void;
//   onHeaderCellClick: (value: string) => void;
//   onChecked?: (id: string) => void;
// };

// export const getColumns = ({
//   data,
//   sortConfig,
//   checkedItems,
//   onDeleteItem,
//   onHeaderCellClick,
//   handleSelectAll,
//   onChecked,
// }: Columns) => [
//   // {
//   //   title: (
//   //     <div className="ps-2">
//   //       <Checkbox
//   //         title={'Select All'}
//   //         onChange={handleSelectAll}
//   //         checked={checkedItems.length === data.length}
//   //         className="cursor-pointer"
//   //       />
//   //     </div>
//   //   ),
//   //   dataIndex: 'checked',
//   //   key: 'checked',
//   //   width: 30,
//   //   render: (_: any, row: any) => (
//   //     <div className="inline-flex ps-2">
//   //       <Checkbox
//   //         className="cursor-pointer"
//   //         checked={checkedItems.includes(row.id)}
//   //         {...(onChecked && { onChange: () => onChecked(row.id) })}
//   //       />
//   //     </div>
//   //   ),
//   // },
//   {
//     title: <HeaderCell title="Namespaces" />,
//     dataIndex: 'namespace',
//     key: 'namespace',
//     width: 250,
//     hidden: 'namespace',

//     render: (_: string, row: Invoice) => (
//       <AvatarCard
//         // src={row.avatar}
//         name={row.namespace}
//         description={`INV-${row.clusterId}`}
//         id={row.clusterId}
//         appId={row.appId}
//       />
//     ),
//   },
//   {
//     title: (
//       <HeaderCell
//         title="Workloads"
//         sortable
//         ascending={
//           sortConfig?.direction === 'asc' && sortConfig?.key === 'workloads'
//         }
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('workloads'),
//     dataIndex: 'workloads',
//     key: 'workloads',
//     width: 200,
//     render: (value: string) => (
//       <Text className="text-xs font-medium text-gray-700 dark:text-gray-600">
//         {value}
//       </Text>
//     ),
//   },

//   {
//     title: (
//       <HeaderCell
//         title="CPU"
//         sortable
//         ascending={
//           sortConfig?.direction === 'asc' &&
//           sortConfig?.key === 'averageCpuCost'
//         }
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('averageCpuCost'),
//     dataIndex: 'averageCpuCost',
//     key: 'averageCpuCost',
//     width: 200,
//     render: (value: string) => (
//       <Text className="font-medium text-gray-700 dark:text-gray-600">
//         {value}
//       </Text>
//     ),
//   },

//   {
//     title: (
//       <HeaderCell
//         title="Memory"
//         sortable
//         ascending={
//           sortConfig?.direction === 'asc' &&
//           sortConfig?.key === 'averageMemoryCost'
//         }
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('averageMemoryCost'),
//     dataIndex: 'averageMemoryCost',
//     key: 'averageMemoryCost',
//     width: 200,
//     render: (value: string) => (
//       <Text className="font-medium text-gray-700 dark:text-gray-600">
//         {value}
//       </Text>
//     ),
//   },
//   // {
//   //   title: (
//   //     <HeaderCell
//   //       title="Created"
//   //       sortable
//   //       ascending={
//   //         sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
//   //       }
//   //     />
//   //   ),
//   //   onHeaderCell: () => onHeaderCellClick('createdAt'),
//   //   dataIndex: 'createdAt',
//   //   key: 'createdAt',
//   //   width: 200,
//   //   render: (value: string) => (
//   //     <Text className="font-medium text-gray-700 dark:text-gray-600">
//   //       {value}
//   //     </Text>
//   //   ),
//   // },
//   {
//     title: (
//       <HeaderCell
//         title="CPU"
//         sortable
//         ascending={
//           sortConfig?.direction === 'asc' && sortConfig?.key === 'totalCpu'
//         }
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('totalCpu'),
//     dataIndex: 'totalCpu',
//     key: 'totalCpu',
//     width: 200,
//     render: (value: string) => (
//       <Text className="font-medium text-gray-700 dark:text-gray-600">
//         {value}
//       </Text>
//     ),
//   },
//   {
//     title: (
//       <HeaderCell
//         title="Memory"
//         sortable
//         ascending={
//           sortConfig?.direction === 'asc' && sortConfig?.key === 'totalMemory'
//         }
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('totalMemory'),
//     dataIndex: 'totalMemory',
//     key: 'totalMemory',
//     width: 200,
//     render: (value: string) => (
//       <Text className="font-medium text-gray-700 dark:text-gray-600">
//         {value}
//       </Text>
//     ),
//   },
//   {
//     title: (
//       <HeaderCell
//         title="Total Cost"
//         sortable
//         ascending={
//           sortConfig?.direction === 'asc' && sortConfig?.key === 'totalCost'
//         }
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('totalCost'),
//     dataIndex: 'totalCost',
//     key: 'totalCost',
//     width: 200,
//     render: (value: string) => (
//       <Text className="font-medium text-gray-700 dark:text-gray-600">
//         {value}
//       </Text>
//     ),
//     // render: (value: number) => getStockStatus(value),
//   },

//   // {
//   //   title: <HeaderCell title="Status" />,
//   //   dataIndex: 'clusterStatus',
//   //   key: 'clusterStatus',
//   //   width: 120,
//   //   render: (value: string) => getStatusBadge(value),
//   // },
//   // {
//   //   title: <></>,
//   //   dataIndex: 'action',
//   //   key: 'action',
//   //   width: 140,
//   //   render: (_: string, row: any) => (
//   //     <div className="flex items-center justify-end gap-3 pe-3">
//   //       <Tooltip
//   //         size="sm"
//   //         content={() => 'Edit Invoice'}
//   //         placement="top"
//   //         color="invert"
//   //       >
//   //         <Link href={routes.invoice.edit(row.id)}>
//   //           <ActionIcon
//   //             tag="span"
//   //             size="sm"
//   //             variant="outline"
//   //             className="hover:!border-gray-900 hover:text-gray-700"
//   //           >
//   //             <PencilIcon className="h-4 w-4" />
//   //           </ActionIcon>
//   //         </Link>
//   //       </Tooltip>
//   //       <Tooltip
//   //         size="sm"
//   //         content={() => 'View Invoice'}
//   //         placement="top"
//   //         color="invert"
//   //       >
//   //         <Link href={routes.invoice.details(row.id)}>
//   //           <ActionIcon
//   //             tag="span"
//   //             size="sm"
//   //             variant="outline"
//   //             className="hover:!border-gray-900 hover:text-gray-700"
//   //           >
//   //             <EyeIcon className="h-4 w-4" />
//   //           </ActionIcon>
//   //         </Link>
//   //       </Tooltip>
//   //       <DeletePopover
//   //         title={`Delete the invoice`}
//   //         description={`Are you sure you want to delete this #${row.id} invoice?`}
//   //         onDelete={() => onDeleteItem(row.id)}
//   //       />
//   //     </div>
//   //   ),
//   // },
// ];
