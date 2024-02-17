import { ReactElement, useState } from "react";

export const useMultiStepFormEmployees = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const previuse = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const currentPageIs = (index: number) => setCurrentStepIndex(index);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    currentPageIs,
    next,
    previuse,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};
