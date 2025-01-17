'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import {
  formDataAtom,
  initialFormData,
  stepperAtomOne,
  useStepperOne,
} from './multi-step-1';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
}

function buttonLabel(formId?: number) {
  if (formId === 3) {
    return <>I&apos;am all done</>;
  }
  if (formId === 3) {
    return 'Back to Home';
  }
  return (
    <>
      Next <PiArrowUpLight className="rotate-90" />
    </>
  );
}

export default function Footer({ isLoading, className }: FooterProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setFormData = useSetAtom(formDataAtom);
  const { step, gotoPrevStep, gotoNextStep } = useStepperOne(); // Add gotoNextStep
  const resetLocation = useResetAtom(stepperAtomOne);

  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  function buttonAttr() {
    if (step === 3) {
      return {
        onClick: () => push('/'),
      };
    }
    return { form: `rhf-${step?.toString()}` };
  }

  const handleNextClick = () => {
    if (step < 3) {
      gotoNextStep(); // Add this to navigate to the next step
    } else {
      push('/'); // Go to home page if step is 5 or greater
    }
  };

  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      {step > 0 && step < 3 && (
        <Button
          rounded="pill"
          variant="solid"
          onClick={gotoPrevStep}
          className="gap-1"
        >
          <PiArrowUpLight className="-rotate-90" />
          Back
        </Button>
      )}
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        rounded="pill"
        variant="solid"
        onClick={handleNextClick} // Use handleNextClick to trigger next step
        {...buttonAttr()}
        type={'submit'}
        className="ml-auto gap-1"
      >
        {buttonLabel(step)}
      </Button>
    </footer>
  );
}
