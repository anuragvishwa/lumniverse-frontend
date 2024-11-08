'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import ApiAndDetails from './api/page';

export type Invoice = {
  cloud: string;
  clusterId: string;
  clusterName: string;
  clusterStatus: string;
  createdAt: string;
  region: string;
  totalCost: number;
  totalCpu: number;
  totalMemory: number;
  totalNodes: number;
  totalCpuUsed: number;
  totalMemoryUsed: number;
};

const pageHeader = {
  title: 'Settings',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: '/clusterlist',
      name: 'Clusters',
    },
    {
      name: 'List',
    },
  ],
};

function Namespaces({ params }: any) {
  return (
    <>
      {/* <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader> */}
      <div className="col-span-full mt-4 px-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10">
        <ApiAndDetails />
      </div>
    </>
  );
}

export default Namespaces;
