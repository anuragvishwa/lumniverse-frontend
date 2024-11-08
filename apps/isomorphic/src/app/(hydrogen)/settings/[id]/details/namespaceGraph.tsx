// 'use client';

// import React from 'react';
// import { Tooltip } from '@/components/ui/tooltip';
// import { ActionIcon } from '@/components/ui/action-icon';
// import EyeIcon from '@/components/icons/eye';

// import NamespacesGraphTable from './namespacesGraphTable';

// const NamespaceGraph = ({ className }: { className: string }) => {
//   return (
//     <div>
//       <div>
//         <div className="col-span-full rounded-md border border-gray-300 p-4">
//           {/* <p className="col-span-full">
//             PROJECTED END OF DAY SPEND
//             <Tooltip
//               size="sm"
//               rounded="sm"
//               content={() => (
//                 <div className="w-[200px] text-center">
//                   Calculated by adding current day actual spend and calculated
//                   cost projection for the reminder of the day
//                 </div>
//               )}
//               placement="top"
//               color="DEFAULT"
//             >
//               <ActionIcon
//                 tag="span"
//                 size="sm"
//                 variant="outline"
//                 aria-label={
//                   'Calculated by adding current day actual spend and calculated cost projection for the reminder of the day'
//                 }
//                 className="cursor-pointer border-none shadow-none hover:text-gray-700"
//               >
//                 <span className="-mt-2 h-3 w-3.5 rounded-full">
//                   <EyeIcon />
//                 </span>
//               </ActionIcon>
//             </Tooltip>
//             - 2024-01-04
//           </p> */}
//           <div className="col-span-full grid grid-cols-3 gap-3">
//             <div className="border-l-2 border-secondary ps-2 text-xs">
//               <p className="font-semibold text-gray-900">CASTAI-AGENT</p>
//               <p className="mt-2">$0.0123</p>
//             </div>
//             <div className="border-l-2 border-secondary ps-2 text-xs">
//               <p className="font-semibold text-gray-900">COREDNS</p>
//               <p className="mt-2">$0.0053</p>
//             </div>
//             <div className="border-l-2 border-secondary ps-2 text-xs">
//               <p className="font-semibold text-gray-900">KUBE-PROXY</p>
//               <p className="mt-2">$0.00485</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <NamespacesGraphTable />
//     </div>
//   );
// };

// export default NamespaceGraph;
