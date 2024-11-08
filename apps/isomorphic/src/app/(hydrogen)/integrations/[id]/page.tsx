'use client';

import { notFound } from 'next/navigation';
import SlackIcon from '@core/components/icons/slack';
import GoogleIcon from '@core/components/icons/google';
import { SiPosthog } from 'react-icons/si';
import Chatbot from './chatbot';

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
    icon: <GoogleIcon className="h-7 w-7" />,
    description: 'Track your website analytics with Google Analytics.',
  },
  {
    id: '2',
    name: 'Prompt Hog',
    price: 150,
    icon: <SiPosthog className="h-7 w-7" />,
    description: 'AI-driven analytics for better insights with Prompt Hog.',
  },
  {
    id: '3',
    name: 'Slack',
    price: 200,
    icon: <SlackIcon className="h-7 w-7" />,
    description: 'Collaborate with your team seamlessly on Slack.',
  },
];

interface Props {
  params: {
    id: string;
  };
}

const IntegrationPage: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  const integration = products.find((i) => slugify(i.name) === id);

  if (!integration) {
    notFound(); // This will trigger the Next.js 404 page
  }

  return (
    <div>
      <h1>{integration?.name}</h1>
      <p>{integration?.description}</p>
    </div>
  );
};

export default IntegrationPage;
