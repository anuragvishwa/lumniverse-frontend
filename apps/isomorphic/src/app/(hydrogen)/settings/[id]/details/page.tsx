// 'use client';

// import React, { useEffect, useState } from 'react';
// import LoggedInDevices from '@/app/shared/account-settings/logged-in-devices/table';
// import { loggedInDeviceData } from './dummyData';
// import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
// import { Button } from 'rizzui';
// import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
// import AddTeamMemberModalView from '@/app/shared/account-settings/modal/add-team-member';
// import { useModal } from '@/app/shared/modal-views/use-modal';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { Input } from 'rizzui';
// import ProfileSettingsView from './orgName';

// const ComputeCost = () => {
//   const { openModal } = useModal();
//   const [orgData, setOrgData] = useState<any>([]);
//   const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
//   const token = process.env.NEXT_PUBLIC_API_TOKEN;
//   const axiosInstance = axios.create({
//     baseURL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const { data: session, status } = useSession();

//   const fetchData = async (authProvider: string, uniqueId: string) => {
//     try {
//       const userRes = await axiosInstance.get(
//         `/api/users/${authProvider}/${uniqueId}`
//       );
//       const userData = userRes.data;
//       const userId = userData.map((user: any) => user.userId);

//       const orgRes = await axiosInstance.get(
//         `/api/organizations/owner/${userId}`
//       );
//       const orgData = orgRes.data;
//       setOrgData(orgData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const authProvider = localStorage.getItem('authProvider');
//   const uniqueId = session?.user.id;

//   useEffect(() => {
//     if (authProvider && uniqueId) {
//       fetchData(authProvider, uniqueId);
//     }
//   }, [authProvider, uniqueId]);

//   const orgName: string = orgData.map((item: any) => item.name);

//   return (
//     <div className="@container">
//       <HorizontalFormBlockWrapper
//         childrenWrapperClassName="gap-0 @lg:gap-0"
//         title="Project Members"
//         titleClassName="text-base font-semibold"
//         className="-mt-5 py-2"
//       >
//         <div className="col-span-2 flex justify-end gap-4">
//           <Button
//             size="sm"
//             type="button"
//             className="text-xs dark:bg-gray-100 dark:text-white"
//             onClick={() =>
//               openModal({
//                 view: <AddTeamMemberModalView />,
//               })
//             }
//           >
//             <PiPlusBold className="me-1.5 h-4 w-4" />
//             Add Member
//           </Button>
//         </div>
//       </HorizontalFormBlockWrapper>
//       <div className="mt-4">
//         <LoggedInDevices
//           data={loggedInDeviceData}
//           className="@xs:col-span-full"
//         />
//       </div>

//       <div className="col-span-2 justify-start gap-4 py-2">
//         {/* <Title as="h5" className={cn('mb-2 text-[17px] font-semibold')}>
//           Project Name
//         </Title>
//         <div className="mt-6 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
//           <Input placeholder={orgName} className="flex-grow" />
//           <Button
//             rounded="pill"
//             size="lg"
//             className="self-end px-8 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 md:self-auto"
//             type="submit"
//           >
//             Save
//           </Button>
//         </div> */}
//         <ProfileSettingsView orgName={orgName} />
//       </div>
//     </div>
//   );
// };

// export default ComputeCost;
