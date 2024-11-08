import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import JobOverview from '@/app/shared/job-dashboard/job-overview';

export const metadata = {
  ...metaObject('Table with search'),
};

const pageHeader = {
  title: 'Test & Train',
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

export default function TestNTrain() {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            size="sm"
            className="border-gradient-to-r mt-2 border-2 bg-white from-violet-600 to-indigo-600 px-3 py-1.5 text-indigo-600 transition-all duration-300 ease-in-out hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white"
          >
            Help
          </Button>
        </div>
      </PageHeader>
      <JobOverview />
    </div>
  );
}
