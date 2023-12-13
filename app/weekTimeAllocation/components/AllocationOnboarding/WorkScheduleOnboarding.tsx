import { ContinueButton } from 'ui/ContinueButton'
import { Modal } from '@increaser/ui/modal'
import { ClosableComponentProps } from '@increaser/ui/props'
import { ManageSchedule } from 'sets/components/ManageSchedule'
import { VStack } from '@increaser/ui/layout/Stack'
import { ScheduleReview } from 'sets/components/ScheduleReview'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const WorkScheduleOnboarding = ({ onNext, onClose }: Props) => {
  return (
    <Modal
      title="Work Smarter, Not Harder"
      onClose={onClose}
      subTitle="Reclaim your evenings for better relaxation and a peaceful sleep."
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
    >
      <VStack gap={20}>
        <ManageSchedule />
        <ScheduleReview />
      </VStack>
    </Modal>
  )
}
