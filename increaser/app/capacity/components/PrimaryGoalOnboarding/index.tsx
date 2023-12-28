import { analytics } from '@increaser/app/analytics'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

import { PrimaryGoalForm } from './PrimaryGoalForm'
import { ContinueButton } from '@increaser/app/ui/ContinueButton'
import { Modal } from '@lib/ui/modal'
import { ClosableComponentProps } from '@lib/ui/props'

interface PrimaryGoalOnboardingProps extends ClosableComponentProps {
  onNext: () => void
  onClose: () => void
}

export const PrimaryGoalOnboarding = ({
  onNext,
  onClose,
}: PrimaryGoalOnboardingProps) => {
  const { primaryGoal } = useAssertUserState()

  return (
    <Modal
      title="What is your goal?"
      placement="top"
      onClose={onClose}
      footer={
        <ContinueButton
          onClick={() => {
            analytics.trackEvent(`Onboarding primary goal: ${primaryGoal}`)
            onNext()
          }}
        />
      }
    >
      <PrimaryGoalForm />
    </Modal>
  )
}
