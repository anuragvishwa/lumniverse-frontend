'use client';

import Header from './header';
import { useStepperOne } from './multi-step-1';
import Sidebar from './multi-step-1/multiStepSidebar';

export default function MultiStepLayoutTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  const { step } = useStepperOne();

  return (
    <>
      {/* {step === 2 && (
        <main className="flex min-h-screen flex-grow">
          <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
          <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
            <Header />
            <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
              {children}
            </div>
          </div>
        </main>
      )} */}
      <div className="min-h-screen @container">
        {/* <Header /> */}
        {children}
      </div>
    </>
  );
}
