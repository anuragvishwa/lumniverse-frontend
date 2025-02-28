'use client';

import { useAtom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import cn from '@core/utils/class-names';
import Footer from '../footer';
import StepOne from './step-1';
import StepTwo from './step-2';
import StepThree from './step-3';
import StepFour from './step-4';
import StepFive from './step-5';
import Congratulations from './congratulations';
import { FileSchema } from '@/validators/common-rules';
import StepSix from './step-6';
import Sidebar from './multiStepSidebar';

type FormDataType = {
  propertyType: string;
  placeType: string;
  address: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
  guests: number | undefined;
  bedrooms: number | undefined;
  beds: number | undefined;
  bedroomLock: string;
  guestType: string;
  indoorAmenities: string[] | undefined;
  outdoorAmenities: string[] | undefined;
  propertyName: string;
  propertyDescription: string | undefined;
  priceRange: number[] | undefined;
  photos: FileSchema[] | undefined;
};

export const initialFormData = {
  propertyType: '',
  placeType: '',
  address: '',
  lat: undefined,
  lng: undefined,
  guests: undefined,
  bedrooms: undefined,
  beds: undefined,
  bedroomLock: '',
  guestType: '',
  indoorAmenities: [],
  outdoorAmenities: [],
  propertyName: '',
  propertyDescription: '',
  priceRange: undefined,
  photos: undefined,
};

export const formDataAtom = atomWithStorage<FormDataType>(
  'multiStepForm',
  initialFormData
);

export enum Step {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  // StepFive,
  // StepSix,
  // StepSeven,
  // StepSeven,
  // StepEight,
  // StepNine,
  // StepTen,
}

const firstStep = Step.StepOne;
export const stepperAtomOne = atomWithReset<Step>(firstStep);

export function useStepperOne() {
  const [step, setStep] = useAtom(stepperAtomOne);

  // function gotoStep(step: Step) {
  //   setStep(step);
  // }
  function gotoNextStep() {
    setStep(step + 1);
  }

  function gotoPrevStep() {
    setStep(step > firstStep ? step - 1 : step);
  }
  function resetStepper() {
    setStep(firstStep);
  }
  return {
    step,
    setStep,
    // gotoStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.StepOne]: StepOne,
  [Step.StepTwo]: StepTwo,
  [Step.StepThree]: StepThree,
  [Step.StepFour]: StepFour,
  // [Step.StepFive]: StepFive,
  // [Step.StepSix]: StepSix,
  // [Step.StepSeven]: Congratulations,
  // [Step.StepSeven]: StepSeven,
  // [Step.StepEight]: StepEight,
  // [Step.StepNine]: StepNine,
  // [Step.StepTen]: ,
};

export const stepOneTotalSteps = Object.keys(MAP_STEP_TO_COMPONENT).length;

export default function MultiStepFormOne() {
  const [step] = useAtom(stepperAtomOne);
  const Component = MAP_STEP_TO_COMPONENT[step];

  console.log(step, 'step');

  return (
    <>
      <div>
        <Component />
      </div>
      <Footer />
    </>
  );
}
