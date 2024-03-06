import { useOnboarding } from './OnboardingProvider'

import { OnboardingPrimaryNavigation } from './OnboardingPrimaryNavigation'
import { OnboardingSection } from './OnboardingSection'
import { OnboardingStepFormContent } from './OnboardingStepFormContent'
import { onboardingStepTargetName } from './OnboardingStep'

export const OnboardingStepForm = () => {
  const { currentStep } = useOnboarding()

  return (
    <OnboardingSection
      footer={<OnboardingPrimaryNavigation />}
      title={onboardingStepTargetName[currentStep]}
    >
      <OnboardingStepFormContent />
    </OnboardingSection>
  )
}
