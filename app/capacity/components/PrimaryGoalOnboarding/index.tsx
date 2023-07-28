import { trackEvent } from 'analytics'
import { Modal } from '@increaser/ui/ui/Modal'
import { useAssertUserState } from 'user/state/UserStateContext'

import { PrimaryGoalForm } from './PrimaryGoalForm'
import { ContinueButton } from 'ui/ContinueButton'

interface Props {
  onNext: () => void
}

export const PrimaryGoalOnboarding = ({ onNext }: Props) => {
  const { primaryGoal } = useAssertUserState()

  return (
    <Modal
      title="What is your goal?"
      hasImplicitClose={false}
      placement="top"
      renderContent={() => <PrimaryGoalForm />}
      footer={
        <ContinueButton
          onClick={() => {
            trackEvent(`Onboarding primary goal: ${primaryGoal}`)
            onNext()
          }}
        />
      }
    />
  )
}
