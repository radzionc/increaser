import { analytics } from 'analytics'
import { useAssertUserState } from 'user/state/UserStateContext'

import { PrimaryGoalForm } from './PrimaryGoalForm'
import { ContinueButton } from 'ui/ContinueButton'
import { Modal } from '@increaser/ui/modal'
import { ClosableComponentProps } from '@increaser/ui/props'

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
      onSubmit={() => {
        analytics.trackEvent(`Onboarding primary goal: ${primaryGoal}`)
        onNext()
      }}
      footer={<ContinueButton />}
    >
      <PrimaryGoalForm />
    </Modal>
  )
}
