import OverallProgress from '@/app/shared/project-dashboard/overall-progress';
import FlowOnDevices from '@/app/shared/social-media/dashboard/flow-on-devices';
import TrafficAnalytics from '@/app/shared/social-media/dashboard/traffic-analytics';
import SatisfactionRate from '@/app/shared/support/dashboard/satisfaction-rate';
import React from 'react';

const FunnelCard: React.FC = () => {
  const funnelData = [
    {
      title: 'Disengaged customers approached',
      sessions: '57,144 sessions',
      percentage: '53.00%',
    },
    {
      title: 'Conversations started with disengaged customers',
      sessions: '36,237 sessions',
      percentage: '6.34%',
    },
    {
      title: 'Conversations that viewed products',
      sessions: '32,919 sessions',
      percentage: '90.84%',
    },
    {
      title: 'Conversations added to cart',
      sessions: '11,471 sessions',
      percentage: '31.66%',
    },
    {
      title: 'Conversations converted',
      sessions: '4,741 sessions',
      percentage: '13.08%',
    },
  ];

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="grid grid-cols-6 gap-6">
        {' '}
        <FlowOnDevices
          className={`col-span-full @[59rem]:col-span-2 @[80rem]:col-span-1`}
        />
        <OverallProgress className="col-span-full @[59rem]:col-span-4 @[80rem]:col-span-3" />
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full @[59rem]:col-span-4 @[80rem]:col-span-3">
          <div className="w-full rounded-lg border-[2px] border-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Lumniverse funnel</h2>
            {funnelData.map((item, index) => (
              <div key={index} className="mb-3 flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.sessions}</p>
                </div>
                <p className="font-semibold text-gray-800">{item.percentage}</p>
              </div>
            ))}
            <p className="mt-4 cursor-pointer text-right text-sm text-gray-500 hover:text-gray-700">
              See conversations
            </p>
          </div>
        </div>
        <div
          className={`col-span-full @[59rem]:col-span-2 @[80rem]:col-span-1`}
        >
          <div className="w-full rounded-lg border-[2px] border-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Unanswered Questions</h2>

            <p className="mt-4 cursor-pointer text-right text-sm text-gray-500 hover:text-gray-700">
              See conversations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelCard;
