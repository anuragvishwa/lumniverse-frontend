'use client';

import StorageReport from '@/app/shared/file/dashboard/storage-report';
import FileStats from '@/app/shared/file/dashboard/file-stats';
import StorageSummary from '@/app/shared/file/dashboard/storage-summary';
import RecentFiles from '@/app/shared/file/dashboard/recent-files';
import QuickAccess from '@/app/shared/file/dashboard/quick-access';
import ActivityReport from '@/app/shared/file/dashboard/activity-report';
import Members from '@/app/shared/file/dashboard/members';
import FileListTable from '@/app/shared/file/dashboard/file-list/table';
import UpgradeStorage from '@/app/shared/file/dashboard/upgrade-storage';
import RecentActivities from '@/app/shared/file/dashboard/recent-activities';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProjectsByUser } from '@/redux/slices/createPrompts';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default function FileDashboard() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isUserIdSet, setIsUserIdSet] = useState<boolean>(false);
  const authProvider = localStorage.getItem('authProvider');
  const dispatch: any = useDispatch();

  console.log(userId, authProvider, 'userId initially');

  const handleCreateUser = async (authProvider: any, uniqueId: string) => {
    try {
      const res = await axiosInstance.get(
        `/api/users/${authProvider}/${uniqueId}`
      );
      const userDataResponse = res.data;

      if (!userDataResponse || userDataResponse.length === 0) {
        const createUserRes = await axiosInstance.post(`/api/createuser`, {
          firstName: session?.user.name
            ? session?.user.name?.split(' ')[0]
            : 'default',
          lastName: session?.user.name
            ? session?.user.name.split(' ')[1]
            : 'default',
          email: session?.user.email,
          username: session?.user.email,
          website: 'default',
          role: 'default',
          billing: 'default',
          permission: 'default',
          googleId: authProvider === 'google' ? uniqueId : 'default',
          githubId: authProvider === 'github' ? uniqueId : 'default',
          access_token: 'default',
        });
        const response = createUserRes.data;
        const newUserId = response.userId;

        const createOrgRes = await axiosInstance.post(
          `/api/createorganization`,
          {
            name: 'default',
            ownerId: newUserId,
          }
        );
        const orgData = createOrgRes.data;

        const createProjRes = await axiosInstance.post(`/api/createproject`, {
          name: 'default',
          orgId: orgData.orgId,
          userId: userId,
          role: 'default',
          collaborator: 'default',
          service: 'default',
          environment: 'default',
          price: 0,
        });
        const projData = await createProjRes.data;

        setUserData(response);
        localStorage.setItem('userId', newUserId);
        localStorage.setItem('orgId', orgData.orgId);
        localStorage.setItem('projId', projData.projId);
        setUserId(newUserId);
        setIsUserIdSet(true);
        return { newUserId, orgData, user: response, projData };
      } else {
        const newUserId = userDataResponse[0].userId;
        const orgRes = await axiosInstance.get(
          `/api/organizations/owner/${newUserId}`
        );

        const orgId: string = orgRes.data
          .map((item: any) => item.orgId)
          .toString();
        const response = await axiosInstance.get(`/api/projects/org/${orgId}`);
        const projects = response.data;

        const projId: string = response.data
          .map((item: any) => item.projId)
          .toString();
        localStorage.setItem('orgId', orgId);

        localStorage.setItem('userId', newUserId);
        console.log(projects, orgId, projId, 'proj');
        setUserId(newUserId);
        setIsUserIdSet(true);
        return { newUserId, user: userDataResponse };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
      throw error;
    }
  };

  useEffect(() => {
    if (authProvider && session?.user?.id) {
      const uniqueId = session.user.id;
      handleCreateUser(authProvider, uniqueId);
      console.log(userId, authProvider, 'from useEffect');
    }
  }, [authProvider, session]);

  useEffect(() => {
    if (isUserIdSet && userId) {
      dispatch(fetchProjectsByUser(userId));
    }
  }, [isUserIdSet, userId, dispatch]);
  return <StorageReport />;
}
