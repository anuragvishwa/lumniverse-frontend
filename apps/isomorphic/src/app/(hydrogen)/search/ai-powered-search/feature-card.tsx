// components/FeatureCard.tsx
import Image from 'next/image';
import React from 'react';
import welcomeImg from '@public/shop-illustration.png';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-6 duration-300 hover:shadow-xl">
      <Image
        src={welcomeImg}
        alt={title}
        className="mb-4 bg-gray-100 object-contain"
      />
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-center text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
