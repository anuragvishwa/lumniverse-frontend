'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button, Text, Title } from 'rizzui';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import SlackIcon from '@core/components/icons/slack';
import GoogleIcon from '@core/components/icons/google';
import { SiPosthog } from 'react-icons/si';
import { JobType } from '@/data/job-feed-data';
import Chatbot from './[id]/chatbot';

let countPerPage = 4;

interface Product {
  id: string;
  name: string;
  price: number;
  icon: JSX.Element;
  description: string; // Added description field
}

const products: Product[] = [
  {
    id: '1',
    name: 'Google Analytics',
    price: 100,
    icon: <GoogleIcon className="h-5 w-5" />,
    description: 'Track your website analytics with Google Analytics.',
  },
  {
    id: '2',
    name: 'Prompt Hog',
    price: 150,
    icon: <SiPosthog className="h-5 w-5" />,
    description: 'AI-driven analytics for better insights with Prompt Hog.',
  },
  {
    id: '3',
    name: 'Slack',
    price: 200,
    icon: <SlackIcon className="h-5 w-5" />,
    description: 'Collaborate with your team seamlessly on Slack.',
  },
];

export default function JobFeedCard({ data }: { data: JobType }) {
  const { openDrawer } = useDrawer();
  const [isBookMark, setIsBookMark] = useState(false);
  const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <>
      <Chatbot />
      {products.map((product) => (
        <div key={product.id}>
          <Link href={`/integrations/${slugify(product.name)}`}>
            <div className="mb-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 @lg:gap-y-6 sm:p-[30px]">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex flex-col items-start gap-4 @xl:flex-row">
                  <div className="space-y-1">
                    <div className="mb-2 flex items-center gap-4">
                      {product.icon}{' '}
                      <Title
                        as="h3"
                        className="text-base font-medium @xl:text-lg"
                      >
                        {product.name}
                      </Title>
                    </div>
                    {/* Display the product description */}
                    <Text className="text-sm font-normal leading-normal @xl:leading-relaxed">
                      {product.description}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
