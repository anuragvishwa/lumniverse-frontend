import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getColumns } from '../url-sources/columns';

import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button, Input, Text, Title } from 'rizzui';
import BasicTableWidget from '../url-sources/urlTable';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { MdOutlineHelp } from 'react-icons/md';

export const metadata = {
  ...metaObject('Table with search'),
};

const pageHeader = {
  title: '',
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

export default function DataGaps() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Title as="h4" className="mb-4">
          Unanswered Questions
        </Title>
        <Button
          size="sm"
          className="border-gradient-to-r flex items-center gap-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
        >
          <MdOutlineHelp className="h-4 w-4" /> Help
        </Button>
      </div>
      <Text as="span" className="w-42 font-semibold text-gray-400">
        These questions are all based on what multiple customers have recently
        asked, and there was no relevant information on the website for your Al
        Concierge to learn from
      </Text>

      <div className="mb-4 mt-4 flex items-center gap-2">
        <Input
          size="sm"
          type="search"
          placeholder="Type here"
          clearable
          className="flex-1"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        <Button size="sm" variant="flat">
          Add URL
        </Button>
      </div>
      <BasicTableWidget
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        searchPlaceholder="Search order..."
        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
    </div>
  );
}
