import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';

import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button, Input, Text, Title } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { BiQuestionMark } from 'react-icons/bi';
import { MdOutlineHelp } from 'react-icons/md';
import ProjectStatistics from '@/app/shared/project-dashboard/project-statistics';

export const metadata = {
  ...metaObject('Table with search'),
};

const pageHeader = {
  title: 'File Sources',
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

export default function FileSources() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Title as="h4" className="mb-4">
          File Sources
        </Title>
        <Button
          size="sm"
          className="border-gradient-to-r flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
        >
          <MdOutlineHelp className="h-4 w-4" /> Help
        </Button>
      </div>
      <Text as="span" className="font-semibold text-gray-400">
        Your AI is already trained on every page of your website. If you want to
        enrich your AI knowledge, upload files with FAQs, sizing charts, or any
        additional information on which you would like to train your AI.
      </Text>
      <ProjectStatistics className="mt-4" />
      <Title as="h4" className="mb-4 mt-4">
        All Files
      </Title>
      <div className="mb-4 flex items-center gap-2">
        <Input
          size="sm"
          type="search"
          placeholder="Type here"
          clearable
          className="flex-1"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        <Button
          size="sm"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-lg transition-transform hover:scale-105 @xl:w-auto"
        >
          Add URL
        </Button>
      </div>
    </div>
  );
}
