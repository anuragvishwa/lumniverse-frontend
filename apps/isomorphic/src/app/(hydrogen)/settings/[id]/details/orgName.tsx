// 'use client';

// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { PiEnvelopeSimple, PiSealCheckFill } from 'react-icons/pi';
// import { Form } from '@/components/ui/form';
// import { Title, Text } from '@/components/ui/text';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Checkbox } from '@/components/ui/checkbox';
// import SelectBox from '@/components/ui/select';
// import { routes } from '@/config/routes';
// import toast from 'react-hot-toast';
// import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
// import {
//   defaultValues,
//   profileFormSchema,
//   ProfileFormTypes,
// } from '@/utils/validators/profile-settings.schema';
// import { roles } from '@/data/forms/my-details';
// import FormGroup from '@/app/shared/form-group';
// import Link from 'next/link';
// import FormFooter from '@/components/form-footer';
// import UploadZone from '@/components/ui/file-upload/upload-zone';
// import cn from '@/utils/class-names';
// import { useLayout } from '@/hooks/use-layout';
// import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
// import { LAYOUT_OPTIONS } from '@/config/enums';
// import { BiEdit } from 'react-icons/bi';
// const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
//   ssr: false,
// });

// export default function ProfileSettingsView({ orgName }: { orgName: string }) {
//   const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {
//     toast.success(<Text as="b">Profile successfully updated!</Text>);
//     console.log('Profile settings data ->', data);
//   };

//   return (
//     <>
//       <Form<ProfileFormTypes>
//         validationSchema={profileFormSchema}
//         onSubmit={onSubmit}
//         className="@container"
//         useFormProps={{
//           mode: 'onChange',
//           defaultValues,
//         }}
//       >
//         {({
//           register,
//           control,
//           getValues,
//           setValue,
//           formState: { errors },
//         }) => {
//           return (
//             <>
//               <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
//                 {' '}
//                 <FormGroup
//                   title={
//                     <Title
//                       as="h5"
//                       className={cn('mb-2 text-[14px] font-semibold')}
//                     >
//                       Organization Name
//                     </Title>
//                   }
//                   className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//                 >
//                   <Input
//                     size="sm"
//                     readOnly
//                     prefix={<BiEdit className="h-6 w-6 text-gray-500" />}
//                     type="email"
//                     className="col-span-full"
//                     placeholder={orgName}
//                     {...register('email')}
//                     error={errors.email?.message}
//                   />
//                 </FormGroup>
//               </div>

//               <FormFooter
//                 // isLoading={isLoading}
//                 altBtnText="Cancel"
//                 submitBtnText="Save"
//               />
//             </>
//           );
//         }}
//       </Form>
//     </>
//   );
// }

// export function ProfileHeader({
//   title,
//   description,
//   children,
// }: React.PropsWithChildren<{ title: string; description?: string }>) {
//   const { layout } = useLayout();
//   const { expandedLeft } = useBerylliumSidebars();

//   return (
//     <div
//       className={cn(
//         'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10',
//         layout === LAYOUT_OPTIONS.BERYLLIUM && expandedLeft
//           ? 'before:start-5 3xl:before:start-[25px]'
//           : 'xl:before:w-[calc(100%_+_10px)]'
//       )}
//     >
//       <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-gray-300 pb-10">
//         <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
//           <Image
//             src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"
//             alt="profile-pic"
//             fill
//             sizes="(max-width: 768px) 100vw"
//             className="aspect-auto"
//           />
//         </div>
//         <div>
//           <Title
//             as="h2"
//             className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
//           >
//             {title}
//             <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
//           </Title>
//           {description ? (
//             <Text className="text-sm text-gray-500">{description}</Text>
//           ) : null}
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }
