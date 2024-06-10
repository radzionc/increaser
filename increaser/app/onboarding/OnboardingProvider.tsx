import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { OnboardingStep, onboardingSteps } from './OnboardingStep'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

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

  const analytics = useAnalytics()

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
    [completedSteps, analytics],
  )

  const { mutate: updateUser } = useUpdateUserMutation()

  const { finishedOnboardingAt } = useAssertUserState()
  useEffect(() => {
    if (finishedOnboardingAt) return

    const isLastStep =
      currentStep === onboardingSteps[onboardingSteps.length - 1]
    if (!isLastStep) return

    analytics.trackEvent('Finished onboarding')
    updateUser({ finishedOnboardingAt: Date.now() })
  }, [currentStep, finishedOnboardingAt, updateUser, analytics])

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
