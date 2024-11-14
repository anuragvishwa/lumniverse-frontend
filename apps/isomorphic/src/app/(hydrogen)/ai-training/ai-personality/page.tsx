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
import LoadingWorkflow from '@/app/shared/logistics/dashboard/loading-workflow';
import FleetStatus from '@/app/shared/logistics/dashboard/fleet-status';

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

export default function AIPersonality() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Title as="h4" className="mb-4">
          AI Personality
        </Title>
        <Button
          size="sm"
          className="border-gradient-to-r flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
        >
          <MdOutlineHelp className="h-4 w-4" /> Help
        </Button>
      </div>
      <Text as="span" className="font-semibold text-gray-400">
        Configure your AI&apos;s persona and give it instructions on how to
        behave.
      </Text>
      <div className="mt-6">
        <div className="grid grid-cols-6 gap-6 @container">
          <LoadingWorkflow className="col-span-full @[59rem]:col-span-4 @[80rem]:col-span-4" />
          <FleetStatus className="col-span-full @[59rem]:col-span-2 @[80rem]:col-span-2" />
        </div>
      </div>
    </div>
  );
}
