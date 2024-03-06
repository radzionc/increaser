import { Modal } from '@lib/ui/modal'
import { OnboardingStepFormContent } from './OnboardingStepFormContent'
import { useOnboarding } from './OnboardingProvider'
import { OnboardingPrimaryNavigation } from './OnboardingPrimaryNavigation'
import { onboardingStepTargetName } from './OnboardingStep'

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
