// components/FeatureTable.tsx

import { FC } from 'react';
import { FaLock, FaUnlock, FaCog, FaTrash } from 'react-icons/fa'; // Example of icons

const FeatureTable: FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Features
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* Section Header */}
          <tr>
            <td
              colSpan={4}
              className="bg-gray-50 px-6 py-2 font-semibold text-gray-600"
            >
              RANKING FACTORS
            </td>
          </tr>

          {/* Row 1 */}
          <tr>
            <td className="whitespace-nowrap px-6 py-4">Relevance settings</td>
            <td className="whitespace-nowrap px-6 py-4">Standard search</td>
            <td className="whitespace-nowrap px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                Off
              </span>
            </td>
            <td className="flex space-x-2 whitespace-nowrap px-6 py-4">
              <button className="rounded-md bg-gray-200 p-2">
                <FaCog className="text-gray-600" />
              </button>
              <button className="rounded-md bg-gray-200 p-2">
                <FaTrash className="text-gray-600" />
              </button>
            </td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td className="whitespace-nowrap px-6 py-4">Semantic search</td>
            <td className="whitespace-nowrap px-6 py-4">AI-powered search</td>
            <td className="whitespace-nowrap px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                <FaLock className="mr-1.5 h-4 w-4" />
                Locked
              </span>
            </td>
            <td className="flex space-x-2 whitespace-nowrap px-6 py-4">
              <button className="rounded-md bg-gray-200 p-2">
                <FaUnlock className="text-gray-600" />
                Unlock
              </button>
            </td>
          </tr>

          {/* Add more rows similarly... */}

          {/* Section Header */}
          <tr>
            <td
              colSpan={4}
              className="bg-gray-50 px-6 py-2 font-semibold text-gray-600"
            >
              SEARCH LAYOUT SETTINGS
            </td>
          </tr>

          {/* Example of another row */}
          <tr>
            <td className="whitespace-nowrap px-6 py-4">
              Instant search widget (ISW)
            </td>
            <td className="whitespace-nowrap px-6 py-4">Standard search</td>
            <td className="whitespace-nowrap px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
                On
              </span>
            </td>
            <td className="flex space-x-2 whitespace-nowrap px-6 py-4">
              <button className="rounded-md bg-gray-200 p-2">
                <FaCog className="text-gray-600" />
              </button>
              <button className="rounded-md bg-gray-200 p-2">
                <FaTrash className="text-gray-600" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeatureTable;
