import { Modal } from '@lib/ui/modal'
import { OnboardingStepFormContent } from './OnboardingStepFormContent'
import { onboardingStepTargetName, useOnboarding } from './OnboardingProvider'
import { OnboardingPrimaryNavigation } from './OnboardingPrimaryNavigation'

export const SmallScreenOnboarding = () => {
  const { currentStep } = useOnboarding()

  return (
    <Modal
      footer={<OnboardingPrimaryNavigation />}
      title={onboardingStepTargetName[currentStep]}
    >
      <OnboardingStepFormContent />
    </Modal>
  )
}
