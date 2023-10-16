import { ManageWorkSchedule } from 'sets/components/ManageWorkSchedule'
import { ContinueButton } from 'ui/ContinueButton'
import { Modal } from '@increaser/ui/modal'
import { ClosableComponentProps } from '@increaser/ui/props'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const WorkScheduleOnboarding = ({ onNext, onClose }: Props) => {
  return (
    <Modal
      title="Finish work early"
      onClose={onClose}
      subTitle="Start work early and relax in the evening for a better mood and sleep"
      placement="top"
      footer={<ContinueButton onClick={onNext} />}
    >
      <ManageWorkSchedule />
    </Modal>
  )
}
