import { useState } from 'react';

type SearchableField = {
  label: string;
  searchWeight: 'High' | 'Medium' | 'Low';
};

const Relevance = () => {
  const [fields, setFields] = useState<SearchableField[]>([
    { label: 'Title', searchWeight: 'High' },
    { label: 'Barcode', searchWeight: 'Medium' },
    { label: 'Product category', searchWeight: 'Medium' },
    { label: 'Product options', searchWeight: 'Medium' },
  ]);

  const toggleField = (index: number) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index
          ? { ...field, searchWeight: field.searchWeight || 'Medium' }
          : field
      )
    );
  };

  const updateWeight = (index: number, weight: 'High' | 'Medium' | 'Low') => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, searchWeight: weight } : field
      )
    );
  };

  const resetFields = () => {
    setFields((prev) =>
      prev.map((field) => ({
        ...field,
        searchWeight: 'Medium',
      }))
    );
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full rounded-md bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold">Searchable fields</h2>
        <p className="mb-6 text-sm text-gray-600">
          Searchable fields help in identifying the attributes that are searched
          while shoppers type in a query.
        </p>
        <div>
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-2 last:border-b-0"
            >
              {/* Toggle */}
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => toggleField(index)}
                  className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-400"
                />
                <span className="text-gray-700">{field.label}</span>
              </div>
              {/* Dropdown for Search Weight */}
              <select
                value={field.searchWeight}
                onChange={(e) =>
                  updateWeight(
                    index,
                    e.target.value as 'High' | 'Medium' | 'Low'
                  )
                }
                className="block w-28 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          ))}
        </div>
        {/* Reset Button */}
        <button
          onClick={resetFields}
          className="mt-4 w-full rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Reset to default
        </button>
      </div>
    </div>
  );
};

export default Relevance;
