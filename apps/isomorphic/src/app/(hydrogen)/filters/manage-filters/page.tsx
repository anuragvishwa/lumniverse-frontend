import PageHeader from '@/app/shared/page-header';
import TableColumnDnd from '@/app/shared/tan-table/column-dnd';
import TableRowDnd from '@/app/shared/tan-table/row-dnd';
import Link from 'next/link';
import React from 'react';
import { BiSolidSquare } from 'react-icons/bi';
import { FaEdit, FaCopy } from 'react-icons/fa';
import { PiBookBold, PiPlayBold, PiStarBold } from 'react-icons/pi';
import { Checkbox, Radio, Switch, Text, Title, Tooltip } from 'rizzui';

const pageHeader = {
  title: ' Manage filter trees',
  breadcrumb: [
    {
      name: 'Video tutorials',
      icon: <PiPlayBold />,
    },
    {
      name: 'User guide',
      icon: <PiBookBold />,
    },
    {
      name: 'Best practices',
      icon: <PiStarBold />,
    },
    {
      name: 'How to add widget to theme',
      icon: <BiSolidSquare />,
    },
  ],
};

const ManageFilterTrees = () => {
  return (
    <div className="min-h-screen p-6">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <Text as="span" className="text-sm text-gray-400">
        Access and edit filter trees from the list of Default and Custom filter
        trees below. You also have the options to duplicate or delete a filter
        tree directly on this page for instant filter managing result.
      </Text>

      {/* Table */}
      <div className="mb-6 mt-6 rounded-lg bg-white p-6 shadow-md">
        <table className="w-full table-auto border-collapse text-left text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Filter tree
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Collections
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center">
                  <span className="text-gray-500">—</span>
                </div>
              </td>
              <td className="p-4">
                <a
                  href="/filters/manage-filters/default-filter-tree"
                  className="text-blue-600 underline"
                >
                  Default filter tree
                </a>
              </td>
              <td className="p-4">
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-700">
                  All Collections
                </span>
              </td>
              <td className="flex gap-3 p-4">
                <Link
                  href="/filters/manage-filters/default-filter-tree"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaEdit />
                </Link>
                <Link
                  href="/filters/manage-filters/default-filter-tree"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaCopy />
                </Link>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center">
                  <Switch />
                </div>
              </td>
              <td className="p-4">
                <a href="#" className="text-blue-600 underline">
                  Search filter tree
                </a>
              </td>
              <td className="p-4">
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-700">
                  Search Result Page
                </span>
              </td>
              <td className="flex gap-3 p-4">
                <button className="text-gray-600 hover:text-gray-800">
                  <FaEdit />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <FaCopy />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TableRowDnd />
    </div>
  );
};

export default ManageFilterTrees;
