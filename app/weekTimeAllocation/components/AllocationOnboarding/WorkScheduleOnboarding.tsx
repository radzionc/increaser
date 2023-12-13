import { ContinueButton } from 'ui/ContinueButton'
import { Modal } from '@increaser/ui/modal'
import { ClosableComponentProps } from '@increaser/ui/props'
import { ManageSchedule } from 'sets/components/ManageSchedule'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const WorkScheduleOnboarding = ({ onNext, onClose }: Props) => {
  return (
    <Modal
      width={580}
      title="Work Smarter, Not Harder"
      onClose={onClose}
      subTitle="Reclaim your evenings for better relaxation and a peaceful sleep."
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
    >
      <ManageSchedule />
    </Modal>
  )
}
