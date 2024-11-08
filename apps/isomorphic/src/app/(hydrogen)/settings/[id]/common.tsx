// import React, { useState, useEffect } from 'react';
// import axios, { AxiosResponse } from 'axios';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { usePathname } from 'next/navigation';
// import { useLayout } from '@/hooks/use-layout';
// import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
// import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
// import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@/components/ui/tabs';
// import { Text } from '@/components/ui/text';
// import cn from '@/utils/class-names';
// import { useScrollableSlider } from '@/hooks/use-scrollable-slider';

// export type Invoice = {
//   cloud: string;
//   clusterId: string;
//   clusterName: string;
//   clusterStatus: string;
//   createdAt: string;
//   region: string;
//   totalCost: number;
//   totalCpu: number;
//   totalMemory: number;
//   totalNodes: number;
//   totalCpuUsed: number;
//   totalMemoryUsed: number;
// };

// const Common = ({ params }: { params: any }) => {
//   const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
//   const { id } = params;
//   const router = useRouter();

//   const pathname = usePathname();

//   const isSelected = (route: string) => {
//     return pathname === `/settings/123/${route}`;
//   };

//   const { layout } = useLayout();
//   const {
//     sliderEl,
//     sliderPrevBtn,
//     sliderNextBtn,
//     scrollToTheRight,
//     scrollToTheLeft,
//   } = useScrollableSlider();
//   const { expandedLeft } = useBerylliumSidebars();

//   useEffect(() => {
//     async function fetchClusterData() {
//       try {
//         const response: AxiosResponse<Invoice[]> = await axios.get(
//           'https://run.mocky.io/v3/de338bed-4897-42c4-9f02-a0260594eba1'
//         );

//         setInvoiceData(response.data);
//       } catch (error) {
//         console.error('There was a problem fetching the data:', error);
//       }
//     }

//     fetchClusterData();
//   }, []);

//   const selectedCluster = invoiceData.find(
//     (cluster) => cluster.clusterId === id
//   );

//   console.log(selectedCluster);
//   return (
//     <>
//       {/* <div
//         className={cn(
//           'col-s border-b border-dashed border-gray-300 py-5 @5xl:grid @5xl:grid-cols-6'
//         )}
//       > */}
//       <div className="relative flex items-center overflow-hidden border-b border-dashed border-gray-300 py-2">
//         <Button
//           title="Prev"
//           variant="text"
//           ref={sliderPrevBtn}
//           onClick={() => scrollToTheLeft()}
//           className="!absolute left-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-start bg-gradient-to-r from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50 dark:via-gray-50 lg:hidden"
//         >
//           <PiCaretLeftBold className="w-5" />
//         </Button>

//         <div
//           className="-mb-5 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-12"
//           ref={sliderEl}
//         >
//           <Tabs>
//             <TabList className="inline-flex justify-start space-x-2 rounded-lg border border-gray-200">
//               <Link href={`/settings/${id}/details`}>
//                 <Tab
//                   className={({ selected }) =>
//                     cn(
//                       'w-full rounded-md px-3 py-2 text-xs outline-none duration-200',
//                       isSelected('details')
//                         ? 'bg-gray-900 font-medium text-gray-0 dark:bg-gray-100 dark:text-gray-900'
//                         : 'bg-transparent text-gray-900 hover:bg-gray-100 hover:text-gray-900 hover:dark:bg-gray-100 dark:hover:text-gray-900'
//                     )
//                   }
//                 >
//                   My Details
//                 </Tab>
//               </Link>

//               <Link href={`/settings/${id}/api`}>
//                 <Tab
//                   className={({ selected }) =>
//                     cn(
//                       'w-full rounded-md px-3 py-2 text-xs outline-none duration-200',
//                       isSelected('api')
//                         ? 'bg-gray-900 font-medium text-gray-0 dark:bg-gray-100 dark:text-gray-900'
//                         : 'bg-transparent text-gray-900 hover:bg-gray-100 hover:text-gray-900 hover:dark:bg-gray-100 dark:hover:text-gray-900'
//                     )
//                   }
//                 >
//                   API Keys & Usage
//                 </Tab>
//               </Link>
//             </TabList>
//           </Tabs>
//         </div>
//         <Button
//           title="Next"
//           variant="text"
//           ref={sliderNextBtn}
//           onClick={() => scrollToTheRight()}
//           className="!absolute right-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-end bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50 dark:via-gray-50 lg:hidden"
//         >
//           <PiCaretRightBold className="w-5" />
//         </Button>
//       </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default Common;
