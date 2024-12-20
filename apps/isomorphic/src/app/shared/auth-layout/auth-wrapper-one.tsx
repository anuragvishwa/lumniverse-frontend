'use client';

import Link from 'next/link';
import logoImg from '@public/logo-primary.svg';
import logoImgText from '@public/logo-primary-text.svg';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import {
  PiAppleLogo,
  PiArrowLeftBold,
  PiGithubLogo,
  PiGitlabLogo,
} from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from './or-separation';
import toast from 'react-hot-toast';
import { SignInResponse, signIn, signOut, useSession } from 'next-auth/react';
import { BsGitlab } from 'react-icons/bs';
import GithubIcon from '@core/components/icons/github';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default function AuthWrapperOne({
  children,
  title,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
  isSocialLoginActive = false,
  isSignIn = false,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log(session);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>([]);
  const authProvider = localStorage.getItem('authProvider');

  const dispatch: any = useDispatch();
  const userId = localStorage.getItem('userId') as string;
  const route = useRouter();

  const handleCreateUser = async (authProvider: any, uniqueId: string) => {
    try {
      const res = await axiosInstance.get(
        `/api/users/${authProvider}/${uniqueId}`
      );

      const userData = res.data;

      if (!userData || userData.length === 0) {
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
        const userId = response.userId;
        const user = response;

        const createOrgRes = await axiosInstance.post(
          `/api/createorganization`,
          {
            name: 'default',
            ownerId: userId,
          }
        );
        const orgData = createOrgRes.data;

        setData(response);
        localStorage.setItem('userId', userId);
        localStorage.setItem('orgId', orgData.orgId);
        return { userId, orgData, user };
      } else {
        const userId = userData[0].userId;
        const user = userData;
        const orgRes = await axiosInstance.get(
          `/api/organizations/owner/${userId}`
        );
        const orgId: string = orgRes.data.map((item: any) => item.orgId);
        localStorage.setItem('orgId', orgId);
        localStorage.setItem('userId', userId);
        return { userId, user };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
      throw error;
    }
  };

  async function handleSignIn(value: string) {
    try {
      await signIn(value);
      localStorage.setItem('authProvider', value);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  return (
    <>
      {/* <Link
        href={'/'}
        className="sticky start-0 top-0 z-20 flex items-center justify-center bg-blue p-3.5 text-sm font-medium text-white md:p-4 lg:hidden"
      >
        <PiArrowLeftBold />
        <Text className="ms-1 font-lexend">Back to home</Text>
      </Link> */}

      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 pt-10 md:pt-12 lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 [&>div]:min-h-[calc(100vh-80px)]">
        <div className="relative flex w-full items-center justify-center 2xl:pe-24">
          <div className="w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
            <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
              <Title
                as="h2"
                className="mb-5 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl"
              >
                {title}
              </Title>
              <Text className="leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
                {description}
              </Text>
            </div>
            {isSocialLoginActive && (
              <>
                <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-1 md:pb-6 xl:gap-5 xl:pb-7">
                  {/* <Button
                    variant="outline"
                    onClick={() => handleSignIn('github')}
                    className="h-11 w-full"
                  >
                    <GithubIcon className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">Signin With Github</span>
                  </Button> */}
                  {/* <Button
                    variant="outline"
                    onClick={() => signIn('gitlab')}
                    className="h-11 w-full"
                  >
                    <BsGitlab className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">Signin With Gitlab</span>
                  </Button> */}
                  <Button
                    variant="outline"
                    onClick={() => handleSignIn('google')}
                    className="h-11 w-full"
                  >
                    <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">Signin With Google</span>
                  </Button>
                </div>
                {/* <OrSeparation title="OR" className="mb-5 2xl:mb-7" isCenter /> */}
              </>
            )}

            {/* {children} */}
          </div>
        </div>
      </div>
    </>
  );
}
