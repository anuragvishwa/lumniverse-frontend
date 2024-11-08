// import { routes } from '@/config/routes';
// import { orderData } from '@/data/order-data';
// import { getColumns } from './columns';
// import BasicTableWidget from './searchTable';
// import ExportButton from '@/app/shared/export-button';
// import { metaObject } from '@/config/site.config';
// import { loggedInDeviceData } from './dummyData';

// export const metadata = {
//   ...metaObject('Table with search'),
// };

// const pageHeader = {
//   title: 'Search Table',
//   breadcrumb: [
//     {
//       href: routes.eCommerce.dashboard,
//       name: 'Home',
//     },
//     {
//       name: 'Tables',
//     },
//     {
//       name: 'Search',
//     },
//   ],
// };

// export default function SearchTablePage() {
//   return (
//     // <TableLayout
//     //   title={pageHeader.title}
//     //   breadcrumb={pageHeader.breadcrumb}
//     //   data={orderData}
//     //   fileName="order_data"
//     //   header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
//     // >
//     <>
//       {' '}
//       <BasicTableWidget
//         //   title="Search Table"
//         variant="minimal"
//         data={loggedInDeviceData}
//         // @ts-ignore
//         getColumns={getColumns}
//         enablePagination
//         searchPlaceholder="Search order..."
//         //   className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
//       />
//     </>

//     // </TableLayout>
//   );
// }
