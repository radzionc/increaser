import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { createContext, useCallback, useState } from 'react'

export const onboardingSteps = [
  'projects',
  'workBudget',
  'weeklyGoals',
  'schedule',
  'dailyHabits',
  'publicProfile',
  'tasks',
] as const
type OnboardingStep = (typeof onboardingSteps)[number]

export const onboardingStepTargetName: Record<OnboardingStep, string> = {
  projects: 'Add projects',
  workBudget: 'Define work budget',
  weeklyGoals: 'Outline weekly goals',
  schedule: 'Arrange schedule',
  dailyHabits: 'Establish daily habits',
  publicProfile: 'Create public profile',
  tasks: 'List tasks',
}

type OnboardingState = {
  completedSteps: OnboardingStep[]
  currentStep: OnboardingStep
  setCurrentStep: (step: OnboardingStep) => void
}

const OnboardingContext = createContext<OnboardingState | undefined>(undefined)

export const OnboardingProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(
    onboardingSteps[0],
  )

  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>([])

  const onCurrentStepChange = useCallback(
    (step: OnboardingStep) => {
      setCurrentStep(step)
      const previousStep = onboardingSteps[onboardingSteps.indexOf(step) - 1]
      if (previousStep) {
        setCompletedSteps((prev) => withoutDuplicates([...prev, previousStep]))
      }
    },
    [setCurrentStep],
  )

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep: onCurrentStepChange,
        completedSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = createContextHook(
  OnboardingContext,
  'OnboardingContext',
)
