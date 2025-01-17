import { useState } from 'react';
import { Button, Text } from 'rizzui';

const RecommendationSettings = () => {
  const [eventType, setEventType] = useState('purchase');
  const [timeRange, setTimeRange] = useState('3 days');

  const timeRangeOptions = [
    '1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '7 days',
  ];

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Recommendation settings</h2>
      <div className="mb-6 flex space-x-4">
        <Text className="rounded-full bg-gray-100 p-3 text-gray-900">
          Product page
        </Text>
        <Text className="rounded-full bg-gray-100 p-3 text-gray-900">
          Trending products
        </Text>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium">
          Recommend trending products based on:
        </p>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              className="form-radio"
              name="eventType"
              value="view"
              checked={eventType === 'view'}
              onChange={() => setEventType('view')}
            />
            <span>View events</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              className="form-radio"
              name="eventType"
              value="purchase"
              checked={eventType === 'purchase'}
              onChange={() => setEventType('purchase')}
            />
            <span>Purchase events</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium">
          Trending items are calculated within a time range of
        </label>
        <div className="relative inline-block w-full">
          <select
            className="block w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSettings;
