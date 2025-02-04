import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import WelcomeBanner from '@core/components/banners/welcome';
import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';
import ProfitWidget from '@/app/shared/ecommerce/dashboard/profit-widget';
import SalesReport from '@/app/shared/ecommerce/dashboard/sales-report';
import BestSellers from '@/app/shared/ecommerce/dashboard/best-sellers';
import RepeatCustomerRate from '@/app/shared/ecommerce/dashboard/repeat-customer-rate';
import UserLocation from '@/app/shared/ecommerce/dashboard/user-location';
import PromotionalSales from '@/app/shared/ecommerce/dashboard/promotional-sales';
import RecentOrder from '@/app/shared/ecommerce/dashboard/recent-order';
import StockReport from '@/app/shared/ecommerce/dashboard/stock-report';
import { PiPlusBold } from 'react-icons/pi';
import welcomeImg from '@public/shop-illustration.png';
import HandWaveIcon from '@core/components/icons/hand-wave';
import CreateCategoryModalView from '@/app/(hydrogen)/sales/learn-modal';
import { useModal } from '../../modal-views/use-modal';

export default function EcommerceDashboard() {
  const { openModal } = useModal();
  return (
    <div className="@container">
      <div className="w-full">
        <WelcomeBanner
          title={<>Dynamic product recommendations</>}
          description={
            'Boost sales by suggesting related products to items recently added to the cart.'
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-9"
        >
          <Button
            onClick={() => {
              openModal({
                view: <CreateCategoryModalView />,
                customSize: '720px',
              });
            }}
            className="inline-flex"
          >
            <Button as="span" size="sm">
              Learn More
            </Button>
          </Button>
        </WelcomeBanner>

        {/* <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />
        <ProfitWidget className="h-[464px] @sm:h-[520px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full" />

        <SalesReport className="@4xl:col-span-2 @7xl:col-span-8" />

        <PromotionalSales className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" />

        <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" />

        <RepeatCustomerRate className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-8" />

        <BestSellers className="@7xl:col-span-6 @[90rem]:col-span-4" />

        <UserLocation className="@7xl:col-span-6 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8" /> */}
      </div>
    </div>
  );
}
