// FoodCard.tsx
import React from 'react';

interface FoodCardProps {
  image: string;
  title: string;
  discountText: string;
  price: string;
  rating: number;
  time: string;
  category: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  discountText,
  price,
  rating,
  time,
  category,
}) => {
  return (
    <div className="mx-auto w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <img src={image} alt={title} className="h-36 w-full object-cover" />
        <div className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white">
          one
        </div>
        <div className="absolute right-2 top-2 rounded-full bg-white p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 text-sm font-bold text-white">
          {discountText}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-bold text-green-500">{rating}</span>
          <span className="mx-1">•</span>
          <span>{time}</span>
        </div>
        <div className="text-sm text-gray-400">{category}</div>
        <div className="mt-2 text-xl font-semibold">{price}</div>
      </div>
    </div>
  );
};

export default FoodCard;
