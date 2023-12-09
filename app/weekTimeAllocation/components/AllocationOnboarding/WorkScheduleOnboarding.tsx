import { ContinueButton } from 'ui/ContinueButton'
import { Modal } from '@increaser/ui/modal'
import { ClosableComponentProps } from '@increaser/ui/props'
import { VStack } from '@increaser/ui/layout/Stack'
import { ManageEndOfWorkday } from 'sets/components/ManageEndOfWorkday'
import { ManageBedTime } from 'sets/components/ManageBedTime'
import { TimeBoundaryDistance } from 'sets/components/TimeBoundaryDistance'
import { useAssertUserState } from 'user/state/UserStateContext'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const WorkScheduleOnboarding = ({ onNext, onClose }: Props) => {
  const { goalToFinishWorkBy, goalToGoToBedAt } = useAssertUserState()

  return (
    <Modal
      title="Work Smarter, Not Harder"
      onClose={onClose}
      subTitle="Reclaim your evenings for better relaxation and a peaceful sleep."
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
    >
      <VStack alignItems="center" gap={16}>
        <ManageEndOfWorkday />
        <TimeBoundaryDistance
          direction="column"
          value={goalToGoToBedAt - goalToFinishWorkBy}
        />
        <ManageBedTime />
      </VStack>
    </Modal>
  )
}
