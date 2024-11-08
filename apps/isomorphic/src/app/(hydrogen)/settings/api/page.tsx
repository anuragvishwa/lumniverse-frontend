'use client';

import React, { useEffect, useState } from 'react';
import LoggedInDevices from '@/app/shared/account-settings/logged-in-devices/table';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import { Button } from 'rizzui';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import AddTeamMemberModalView from '@/app/shared/account-settings/modal/add-team-member';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@core/utils/class-names';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Input } from 'rizzui';
import BasicTableWidget from '../[id]/details/searchTable';
import { orderData } from './dummyData';
import { getColumns as getOrderColumns } from './getTableColumns';
import { useCopyToClipboard } from 'react-use';
import StorageSummary from '@/app/shared/file/dashboard/storage-summary';
import CircleCard from './usageCard';
import PlanModal from './planModal';
import BudgetStatus from '@/app/shared/financial/dashboard/budget-status';
import SocialFollowers from '@/app/shared/executive/social-followers';
import ModelKey from './modelKey';
import GeneralSetting from './generalSetting';
import Plans from './plans';
import MonthlyUsage from './monthlyUsage';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const ApiAndDetails = () => {
  const { openModal } = useModal();
  const [isCopied, setCopied] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [orgData, setOrgData] = useState<any>([]);
  const { data: session, status } = useSession();

  const fetchData = async (authProvider: string, uniqueId: string) => {
    try {
      const userRes = await axiosInstance.get(
        `/api/users/${authProvider}/${uniqueId}`
      );
      const userData = userRes.data;
      const userId = userData.map((user: any) => user.userId);

      const orgRes = await axiosInstance.get(
        `/api/organizations/owner/${userId}`
      );
      const orgData = orgRes.data;
      setOrgData(orgData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const authProvider = localStorage.getItem('authProvider');
  const uniqueId = session?.user.id;

  useEffect(() => {
    if (authProvider && uniqueId) {
      fetchData(authProvider, uniqueId);
    }
  }, [authProvider, uniqueId]);

  const orgName: string = orgData.map((item: any) => item.name).join(', ');
  const orgId: string = orgData.map((item: any) => item.orgId).join(', ');

  return (
    <div className="mt-4 @container">
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="User's Organization"
        titleClassName="text-base font-semibold"
        className="-mt-5 py-2"
      ></HorizontalFormBlockWrapper>
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-4 3xl:gap-8">
          <ModelKey
            className="@7xl:col-span-2"
            orgName={orgName}
            orgId={orgId}
          />
          <GeneralSetting
            className="@7xl:col-span-2"
            orgName={orgName}
            orgId={orgId}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiAndDetails;
