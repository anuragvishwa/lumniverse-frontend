'use client';

import { routes } from '@/config/routes';
import { ActionIcon, Button, Checkbox, Text, Title } from 'rizzui';
import EcommerceDashboard from '@/app/shared/ecommerce/dashboard';
import { HiMagnifyingGlassCircle } from 'react-icons/hi2';
import FeatureCard from './feature-card';
import welcomeImg from '@public/shop-illustration.png';
import { useRouter } from 'next/navigation';
const pageHeader = {
  title: (
    <div className="flex items-center gap-2">
      <span>AI-powered search</span>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 rounded-lg bg-purple-100 px-2 text-purple-600"
      >
        ✨ AI
      </Button>
    </div>
  ),
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Search',
    },
  ],
};

const features = [
  {
    title: 'Personalization (Professional plans)',
    description:
      "Show results dedicated to shoppers' preferences and make them feel appreciated.",
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'Product performance ranking',
    description:
      'Automatically spotlight your winning products to boost click rates and engagement.',
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'Semantic search',
    description:
      'Decode the meaning and context of the search terms to return the most relevant results.',
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'AI synonyms',
    description:
      'Expand search with auto-generated synonyms, ensuring "no results" is a thing of the past.',
    image: '../../../../public/shop-illustration.png',
  },
  {
    title: 'Scoped suggestion',
    description:
      'Suggest results within collections, vendors, or categories for a faster, more efficient search.',
    image: '../../../../public/shop-illustration.png',
  },
];

export default function AIPoweredSearch() {
  const route = useRouter();
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Title as="h4">{pageHeader.title}</Title>
        <Button
          size="sm"
          className="border-gradient-to-r mt-2 flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
          onClick={() => route.push('/ai-powered-search/test-your-search')}
        >
          <HiMagnifyingGlassCircle className="h-5 w-5" /> Test your search
        </Button>
      </div>
      <div className="mb-10">
        <Text as="p">
          AI-powered site search solutions that deliver a seamless and
          personalized shopping experience.
        </Text>
      </div>

      <div className="mb-5 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex w-32 items-center gap-1 rounded-lg bg-purple-100 px-2 text-purple-600"
        >
          ✨ AI Powered
        </Button>
        <div>
          <Text as="p">
            Revolutionize your business with AI-Powered Search! 🚀
          </Text>
        </div>
      </div>

      {/* <div className="mb-6">
        <EcommerceDashboard />
      </div> */}

      <div className="bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
