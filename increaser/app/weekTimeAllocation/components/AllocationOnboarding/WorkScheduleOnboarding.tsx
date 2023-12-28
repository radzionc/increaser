import { ContinueButton } from '@increaser/app/ui/ContinueButton'
import { Modal } from '@lib/ui/modal'
import { ClosableComponentProps } from '@lib/ui/props'
import { ManageSchedule } from '@increaser/app/sets/components/ManageSchedule'
import { VStack } from '@lib/ui/layout/Stack'
import { ScheduleReview } from '@increaser/app/sets/components/ScheduleReview'

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
