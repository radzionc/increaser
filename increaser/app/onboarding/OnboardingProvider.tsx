import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { analytics } from '../analytics'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { match } from '@lib/utils/match'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { OnboardingStep, onboardingSteps } from './OnboardingStep'

type OnboardingState = {
  completedSteps: OnboardingStep[]
  currentStep: OnboardingStep
  isNextStepDisabled: string | false
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

  const isNextStepDisabled = useMemo(
    () =>
      match<OnboardingStep, string | false>(currentStep, {
        projects: () => false,
        workBudget: () => false,
        projectsBudget: () => false,
        schedule: () => false,
        dailyHabits: () => false,
        tasks: () => false,
        focus: () => false,
      }),
    [currentStep],
  )

  const { finishedOnboardingAt } = useAssertUserState()
  useEffect(() => {
    if (finishedOnboardingAt) return
    if (isNextStepDisabled) return

    const isLastStep =
      currentStep === onboardingSteps[onboardingSteps.length - 1]
    if (!isLastStep) return

    analytics.trackEvent('Finished onboarding')
    updateUser({ finishedOnboardingAt: Date.now() })
  }, [currentStep, finishedOnboardingAt, isNextStepDisabled, updateUser])

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep: onCurrentStepChange,
        completedSteps,
        isNextStepDisabled,
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
