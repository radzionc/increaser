import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { createContext, useCallback, useState } from 'react'
import { analytics } from '../analytics'
import { useUpdateUserMutation } from '../user/mutations/useUpdateUserMutation'

export const onboardingSteps = [
  'projects',
  'workBudget',
  'weeklyGoals',
  'schedule',
  'dailyHabits',
  'tasks',
  'publicProfile',
  'focus',
] as const
export type OnboardingStep = (typeof onboardingSteps)[number]

export const onboardingStepTargetName: Record<OnboardingStep, string> = {
  projects: 'Add projects',
  workBudget: 'Define work budget',
  weeklyGoals: 'Outline weekly goals',
  schedule: 'Arrange schedule',
  dailyHabits: 'Establish daily habits',
  publicProfile: 'Create public profile',
  tasks: 'List tasks',
  focus: 'Start focus session',
}

type OnboardingState = {
  completedSteps: OnboardingStep[]
  currentStep: OnboardingStep
  setCurrentStep: (step: OnboardingStep) => void
  finishOnboarding: () => void
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
      if (previousStep && !completedSteps.includes(previousStep)) {
        analytics.trackEvent(
          `Completed onboarding step #${onboardingSteps.indexOf(previousStep)}`,
        )
        setCompletedSteps((prev) => [...prev, previousStep])
      }
    },
    [completedSteps],
  )

  const { mutate: updateUser } = useUpdateUserMutation()

  const finishOnboarding = useCallback(() => {
    analytics.trackEvent('Finished onboarding')
    updateUser({ finishedOnboardingAt: Date.now() })
  }, [updateUser])

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep: onCurrentStepChange,
        completedSteps,
        finishOnboarding,
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
